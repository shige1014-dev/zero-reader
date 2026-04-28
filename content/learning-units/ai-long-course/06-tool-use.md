---
concept: Tool Use 与函数调用
question: 让模型调用工具和让它直接生成答案，本质区别是什么？
definition: Tool Use 是让模型在生成过程中决定何时调用外部函数（数据库、API、代码执行），把模型从"知识容器"变成"流程编排器"。模型推理 + 工具结果反复迭代直到任务完成。
mechanism: 模型输出结构化 function call → 系统执行 → 结果回传 context → 模型决定下一步。失败点在于工具描述不清、参数错误、错误回退、循环爆炸。
example: 让 Claude 查 SQL 数据库回答业务问题；让 GPT-4 调用 Python 解释器算复杂数学；让 agent 用浏览器抓网页再总结。
misconception: 不要把 Tool Use 当神奇杠杆，工具描述质量直接决定调用准确率，工具越多越乱。
practice: 给一个任务设计 3 个工具，跑 10 次看模型选对率多少。
reviewPrompt: 加一个工具前问自己：模型 prompt 里的工具描述清晰到能让别人理解吗？
---
