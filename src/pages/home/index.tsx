import { useState, useCallback } from 'react'
import { Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

interface ContactInfo {
  type: 'wechat' | 'email' | 'github' | 'link'
  label: string
  value: string
  icon: string
  action: 'copy' | 'link'
}

const CONTACT_LIST: ContactInfo[] = [
  {
    type: 'wechat',
    label: '微信',
    value: 'syg17681200474',
    icon: 'i-mdi-wechat',
    action: 'copy'
  },
  {
    type: 'email',
    label: '邮箱',
    value: 'sx2405111@nuaa.edu.cn',
    icon: 'i-mdi-email',
    action: 'copy'
  },
  {
    type: 'github',
    label: 'GitHub',
    value: 'https://github.com/XuQing-S',
    icon: 'i-mdi-github',
    action: 'link'
  }
]

const Home = () => {
  const [isContactExpanded, setIsContactExpanded] = useState(false)

  // 处理联系方式点击
  const handleContactClick = useCallback((contact: ContactInfo) => {
    if (contact.action === 'copy') {
      // 复制到剪贴板
      Taro.setClipboardData({
        data: contact.value,
        success: () => {
          Taro.showToast({
            title: `${contact.label}已复制`,
            icon: 'success',
            duration: 2000
          })
        }
      })
    } else if (contact.action === 'link') {
      // 跳转链接
      if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
        // H5 环境直接在新标签页打开
        window.open(contact.value, '_blank')
      } else {
        // 小程序环境无法直接打开外部未配置业务域名的网页，降级为复制链接
        Taro.setClipboardData({
          data: contact.value,
          success: () => {
            Taro.showToast({
              title: '链接已复制，请在浏览器打开',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    }
  }, [])

  // 打开聊天页面
  const handleOpenChat = useCallback(() => {
    Taro.navigateTo({
      url: '/pages/chat/index'
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-500/30">
      <div className="max-w-2xl mx-auto px-6 py-12 md:py-20">
        
        {/* 头部：头像与简介 - 左对齐排版更显专业 */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 mb-12">
          <Image
            src="https://miaoda-edit-image.cdn.bcebos.com/aqe1ulp0ary9/IMG-aqed6t777g1s.png"
            mode="aspectFill"
            className="w-24 h-24 md:w-28 md:h-28 rounded-full shadow-sm border border-slate-200 object-cover shrink-0"
            data-editor-config="%7B%22defaultSrc%22%3A%22https%3A%2F%2Fmiaoda-edit-image.cdn.bcebos.com%2Faqe1ulp0ary9%2FIMG-aqed6t777g1s.png%22%7D" 
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              许卿
            </h1>
            <div className="flex items-center gap-2.5 text-slate-600">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-base md:text-lg leading-relaxed">
                一个正在学习 DeepLearning、VibeCoding 的研究生。
              </p>
            </div>
          </div>
        </div>
        
        {/* 聊天按钮 - 沉稳的深色质感 */}
        <div className="mb-12">
          <button
            type="button"
            onClick={handleOpenChat}
            className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-2xl font-medium hover:bg-slate-800 active:scale-[0.98] transition-all shadow-md shadow-slate-900/10"
          >
            <div className="i-mdi-robot-outline text-2xl text-blue-400" />
            <span className="text-lg tracking-wide">和我的数字分身聊聊</span>
          </button>
        </div>

        {/* 联系方式模块 - 紧凑型折叠面板 */}
        <div className="w-full">
          <div 
            className="flex justify-between items-center mb-2 cursor-pointer group py-2"
            onClick={() => setIsContactExpanded(!isContactExpanded)}
          >
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">联系方式</h2>
            <div className={`text-xl text-slate-400 transition-transform duration-300 ${isContactExpanded ? 'rotate-180' : ''}`}>
              <div className="i-mdi-chevron-down" />
            </div>
          </div>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isContactExpanded ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
              {CONTACT_LIST.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`${contact.icon} text-2xl text-slate-400 shrink-0`} />
                    <div className="flex flex-col truncate">
                      <span className="text-sm font-medium text-slate-900">{contact.label}</span>
                      <span className="text-xs text-slate-500 truncate">{contact.value}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleContactClick(contact)}
                    className="ml-3 shrink-0 p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    title={contact.action === 'copy' ? '复制' : '访问'}
                  >
                    <div className={contact.action === 'copy' ? 'i-mdi-content-copy' : 'i-mdi-open-in-new'} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Home