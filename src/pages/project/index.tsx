import { useCallback } from 'react'
import { Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

// 导入本地项目图片
import projectImg1 from '../../assets/images/project1.png'
import projectImg2 from '../../assets/images/project2.png'

interface ProjectInfo {
  title: string
  start_time: string
  end_time: string
  identity: string
  abstract: string
  category: string
  image: string
  status?: string
}

const PROJECT_LIST: ProjectInfo[] = [
  {
    title: '生产制造流程的柔性构造理论方法与技术集成演示验证',
    start_time: '2024-09-01',
    end_time: '2025-12-31',
    identity: '项目主要负责人',
    abstract: '本项目针对未来工业互联网下柔性生产全流程资源调度灵活性差、工艺规划周期长、产品质量控制难、系统可靠性评价精度低等实际瓶颈问题，首先，揭示柔性制造资源调度关键影响因素和约束的耦合关联机制，构建柔性制造产能评估与分布式资源调度模型；其次，提出柔性生产系统的模块化可重构设计与制造协同优化方法，研制面向生产工艺设计与生产配置智能控制系统；再次，阐明复杂产品全流程生产质量与关键工艺双向映射机制，构建柔性制造质量控制与数字化追溯系统；最后，突破柔性制造系统可靠性评价及稳定性构建方法，研发基于工业互联网的协同调控一体化集成验证平台，并在航空、航天、装备制造等典型应用场景开展创新应用示范，显著提升协同运行效率、制造良品率以及系统稳定性。本项目将形成系统的生产制造流程柔性构造的技术体系和应用验证环境，为促进高效率高质量柔性化智能制造工程技术的创新发展提供科学依据。',
    category: '国家自然科学基金未来工业互联网基础理论与关键技术重大研究计划集成项目',
    image: projectImg1,
    status: '已结项'
  },
  {
    title: '柔性制造全流程质量在线评价与动态调控理论与关键技术',
    start_time: '2024-09-01',
    end_time: '2025-12-31',
    identity: '项目主要负责人',
    abstract: '本项目针对未来工业互联网柔性制造质量高效精准检测难、研制周期工艺调控难、产品质量一致性差、系统重构偏差大等瓶颈问题，首先，研究复杂结构多参量跨尺度特征精确检测与质量评价方法，研制高效率高精度智能化柔性在线检测与评价系统；其次，探明工艺参数与质量特性的非线性时变映射机制，设计基于小样本数据的复杂结构质量预测与工艺优化方法；再次，揭示全流程质量多源误差混合迭代传播机理，建立基于误差源分析的工艺动态重构模型；最后，构建面向柔性制造质量全过程数字化追溯和智能调控孪生系统，在航空航天大型复材构件、车船零部件制造等典型工业场景开展技术有效性验证，显著提升质量检测精度和效率、制造良品率、质量控制准确性以及系统协同运行效率，能够大幅度缩短产品试制周期和成本。本项目将形成系统的柔性制造全流程质量在线评价与动态调控方法，为促进智能制造工程技术的创新发展提供科学依据。',
    category: '国家自然科学基金未来工业互联网基础理论与关键技术重大研究计划重点支持项目',
    image: projectImg2,
    status: '已结项'
  }
]

const Project = () => {
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
          <h1 className="text-lg font-bold text-slate-800 tracking-wide">项目</h1>
        </div>
      </div>

      {/* 内容区：项目列表 */}
      <div className="flex-1 p-4 md:p-6 max-w-4xl mx-auto w-full flex flex-col gap-5">
        {PROJECT_LIST.map((project, index) => (
          <div 
            key={index} 
            className="relative flex flex-col md:flex-row bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group"
          >
            {/* 状态角标 */}
            {project.status && (
              <div className={`absolute top-0 right-0 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-2xl z-10 shadow-sm flex items-center gap-1 ${
                project.status === '已结项' 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-500'
              }`}>
                <div className={project.status === '已结项' ? 'i-mdi-check-decagram text-sm' : 'i-mdi-clock-outline text-sm'} />
                <span>{project.status}</span>
              </div>
            )}
            
            {/* 左侧：项目配图 */}
            <div className="w-full md:w-56 shrink-0 bg-slate-50/50 border-b md:border-b-0 md:border-r border-slate-100 p-5 flex items-center justify-center overflow-hidden">
              <Image 
                src={project.image} 
                mode="widthFix" 
                className="w-full h-auto rounded-sm border border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* 右侧：项目信息 */}
            <div className="flex-1 p-5 md:p-6 flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">
                {project.title}
              </h2>
              
              <div className="flex flex-col gap-3 mt-1">
                <div className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                  <div className="i-mdi-tag-outline text-lg text-blue-500/70 shrink-0 mt-0.5" />
                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md text-xs font-bold tracking-wider leading-relaxed text-left">{project.category}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <div className="i-mdi-calendar-range text-lg text-blue-500/70 shrink-0" />
                    <span>{project.start_time} 至 {project.end_time}</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 mx-3 shrink-0"></div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <div className="i-mdi-account-star-outline text-lg text-blue-500/70 shrink-0" />
                    <span>{project.identity}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-2 text-sm text-slate-600 leading-relaxed text-justify line-clamp-[8]">
                <span className="font-bold text-slate-700 mr-1">摘要：</span>
                {project.abstract}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Project
