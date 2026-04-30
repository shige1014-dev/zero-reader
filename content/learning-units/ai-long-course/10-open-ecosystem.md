---
concept: 开源生态 / Llama 路径
question: 开源模型为什么能威胁闭源巨头？格局会怎样演化？
definition: 开源模型 (Llama / Mistral / DeepSeek / Qwen / Hermes) 公开权重 + 允许商用，催生微调 / 部署 / 应用层完整生态。
mechanism: 闭源 API 成本固定 + 数据合规担忧 → 企业偏好自托管 → 开源模型迭代加速 → 微调工具链 (Axolotl / Unsloth) + 部署框架 (vLLM / TGI) 繁荣。
example: 2025 Llama 4 / DeepSeek-V3.5 / Qwen 3 在多数基准追平 GPT-4o；Hermes 4 用 Llama 405B 做高质量 post-train，在 function-call 任务超闭源；HuggingFace 月下载 1B+。
misconception: 把「开源 = 性能弱」，忽视前沿差距已经 < 6 个月；把「自托管 = 便宜」，忽视 GPU + 运维成本。
practice: 用 ollama / vLLM 跑一个开源模型 (Llama 3.3 70B 或 DeepSeek-V3) 替代某个 API 任务，比较 $/1M token + 质量。
reviewPrompt: 你的哪些任务该用开源 self-host？哪些保留闭源 API？
---
