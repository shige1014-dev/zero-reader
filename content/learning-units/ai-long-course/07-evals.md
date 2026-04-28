---
concept: 评测与 evals
question: 没有 eval 的 AI 系统，为什么注定上不了生产？
definition: Evals 是一组可重复运行的测试用例，用来量化模型/系统在特定任务上的表现。没有 evals = 改一行 prompt 不知道好坏 = 任何优化都是赌博。
mechanism: 好 evals = 真实分布的输入样本 + 客观可判断的输出 + 量化指标（准确率、引用率、风格匹配）。LLM-as-judge 适合主观任务但需校准。
example: OpenAI 内部数千个 evals；Anthropic 评估模型用 multi-turn safety eval；任何严肃 RAG 项目都先建 50-200 题 eval set 再调代码。
misconception: 不要用单次 demo 判断模型好坏，也不要靠 vibe check 决定是否上线。
practice: 给当前任务写 20 个 eval 用例，每次 prompt 修改前后跑一遍。
reviewPrompt: 部署前问：这套系统在我的 evals 上跑分多少？回归了吗？
---
