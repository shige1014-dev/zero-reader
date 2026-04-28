---
concept: Agent 工作流
question: 什么时候需要 Agent，什么时候普通自动化就够？
definition: Agent 是能围绕目标进行观察、计划、调用工具、检查结果并迭代的系统，不等于简单聊天机器人。
mechanism: Agent 的价值来自把模型能力接入工具和状态管理；失败点通常在目标分解、权限边界、校验和长任务记忆。
example: 自动整理研究报告需要搜索、读取、摘录、交叉验证和输出格式控制，比单次问答更适合 Agent。
misconception: 不要把所有自动化都做成 Agent，规则稳定的任务用脚本更可靠。
practice: 拆一个真实任务：观察、计划、工具调用、校验、交付。
reviewPrompt: 判断一个任务是否需要 Agent：是否有多步、工具和反馈循环？
---
