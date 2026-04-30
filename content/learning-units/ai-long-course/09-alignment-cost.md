---
concept: AI 安全与对齐成本
question: "更安全的模型"为什么往往更弱？这个 tax 该谁付？
definition: Alignment tax = 为安全 / 拒绝 / 价值观对齐而牺牲的模型能力 / 实用性，存在于 RLHF / Constitutional AI / safety filter 各层。
mechanism: 偏好训练把"危险输出"概率压低 → 同时压低相邻 capability → 出现过度拒绝 / 钝化创意 / 损失推理深度。
example: Claude 1 → 3.5 安全提升但被指 over-refuse；Llama 2 chat 比 base 弱 5-10% benchmark；DeepSeek-R1 留更多原始能力但安全性争议。
misconception: 把"安全"和"能力"当独立维度；忽视付出对齐税的是终端用户。
practice: 用同一 prompt 测多家模型 (Claude / GPT / Llama / DeepSeek)，记录拒绝率 + 任务完成质量。
reviewPrompt: 你最常被模型拒绝的场景是什么？是真危险还是 over-refuse？
---
