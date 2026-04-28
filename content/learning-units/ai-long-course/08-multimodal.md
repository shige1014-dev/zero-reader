---
concept: 多模态
question: 多模态模型是把图像变成文字，还是真正"看见"了？
definition: 多模态模型把图像、音频、视频编码到与文本相同的向量空间，模型在统一空间里推理。不只是 OCR + 文本，是视觉空间关系、音色、动作时序的端到端理解。
mechanism: Vision encoder（如 CLIP、ViT）把图像切成 patch token；与文本 token 拼接进同一个 transformer。训练目标包括对齐损失、生成损失、推理损失。
example: GPT-4V 能看 UI 截图写自动化代码；Claude 看 PDF 表格直接抽数据；Gemini 看视频片段总结剧情；这些都不是 OCR 能做到的。
misconception: 不要把多模态等同于 OCR + GPT，能力上限在视觉推理而非文字提取。
practice: 给模型一张复杂图（流程图/财报截图），看它能否回答需要空间关系的问题。
reviewPrompt: 设计多模态系统时问：这个任务真的需要视觉，还是 OCR + 文本就够？
---
