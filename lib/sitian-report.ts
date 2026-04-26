import fs from "fs";

export interface SitianSnapshot {
  timestamp: string;
  mode: string;
  alertLevel: string;
  vix: { value: number; delta1d: number };
  tnx: { value: number; delta1d: number };
  dxy: { value: number; delta1d: number };
  fearGreed: { value: number; label: string };
  btc: { value: number; change24hPct: number };
  stockWatch: {
    dailyMain: Array<{
      symbol: string;
      label: string;
      thesis: string;
      change1dPct?: number;
    }>;
  };
}

const DEFAULT_SITIAN_REPORT_PATH = "/Users/shige1014/zerozero-agent/sitian_report.json";

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export function readSitianSnapshot(reportPath = process.env.SITIAN_REPORT_PATH ?? DEFAULT_SITIAN_REPORT_PATH): SitianSnapshot | null {
  try {
    if (!fs.existsSync(reportPath)) {
      return null;
    }

    const raw = JSON.parse(fs.readFileSync(reportPath, "utf8")) as Record<string, any>;
    const dailyMain = Array.isArray(raw.stock_watch?.daily_main) ? raw.stock_watch.daily_main : [];

    return {
      timestamp: asString(raw.timestamp),
      mode: asString(raw.mode, "ROUTINE"),
      alertLevel: asString(raw.alert_level, "ROUTINE"),
      vix: {
        value: asNumber(raw.heaven_track?.VIX?.value),
        delta1d: asNumber(raw.heaven_track?.VIX?.delta_1d)
      },
      tnx: {
        value: asNumber(raw.heaven_track?.TNX?.value),
        delta1d: asNumber(raw.heaven_track?.TNX?.delta_1d)
      },
      dxy: {
        value: asNumber(raw.heaven_track?.DXY?.value),
        delta1d: asNumber(raw.heaven_track?.DXY?.delta_1d)
      },
      fearGreed: {
        value: asNumber(raw.human_track?.fear_greed?.value),
        label: asString(raw.human_track?.fear_greed?.label)
      },
      btc: {
        value: asNumber(raw.crypto_track?.BTCUSDT?.value),
        change24hPct: asNumber(raw.crypto_track?.BTCUSDT?.change_24h_pct)
      },
      stockWatch: {
        dailyMain: dailyMain.map((item: any) => ({
          symbol: asString(item.symbol),
          label: asString(item.label),
          thesis: asString(item.thesis),
          change1dPct: typeof item.change_1d_pct === "number" ? item.change_1d_pct : undefined
        }))
      }
    };
  } catch {
    return null;
  }
}
