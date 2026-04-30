---
concept: Reasoning Models (o-series / R1)
question: 为什么「会思考」的模型能在数学 / 代码上跳级提升？
definition: Reasoning models = 在推理时分配额外算力做内部 chain-of-thought (CoT) + 自我验证，用 test-time compute 换准确率。
mechanism: 训练阶段用 RL + 推理过程奖励 → 推理时模型自动展开长 CoT → token 量提升 10-100x → 困难任务正确率跃升。
example: OpenAI o1/o3 在 AIME 数学从 13% → 83%；DeepSeek R1 用 GRPO 复现，模型权重开源公开机制。
misconception: 把 reasoning 当 prompt 技巧；忽视成本曲线 (token 量×10-100，延迟 30s-5min)。
practice: 同一道题分别用普通模型 + reasoning 模型跑，对比 token 消耗 / 时间 / 准确率。
reviewPrompt: 你的任务里哪些值得用 reasoning model？哪些用普通模型更划算？
---
