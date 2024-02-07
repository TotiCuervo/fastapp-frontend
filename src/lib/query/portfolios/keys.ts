export const Keys = {
    portfolios: ['portfolios'] as const,
    portfolio: (id: string) => ['portfolio', id] as const,
}
