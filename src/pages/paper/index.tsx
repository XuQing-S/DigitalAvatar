import { useCallback } from 'react'
import { Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

// 导入本地论文图片
import paperImg1 from '../../assets/images/paper1.png'

interface PaperInfo {
  title: string
  authors: string
  journal: string
  abstract: string
  image: string
  link?: string
}

const PAPER_LIST: PaperInfo[] = [
  {
    title: 'Graph-Enhanced Spatial-Spectral U-Net for Hyperspectral Image Classification',
    journal: 'IEEE CW 2025',
    authors: 'Yage Song; Aoyuan Shi; Xueying Liu; Jie Zhou',
    abstract: 'Hyperspectral image (HSI) classification demands the sophisticated modeling of both intricate spatial contexts and long-range spectral dependencies. Prevailing methods, however, struggle with a fundamental trade-off: Convolutional Neural Networks (CNNs) exhibit spectral myopia due to their local receptive fields; Graph Neural Networks (GNNs) applied spatially can disrupt image integrity and incur prohibitive costs; and Transformers, while adept at capturing global dependencies, often struggle with quadratic complexity and data-hungry nature, limiting their scalability for HSI tasks. To resolve this, we propose S2 G-UNet, a unified framework architected for synergistic spatial-spectral feature learning. S2 G-UNet introduces three key innovations: (1) a Hierarchical Hybrid Feature Encoder (HHFE) that captures rich, multi-scale spatial features; (2) a Spectral Graph Refinement Module (SGRM), positioned at the network bottleneck, which uniquely models spectral bands as graph nodes to explicitly capture global inter-band correlations via graph attention; and (3) a Feature-Guided Interaction Module (FGIM) that ensures robust bidirectional semantic alignment between encoder and decoder pathways. Extensive experiments on three benchmark datasets demonstrate that S2G-UNet substantially outperforms contemporary methods, validating the efficacy of its synergistic design.',
    image: paperImg1,
    link: 'https://ieeexplore.ieee.org/abstract/document/11455400'
  }
]

const Paper = () => {
  const handleBack = useCallback(() => {
    Taro.navigateBack()
  }, [])

  const handleOpenLink = useCallback((link: string) => {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      window.open(link, '_blank')
    } else {
      Taro.setClipboardData({
        data: link,
        success: () => {
          Taro.showToast({
            title: '链接已复制，请在浏览器打开',
            icon: 'none',
            duration: 2000
          })
        }
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
          <h1 className="text-lg font-bold text-slate-800 tracking-wide">论文</h1>
        </div>
      </div>

      {/* 内容区：论文列表 */}
      <div className="flex-1 p-4 md:p-6 max-w-4xl mx-auto w-full flex flex-col gap-5">
        {PAPER_LIST.map((paper, index) => (
          <div 
            key={index} 
            className="relative flex flex-col md:flex-row bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group"
          >
            {/* 左侧：论文配图 */}
            <div className="w-full md:w-56 shrink-0 bg-slate-50/50 border-b md:border-b-0 md:border-r border-slate-100 p-5 flex items-center justify-center overflow-hidden">
              <Image 
                src={paper.image} 
                mode="widthFix" 
                className="w-full h-auto rounded-sm border border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* 右侧：论文信息 */}
            <div className="flex-1 p-5 md:p-6 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-snug">
                  {paper.title}
                </h2>
                {paper.link && (
                  <button 
                    onClick={() => handleOpenLink(paper.link!)}
                    className="shrink-0 p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors flex items-center justify-center mt-1"
                    title="访问论文"
                  >
                    <div className="i-mdi-open-in-new text-xl" />
                  </button>
                )}
              </div>
              
              <div className="flex flex-col gap-2 mt-1">
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <div className="i-mdi-book-open-page-variant-outline text-lg text-indigo-500/70 shrink-0" />
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md text-xs font-bold tracking-wider">{paper.journal}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <div className="i-mdi-account-group-outline text-lg text-indigo-500/70 shrink-0" />
                  <span>{paper.authors}</span>
                </div>
              </div>
              
              <div className="mt-2 text-sm text-slate-600 leading-relaxed text-justify line-clamp-[5]">
                <span className="font-bold text-slate-700 mr-1">Abstract:</span>
                {paper.abstract}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Paper
