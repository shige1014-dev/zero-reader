export type CompanyNarrative =
  | "ai-agents"
  | "energy-reconstruction"
  | "defense-autonomy"
  | "space-infrastructure"
  | "automated-production"
  | "financial-data-intelligence";

export type CompanyRole =
  | "core dependency"
  | "second-order beneficiary"
  | "constraint variable"
  | "narrative spillover";

export type LinkStrength = "core" | "strong" | "weak";

export type LinkRole = "supplies" | "depends_on" | "competes_with" | "enables" | "constrains" | "finances" | "hedges";

export interface MatrixLayer {
  id: number;
  label: string;
  summary: string;
}

export interface CompanyNode {
  ticker: string;
  name: string;
  primaryLayer: number;
  secondaryLayers: number[];
  narratives: CompanyNarrative[];
  role: CompanyRole;
  thesis: string;
}

export interface CompanyLink {
  source: string;
  target: string;
  strength: LinkStrength;
  role: LinkRole;
  thesis: string;
}

export interface CompanyMatrixFilters {
  narratives: CompanyNarrative[];
  layers: number[];
  strengths: LinkStrength[];
}

export interface RenderableCompanyLink extends Omit<CompanyLink, "source" | "target"> {
  source: CompanyNode;
  target: CompanyNode;
}

export interface MatrixValidationResult {
  duplicateTickers: string[];
  unknownLinkTickers: string[];
}
