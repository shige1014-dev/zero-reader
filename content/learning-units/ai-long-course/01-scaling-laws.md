---
concept: Pre-training Scaling Laws
question: 模型变大、数据变多、算力变高 — 哪个边际收益最大？
definition: Scaling laws (Kaplan 2020 / Chinchilla 2022) 揭示损失函数随参数 N、数据 D、算力 C 的幂律下降关系，指导算力分配最优比例。
mechanism: 给定算力预算，最优 N:D ≈ 1:20 (Chinchilla)；只堆参数不堆数据会「训练不足」，浪费算力。
example: GPT-3 175B 用 300B token 严重 under-trained；Chinchilla 70B 用 1.4T token 同算力下表现更好。Llama 3 沿此方向。
misconception: 把「更大模型 = 更强」，忽视数据 / token 配比；以为 scaling laws 永远不会饱和。
practice: 选 3 个开源模型，查 N (参数) 和 D (训练 token)，算 D/N 比值，对比 benchmark 排名。
reviewPrompt: 这个模型属于「过度训练」还是「训练不足」？scaling 投入花在了哪？
---
