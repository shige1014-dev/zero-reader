---
concept: 多模态 vs 单模态权衡
question: 全能模型听起来好，单模态专门模型为什么还活着？
definition: 多模态 = 单一模型同时处理文本 / 图像 / 音频 / 视频；单模态专门模型 (如 Whisper / SDXL) 在自家任务上更深更准。
mechanism: 多模态共享 representation 节省 tokenizer / 部署成本，但需要更大模型 + 数据；专门模型小但专。
example: GPT-4o 多模态强但音频 STT 不如 Whisper；视觉理解 VQA 比 LLaVA 快但比 InternVL 弱。
misconception: 觉得"多模态 = 替代所有专门模型"；忽视部署 / 成本 / 延迟差异。
practice: 同一任务 (语音识别 / 图片 OCR) 跑多模态 + 专门模型，比较 WER / 准确率 / $/调用。
reviewPrompt: 你的工作流哪些环节适合多模态、哪些保留专门模型？
---
