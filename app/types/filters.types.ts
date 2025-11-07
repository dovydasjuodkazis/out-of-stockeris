export const ProductStockFilterType = {
  ALL: "all",
  LOW: "low",
  OUT: "out",
} as const;

export type ProductStockFilter = typeof ProductStockFilterType[keyof typeof ProductStockFilterType];

export const DirectionType = {
  NEXT: "next",
  PREVIOUS: "previous",
} as const;

export type Direction = typeof DirectionType[keyof typeof DirectionType];
