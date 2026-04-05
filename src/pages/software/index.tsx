import { useCallback } from 'react'
import { Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

// 导入本地软著图片
import softwareImg1 from '../../assets/images/software1.png'
import softwareImg2 from '../../assets/images/software2.png'

interface SoftwareInfo {
  title: string
  abstract: string
  image: string
  status?: string
}

const SOFTWARE_LIST: SoftwareInfo[] = [
  {
    title: '航天产品机械加工质量预测系统',
    abstract: '本软件系统可以在航天产品进行机械加工时，通过分析加工G代码和采集各阶段加工流水线的过程数据，预测出相应的产品质量指标的质量结果。该软件系统界面友好，操作简单，预测精度高。该系统主要分为质量预测模块和记录查询模块。质量预测模块提供对航天产品参数进行分析的功能，预测产品质量指标的结果。记录查询模块则提供质量预测任务记录的功能，并保留质量预测结果及相应参数。',
    image: softwareImg1,
    status: '已授权'
  },
  {
    title: '航天产品机械加工质量优化系统',
    abstract: '本软件系统能够在航天产品进行机械加工时，通过分析航天产品的加工G代码、采集各阶段加工流水线的过程数据以及当前数据的产品加工质量结果，从而优化加工G代码。该系统界面友好、操作简单，并具有良好的优化效果。系统主要包含质量优化模块和记录查询模块。质量优化模块负责分析航天产品的参数和产品加工质量结果，以优化相应产品质量指标对应的机床加工G代码。记录查询模块则用于记录质量优化任务，并保存质量优化前后的参数。',
    image: softwareImg2,
    status: '已授权'
  }
]

const Software = () => {
  const handleBack = useCallback(() => {
    const pages = Taro.getCurrentPages()
    if (pages.length > 1) {
      Taro.navigateBack()
    } else {
      Taro.redirectTo({
        url: '/pages/home/index'
      })
    }
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
          <h1 className="text-lg font-bold text-slate-800 tracking-wide">软著</h1>
        </div>
      </div>

      {/* 内容区：软著列表 */}
      <div className="flex-1 p-4 md:p-6 max-w-4xl mx-auto w-full flex flex-col gap-5">
        {SOFTWARE_LIST.map((software, index) => (
          <div 
            key={index} 
            className="relative flex flex-col md:flex-row bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group"
          >
            {/* 状态角标 */}
            {software.status && (
              <div className={`absolute top-0 right-0 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-2xl z-10 shadow-sm flex items-center gap-1 ${
                software.status === '已授权' 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500'
              }`}>
                <div className={software.status === '已授权' ? 'i-mdi-check-decagram text-sm' : 'i-mdi-eye-outline text-sm'} />
                <span>{software.status}</span>
              </div>
            )}
            
            {/* 左侧：软著配图 */}
            <div className="w-full md:w-56 shrink-0 bg-slate-50/50 border-b md:border-b-0 md:border-r border-slate-100 p-5 flex items-center justify-center overflow-hidden">
              <Image 
                src={software.image} 
                mode="widthFix" 
                className="w-full h-auto rounded-sm border border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* 右侧：软著信息 */}
            <div className="flex-1 p-5 md:p-6 flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors leading-snug pr-16">
                {software.title}
              </h2>
              
              <div className="mt-2 text-sm text-slate-600 leading-relaxed text-justify line-clamp-[8]">
                <span className="font-bold text-slate-700 mr-1">摘要：</span>
                {software.abstract}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Software
