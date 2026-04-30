---
concept: Post-training (RLHF / DPO / RLAIF)
question: pre-train 完只是「会说话」，怎么变成「听指令 + 守规矩」？
definition: Post-training = 在 base model 之上做 SFT (监督微调) + 偏好对齐 (RLHF / DPO / RLAIF)，把模型从「补全」驯化成「对话 + 推理 + 拒绝」。
mechanism: SFT 教格式 → 偏好学习 (PPO / DPO) 教选择 → constitutional AI 教自我约束。每一步都改改 capability frontier vs alignment tax 的权衡。
example: Claude 用 Constitutional AI；Llama 3 用 DPO + 指令调优；DeepSeek-R1 用 GRPO + 规则奖励产出推理能力。
misconception: 把 post-training 当「小修小补」；忽视它对最终模型行为分布影响巨大 (>40%)。
practice: 找一个开源 base + chat 版本对比 (Llama base vs instruct)，跑同 prompt 看输出差异。
reviewPrompt: 你常用模型的「个性」主要由哪一步 post-training 塑造？
---
