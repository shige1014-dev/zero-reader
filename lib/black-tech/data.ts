import blackTechData from "@/public/black-tech.json";
import museumData from "@/public/museum.json";

export type ExposureLevel = "公开军用" | "半公开" | "民间猜想";
export type MaturityLevel = "已商用" | "试点中" | "实验室" | "推测";
export type CivilianField =
  | "医疗"
  | "城市"
  | "工业"
  | "个人"
  | "交通"
  | "农业"
  | "能源"
  | "通信";

export interface CivilianApplication {
  field: CivilianField;
  product: string;
  changes: string;
}

export interface BlackTech {
  id: string;
  title: string;
  en: string;
  level: ExposureLevel;
  maturity: MaturityLevel;
  horizon: string;
  industries: CivilianField[];
  museumEraId: string;
  militaryOrigin: string;
  transferGate: string;
  signal: string;
  transferPath: string;
  review: string;
  civilianApplications: CivilianApplication[];
  civilianFuture: {
    example: string;
    newCompanies: string;
    industryImpact: string;
    aiSynergy: string;
    socialChange: string;
  };
  biggestChange: string;
  confidence: number;
}

export interface BlackTechFunnelLayer {
  label: string;
  count: number;
  note: string;
}

export interface MuseumEra {
  id: string;
  label: string;
  period: string;
  core: string;
  review: string;
}

type BlackTechJson = {
  maturityOrder: MaturityLevel[];
  funnel: BlackTechFunnelLayer[];
  techs: BlackTech[];
};

export const BLACK_TECH_DATA = blackTechData as BlackTechJson;
export const BLACK_TECHS = BLACK_TECH_DATA.techs;
export const BLACK_TECH_MATURITY_ORDER = BLACK_TECH_DATA.maturityOrder;
export const BLACK_TECH_FUNNEL = BLACK_TECH_DATA.funnel;
export const MUSEUM_ERAS = museumData.eras as MuseumEra[];

export const PRIMARY_FIELDS: CivilianField[] = ["医疗", "城市", "工业", "个人"];
export const EXPOSURE_LEVELS: ExposureLevel[] = ["公开军用", "半公开", "民间猜想"];

export const LEVEL_LABELS: Record<ExposureLevel, { className: string; dotClassName: string }> = {
  公开军用: { className: "blacktech-level-open", dotClassName: "blacktech-dot-open" },
  半公开: { className: "blacktech-level-gray", dotClassName: "blacktech-dot-gray" },
  民间猜想: { className: "blacktech-level-rumor", dotClassName: "blacktech-dot-rumor" }
};

export function getMuseumEra(eraId: string): MuseumEra | undefined {
  return MUSEUM_ERAS.find((era) => era.id === eraId);
}
