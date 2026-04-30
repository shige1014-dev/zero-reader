---
concept: MCP / Tool Ecosystems
question: agent 接外部工具的标准为什么决定生态格局？
definition: MCP (Model Context Protocol, Anthropic 2024) = 统一的 LLM-工具接口标准，类似 USB-C，让 agent 跨厂商调用相同工具。
mechanism: MCP server 暴露 tool / resource / prompt → 任何兼容 client (Claude / Cursor / 自建 agent) 即插即用 → 工具开发者只写一次。
example: 2025 主流 IDE / agent 框架普遍接 MCP，Anthropic / Cursor / Continue / Cline 形成互通生态；OpenAI 后续也跟进。
misconception: 把 MCP 当「又一个 protocol」，忽视它对 agent 生态护城河的重塑 — 标准接口 = 工具变商品。
practice: 搭一个最小 MCP server (file 操作 / API 调用)，让 Claude / Cursor 同时使用。
reviewPrompt: 你日常用的 agent 哪些已经支持 MCP？还差哪些工具需要自己写？
---
