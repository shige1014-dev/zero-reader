---
concept: Long Context 经济学
question: 1M token 上下文听着爽，为什么大家不全部用？
definition: Long context = 模型处理超长输入 (100K-2M token) 的能力，依赖 attention 优化 (Flash Attention / Ring Attention) + KV cache 管理。
mechanism: 计算复杂度 O(n²) → KV cache 内存爆炸 → 推理成本随 context 平方放大；同时存在 lost-in-the-middle 问题。
example: Claude 1M / Gemini 2M 看起来无敌，实际超过 200K token 时 needle-in-haystack 准确率 < 60%，且单请求成本 $1+。
misconception: 把「支持 1M token」当「利用 1M token」；忽视 retrieval + summary 是更便宜的替代。
practice: 同一长文档分别用 full context + RAG 切块，对比成本 / 准确率 / 延迟。
reviewPrompt: 你正在做的任务真的需要 long context 吗？还是 RAG + summary 就够？
---
