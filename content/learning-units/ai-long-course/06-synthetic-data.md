---
concept: Synthetic Data 训练
question: 训练数据快用完了，模型靠什么继续变强？
definition: Synthetic data = 由 LLM 生成 / 重写 / 增广的训练数据，用于扩展 pre-training 或微调阶段，绕开人写数据的瓶颈。
mechanism: 强模型生成数据 → 过滤 / rewrite / 多视角增广 → 训练弱模型 (蒸馏)；或自我对弈 (self-play) 提升能力。
example: Phi-4 microsoft 大量用 GPT-4 合成数据训练，14B 模型逼近 70B 表现；Llama 3.1 instruct 数据 95% 合成。
misconception: 把合成数据当"无成本扩展"，忽视模型崩溃 (model collapse) 风险 — 同分布数据循环训练会衰减多样性。
practice: 选一个 fine-tune 任务，对比 100% 真实数据 vs 50% 合成 + 50% 真实，看 eval 表现。
reviewPrompt: 你的微调数据合成比例多少合适？数据多样性怎么控？
---
