const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // 处理 CORS 预检请求
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 1. 解析请求参数
    const body = await req.json();
    const { messages } = body;

    // 2. 参数验证
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: '缺少必需参数: messages' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // 3. 调用文心一言 API
    const apiKey = Deno.env.get('INTEGRATIONS_API_KEY');
    const upstreamApiUrl = 'https://app-aqe1ulp0ary9-api-zYkZz8qovQ1L-gateway.appmiaoda.com/v2/chat/completions';
    
    const response = await fetch(upstreamApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Gateway-Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages,
        enable_thinking: false
      }),
    });

    // 4. 检查响应状态
    if (!response.ok) {
      const errorData = await response.json();
      console.error('[Edge Function Error] 上游 API 请求失败:', errorData);
      return new Response(
        JSON.stringify({ error: errorData.error?.message || `上游 API 请求失败: ${response.status}` }),
        {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // 5. 直接透传流式响应
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('[Edge Function Error]:', error instanceof Error ? error.message : 'Unknown error', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
