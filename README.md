# 许卿的个人主页与数字分身 (Digital Avatar)

这是一个基于 **Taro + React + TypeScript** 开发的多端个人主页项目。它不仅展示了详细的个人履历和科研成果，还深度集成了一个由大语言模型（LLM）驱动的**专属 AI 数字分身**，支持与访客进行实时的流式对话。

项目支持编译为 H5（Web 网页）和微信小程序，UI 采用 Tailwind CSS 构建，呈现出简约专业且带有轻微科技感的现代设计风格。

---

## ✨ 主要功能 (Features)

### 🤖 AI 数字分身聊天 (Digital Twin Chat)
- **专属人设**：内置定制化的 System Prompt，AI 会以“许卿”（深度学习与 VibeCoding 研究生）的口吻与访客交流。
- **流式输出**：基于 Supabase Edge Functions 接入大模型，支持像打字机一样的实时流式响应（Streaming），体验流畅。
- **预设问答**：提供快捷提问按钮，引导访客快速了解基本信息。

### 🎓 个人成果展示 (Achievements Showcase)
- **多维度分类**：将个人成果精细划分为**论文、专利、软著、项目**四个独立模块。
- **左图右文排版**：每个成果页面均采用专业的左侧配图（如专利证书）、右侧详情（标题、发明人、摘要）的卡片式布局。
- **状态角标**：直观展示成果的当前状态（如“已授权”、“已公开”），并配有色彩区分与专属图标。

### 📱 极致的多端体验与 UI 设计
- **响应式设计**：完美适配 PC 端与移动端屏幕，采用浅色调（Light Mode）科技风设计，视觉层次清晰。
- **一键触达**：联系方式模块支持一键复制微信号/邮箱，或直接在新标签页跳转至 GitHub 主页。

---

## 🛠 技术栈 (Tech Stack)

- **核心框架**: [Taro v4](https://taro-docs.jd.com/) + [React](https://reactjs.org/)
- **编程语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式方案**: [Tailwind CSS](https://tailwindcss.com/)
- **状态管理**: [Zustand](https://github.com/pmndrs/zustand)
- **后端/AI服务**: [Supabase](https://supabase.com/) (Edge Functions)

---

## 🚀 本地运行说明 (Getting Started)

### 1. 环境准备
请确保你的电脑上已经安装了 [Node.js](https://nodejs.org/) 和包管理工具 `pnpm`。
如果未安装 `pnpm`，可通过以下命令全局安装：
```bash
npm install -g pnpm
```

### 2. 安装依赖
在项目根目录下运行：
```bash
pnpm install
```

### 3. 启动本地开发服务
根据你需要预览的平台，选择对应的命令：

**预览 H5（网页版）：**
```bash
pnpm run dev:h5
```
启动成功后，在浏览器中访问 `http://localhost:10086` 即可预览。

**预览微信小程序：**
```bash
pnpm run dev:weapp
```
启动后，打开 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，导入当前项目根目录即可预览。

---

## ☁️ 部署说明 (Deployment)

本项目已针对 **腾讯云 EdgeOne Pages** 进行了深度优化（包括大图片的分块打包策略，完美绕过单文件 25MB 限制）。

### EdgeOne Pages 部署步骤：
1. 登录腾讯云 EdgeOne 控制台，进入 **Pages** 模块。
2. 点击新建项目，绑定并选择你的 GitHub 仓库。
3. **配置构建参数**：
   - 框架预设：`Other`
   - 构建命令：`pnpm run build:h5`
   - 输出目录：`dist`
4. **配置环境变量**：
   - 添加变量名 `TARO_APP_SUPABASE_URL`，值为你的 Supabase 后端地址（可在本地 `.env.production` 中找到）。
5. 点击 **保存并部署**。后续只需向 GitHub 的 `master` 分支推送代码，EdgeOne 即可自动触发持续集成（CI/CD）更新网页。

---

## 📁 核心目录结构 (Project Structure)

```text
├── config/                  # Taro 编译与 Vite 打包配置 (包含图片分块优化)
├── src/
│   ├── assets/images/       # 本地静态图片资源 (头像、专利证书、软著配图等)
│   ├── components/          # 公共组件 (如 ChatBubble 聊天气泡)
│   ├── pages/
│   │   ├── home/            # 主页 (个人信息、成果入口、联系方式)
│   │   ├── chat/            # AI 数字分身聊天页
│   │   ├── paper/           # 论文成果展示页
│   │   ├── patent/          # 专利成果展示页
│   │   ├── software/        # 软著成果展示页
│   │   └── project/         # 项目经历展示页
│   ├── app.tsx              # 应用入口文件
│   └── app.config.ts        # 全局路由与窗口配置
└── package.json             # 项目依赖与脚本命令
```