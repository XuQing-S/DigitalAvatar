import { useCallback } from 'react'
import Taro from '@tarojs/taro'

const Project = () => {
  const handleBack = useCallback(() => {
    Taro.navigateBack()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center shadow-sm">
        <button 
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 active:scale-95 transition-all text-slate-600"
        >
          <div className="i-mdi-arrow-left text-2xl" />
        </button>
        <div className="flex-1 text-center pr-10">
          <h1 className="text-lg font-bold text-slate-800 tracking-wide">项目</h1>
        </div>
      </div>

      {/* 内容区 */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-slate-400">
        <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6 shadow-sm border border-blue-100">
          <div className="i-mdi-application-brackets-outline text-5xl text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-700 mb-2">内容整理中</h2>
        <p className="text-sm text-slate-500 text-center max-w-xs">
          相关的项目经历和成果正在快马加鞭地整理中，敬请期待。
        </p>
      </div>
    </div>
  )
}

export default Project
