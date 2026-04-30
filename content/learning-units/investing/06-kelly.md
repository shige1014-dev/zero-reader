---
concept: 凯利公式
question: 你确信赔率，但仓位多大才「最优」？
definition: Kelly f* = (bp - q) / b，其中 b=赔率、p=赢概率、q=1-p；最大化长期资本几何增长率。
mechanism: Kelly 假设可重复独立下注 + 真实概率已知；超 Kelly 提高破产概率，半 Kelly 通常更稳。
example: 赢率 60% / 赔率 1:1 → Kelly 满仓 20%；很多人凭感觉押 50%，长期实际几何回报反而下降。
misconception: 把估算概率当真实概率；忽视相关性 (多笔仓位的有效 Kelly 比单笔小)。
practice: 列出近期 5 笔决策，反推每笔暗含的 Kelly 假设，看仓位有没有夸大概率。
reviewPrompt: 你最大那笔仓位对应的赢率是多少？真有那么高吗？
---
