
##  论文

### 论文 1：
- 名称：Graph-Enhanced Spatial-Spectral U-Net for Hyperspectral Image Classification
- 期刊会议：IEEE CW 2025
- 作者：Yage Song; Aoyuan Shi; Xueying Liu; Jie Zhou
- 图片：images\paper\1.png
- 链接：https://ieeexplore.ieee.org/abstract/document/11455400
- 摘要：Hyperspectral image (HSI) classification demands the sophisticated modeling of both intricate spatial contexts and long-range spectral dependencies. Prevailing methods, however, struggle with a fundamental trade-off: Convolutional Neural Networks (CNNs) exhibit spectral myopia due to their local receptive fields; Graph Neural Networks (GNNs) applied spatially can disrupt image integrity and incur prohibitive costs; and Transformers, while adept at capturing global dependencies, often struggle with quadratic complexity and data-hungry nature, limiting their scalability for HSI tasks. To resolve this, we propose S2 G-UNet, a unified framework architected for synergistic spatial-spectral feature learning. S2 G-UNet introduces three key innovations: (1) a Hierarchical Hybrid Feature Encoder (HHFE) that captures rich, multi-scale spatial features; (2) a Spectral Graph Refinement Module (SGRM), positioned at the network bottleneck, which uniquely models spectral bands as graph nodes to explicitly capture global inter-band correlations via graph attention; and (3) a Feature-Guided Interaction Module (FGIM) that ensures robust bidirectional semantic alignment between encoder and decoder pathways. Extensive experiments on three benchmark datasets demonstrate that S2G-UNet substantially outperforms contemporary methods, validating the efficacy of its synergistic design.


##  专利

### 专利 2：
- 名称：一种基于渐进式知识注入与检索增强生成的航空航天知识大模型构建方法
- 状态：已授权
- 发明人：汪俊、曹立群、宋雅各、易程、魏明强、郑晓杰
- 图片：images\patent\2.png
- 摘要：本发明公开一种基于渐进式知识注入与检索增强生成的航空航天知识大模型构建方法，包括：收集多源知识数据并进行预处理，构建航空航天领域知识库；基于DeepSeek‑R1‑8B模型，采用三阶段渐进式混合课程学习框架进行持续预训练；通过指令数据与知识引导机制，进行监督微调，完成大模型的基本构建；构建检索增强生成模块，形成“检索‑过滤‑生成”的流程，通过深度融合实时检索与生成推理，提升模型的知识覆盖度与事实一致性；通过多维度的量化指标与动态测试机制，评估模型的性能表现，形成从数据构建到反馈优化的完整评估生态。本发明所提出的方法，通过多阶段协同优化实现了航空航天领域知识的深度整合与高效应用。
 
### 专利 3：
- 名称：一种基于时空信息融合的航空贮箱壁板焊接质量实时预测方法
- 状态：已授权
- 发明人：汪俊、曹立群、宋雅各、濮宬涵、郭耀俊、钟珂珂
- 图片：images\patent\3.png
- 摘要：本发明涉及智能制造自动化检测技术领域，解决了传统方法依赖于单一的信息源，容易出现误判、漏检以及实时性不足的技术问题，尤其涉及一种基于时空信息融合的航空贮箱壁板焊接质量实时预测方法，包括：采集航空贮箱壁板焊接过程中的实时温度数据、应变数据以及焊缝纹理图像数据，综合生成航空贮箱壁板焊接过程中的时空变化数据；构建焊接质量预测模型；采用联合损失对焊接质量预测模型进行训练和权重更新；将时空变化数据输入至焊接质量预测模型
中得到航空贮箱壁板焊缝的焊接质量评级。本发明能够实现对航空贮箱壁板的焊缝焊接质量的实时精确预测，提高检测的准确性和效率，同时保证高准确率的需求。
 
### 专利 4：
- 名称：一种多尺度特征提取的涡轮起动机外观缺陷检测方法
- 状态：已公开
- 发明人：安理想、夏文艺、康正水、刘浩康、汪俊、李佳鼎、宋雅各、杨国栋
- 图片：images\patent\4.png
- 摘要：本发明涉及一种多尺度特征提取的涡轮起动机外观缺陷检测方法，包括：采集涡轮起动机外观缺陷数据，并定义缺陷种类得到外观缺陷特征图；将其输入数据增强模块，根据图像类型调整参数，输出多属性缺陷特征图；构建特征提取模块，提取多属性缺陷特征图中的缺陷数据特征，转换成多层特征映射，生成多尺度缺陷特征图；将多尺度缺陷特征图输入增强特征提取网络，获取并聚合高维多尺度缺陷特征，生成多尺度融合缺陷特征图；构建缺陷检测模块，检测多尺度缺陷的边界框预测和分类结果；采用相似性和并集交集损失，对模型进行训练和权重更新，得到最终缺陷检测模型。本发明实现了对涡轮起动机外观的多种不同尺度目标的缺陷的精确的定位与分类。
 
### 专利 5：
- 名称：一种多模态参数信号协同的火箭贮箱搅拌摩擦焊焊缝抗拉强度预测方法
- 状态：已授权
- 发明人：汪俊、宋雅各、曹立群、单鹏飞、易程
- 图片：images\patent\5.png
- 摘要：本发明公开一种多模态参数信号协同的火箭贮箱搅拌摩擦焊焊缝抗拉强度预测方法，包括：采集火箭贮箱搅拌摩擦焊焊接过程中的静态工艺参数向量和过程信号数据，构建用于搅拌摩擦焊焊缝抗拉强度预测的多模态数据集；构建焊缝抗拉强度预测模型，以多模态数据集为输入，预测搅拌摩擦焊焊缝抗拉强度；设计损失函数对所述焊缝抗拉强度预测模型进行训练，通过反向传播更新焊缝抗拉强度预测模型中各模块的权重；将待测搅拌摩擦焊焊缝的静态工艺参数向量与过程信号数据输入训练好的焊缝抗拉强度预测模型，输出待测搅拌摩擦焊焊缝抗拉强度的预测结果。本发明实现了对火箭贮箱的焊缝抗拉强度的实时精确预测。


##  软著

### 软著 1：
- 名称：航天产品机械加工质量预测系统
- 状态：已授权
- 图片：images\copyright\1.png
- 摘要：本软件系统可以在航天产品进行机械加工时，通过分析加工G代码和采集各阶段加工流水线的过程数据，预测出相应的产品质量指标的质量结果。该软件系统界面友好，操作简单，预测精度高。该系统主要分为质量预测模块和记录查询模块。质量预测模块提供对航天产品参数进行分析的功能，预测产品质量指标的结果。记录查询模块则提供质量预测任务记录的功能，并保留质量预测结果及相应参数。

### 软著 2：
- 名称：航天产品机械加工质量优化系统
- 状态：已授权
- 图片：images\copyright\2.png
- 摘要：本软件系统能够在航天产品进行机械加工时，通过分析航天产品的加工G代码、采集各阶段加工流水线的过程数据以及当前数据的产品加工质量结果，从而优化加工G代码。该系统界面友好、操作简单，并具有良好的优化效果。系统主要包含质量优化模块和记录查询模块。质量优化模块负责分析航天产品的参数和产品加工质量结果，以优化相应产品质量指标对应的机床加工G代码。记录查询模块则用于记录质量优化任务，并保存质量优化前后的参数。


