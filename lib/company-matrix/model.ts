import type {
  CompanyLink,
  CompanyMatrixFilters,
  CompanyNode,
  MatrixLayer,
  MatrixValidationResult,
  RenderableCompanyLink
} from "@/lib/company-matrix/types";

export function validateCompanyMatrix(nodes: CompanyNode[], links: CompanyLink[]): MatrixValidationResult {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  const knownTickers = new Set(nodes.map((node) => node.ticker));
  const unknownTickers = new Set<string>();

  for (const node of nodes) {
    if (seen.has(node.ticker)) {
      duplicates.add(node.ticker);
    }
    seen.add(node.ticker);
  }

  for (const link of links) {
    if (!knownTickers.has(link.source)) {
      unknownTickers.add(link.source);
    }
    if (!knownTickers.has(link.target)) {
      unknownTickers.add(link.target);
    }
  }

  return {
    duplicateTickers: [...duplicates].sort(),
    unknownLinkTickers: [...unknownTickers].sort()
  };
}

export function filterCompanyNodes(nodes: CompanyNode[], filters: CompanyMatrixFilters): CompanyNode[] {
  return nodes.filter((node) => {
    const matchesNarrative =
      filters.narratives.length === 0 || node.narratives.some((narrative) => filters.narratives.includes(narrative));
    const matchesLayer = filters.layers.length === 0 || filters.layers.includes(node.primaryLayer);

    return matchesNarrative && matchesLayer;
  });
}

export function getRenderableLinks(
  nodes: CompanyNode[],
  links: CompanyLink[],
  filters: CompanyMatrixFilters
): RenderableCompanyLink[] {
  const visibleNodes = filterCompanyNodes(nodes, filters);
  const byTicker = new Map(visibleNodes.map((node) => [node.ticker, node]));

  return links.flatMap((link) => {
    if (filters.strengths.length > 0 && !filters.strengths.includes(link.strength)) {
      return [];
    }

    const source = byTicker.get(link.source);
    const target = byTicker.get(link.target);

    if (!source || !target) {
      return [];
    }

    return [{ ...link, source, target }];
  });
}

export function getCompanyByTicker(nodes: CompanyNode[], ticker: string): CompanyNode | undefined {
  const normalizedTicker = ticker.toUpperCase();

  return nodes.find((node) => node.ticker === normalizedTicker);
}

export function layerLabel(layers: MatrixLayer[], id: number): string {
  return layers.find((layer) => layer.id === id)?.label ?? `Layer ${id}`;
}
