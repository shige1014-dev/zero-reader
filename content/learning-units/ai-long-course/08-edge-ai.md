---
concept: On-device / Edge AI
question: 模型放手机里跑，比云端便宜多少？什么场景必须本地？
definition: Edge AI = 在终端 (手机 / 笔电 / IoT) 本地运行小模型 (1B-8B)，依赖量化 (Q4_K_M / GGUF) + 专用芯片 (Apple Neural Engine / Qualcomm Hexagon)。
mechanism: 量化把权重从 fp16 压到 4bit → 内存 1/4 + 速度 2-3x；NPU 专门加速 matmul → 实时 token 生成。
example: Apple Intelligence on-device 3B 模型；Llama 3.2 1B 手机本地跑 30 token/s；隐私敏感场景 (语音助手 / 健康) 必须本地。
misconception: 把 edge AI 当云端替代品；忽视它和云端的「前置过滤 + 隐私 + 离线」协同价值。
practice: 在 Mac 上跑 ollama + llama 3.2 3B Q4，测延迟 / 内存 / 准确率，和云端 Sonnet 对比。
reviewPrompt: 你的工作流哪些任务该放本地 (隐私 / 实时 / 离线)？哪些必须云端？
---
