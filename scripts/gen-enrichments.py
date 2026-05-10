"""
学习台 enrichments 批量补全
读 data.ts 全 44 + enrichments.ts 已有 12 → 给 32 缺失项生成
模型: claude-haiku-4-5 (~$0.15)
输出: enrichments-generated.json (用户校对后 merge 到 enrichments.ts)
"""
import os
import re
import json
from pathlib import Path

home_env = Path.home() / ".env"
if home_env.exists():
    for line in home_env.read_text().splitlines():
        if line.startswith("ANTHROPIC_API_KEY="):
            os.environ["ANTHROPIC_API_KEY"] = line.split("=", 1)[1].strip().strip('"').strip("'")
            break

if not os.environ.get("ANTHROPIC_API_KEY"):
    raise SystemExit("❌ ANTHROPIC_API_KEY 未设置")

import anthropic

ROOT = Path(__file__).resolve().parent.parent
DATA = (ROOT / "lib/stock-learning/data.ts").read_text()
ENRICH = (ROOT / "lib/stock-learning/enrichments.ts").read_text()

# 已有 enrichment tickers
existing = set(re.findall(r'ticker:\s*"([A-Z]+)"', ENRICH))
# 全 44 候选
candidates = re.findall(
    r'\{\s*ticker:\s*"([A-Z]+)",\s*name:\s*"([^"]+)",\s*nameZh:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*rating:\s*"([^"]+)"',
    DATA
)
missing = [(tk, nm, nmzh, cat, rt) for tk, nm, nmzh, cat, rt in candidates if tk not in existing]
print(f"📜 已有 {len(existing)} | 缺 {len(missing)}")
print(f"缺: {[m[0] for m in missing]}")

client = anthropic.Anthropic()
out = {}

PROMPT = """你是个美股研究员, 给以下公司生成结构化资料 (用于学习卡片).

公司: {nm} ({nmzh}) — ticker {tk}
板块: {cat} | 评级: {rt}

输出严格 JSON (不要 markdown 包裹), 字段:
{{
  "ticker": "{tk}",
  "exchange": "NYSE" 或 "NASDAQ",
  "hq": "美国·州 城市",
  "founded": <year int>,
  "employees": "字符串如 '5K' / '<0.5K' / '50K'",
  "capTier": "mega/large/mid/small/micro 选 1",
  "industryTags": ["标签1", "标签2", "标签3"],
  "ceo": "CEO 姓名 (英文)",
  "business": "业务模式 1-2 段中文 80-120 字",
  "products": ["产品 1", "产品 2", "产品 3"],
  "customers": ["客户 1", "客户 2"],
  "competitors": ["对手 1", "对手 2", "对手 3"],
  "catalysts": ["催化 1", "催化 2", "催化 3"],
  "scenarios": {{
    "bull": {{ "trigger": "简明触发条件", "impact": "+X% 估值变化" }},
    "base": {{ "trigger": "中性场景", "impact": "+/-X%" }},
    "bear": {{ "trigger": "失败场景", "impact": "-X%" }}
  }}
}}

注意:
1. 不要写"作为一家XX公司"开头, 直接事实
2. catalysts 必须是未来 1-2 年具体事件
3. 数据不确定时给最佳估计, 不写"无法确定"
4. industryTags 要具体不要 generic
"""

for tk, nm, nmzh, cat, rt in missing:
    try:
        msg = client.messages.create(
            model="claude-haiku-4-5",
            max_tokens=1500,
            messages=[{"role": "user", "content": PROMPT.format(tk=tk, nm=nm, nmzh=nmzh, cat=cat, rt=rt)}],
        )
        text = msg.content[0].text.strip()
        text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text, flags=re.MULTILINE)
        try:
            data = json.loads(text)
            out[tk] = data
            print(f"  ✅ {tk:6s} {nmzh}")
        except json.JSONDecodeError as e:
            print(f"  ⚠️  {tk}: JSON 失败 - {text[:120]}")
    except Exception as e:
        print(f"  ❌ {tk}: {str(e)[:100]}")

dest = ROOT / "scripts/enrichments-generated.json"
dest.write_text(json.dumps(out, indent=2, ensure_ascii=False))
print(f"\n💾 写: {dest}")
print(f"📦 {len(out)}/{len(missing)} 成功")
print(f"⚠️  AI 生成, 关键字段 (CEO/founded/HQ) 上线前请人工复核")
