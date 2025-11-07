import { LOW_STOCK_THRESHOLD } from "../constants/inventory";

export interface StockStatus {
  status: string;
  tone: "critical" | "warning" | "success";
}

export const getStockStatus = (inventory: number): StockStatus => {
  if (inventory === 0) return { status: "Out of stock", tone: "critical" };
  if (inventory < LOW_STOCK_THRESHOLD) return { status: "Low stock", tone: "warning" };
  return { status: "In stock", tone: "success" };
};

export const buildInventoryQueryFilter = (
  status: string | null,
  lowStockThreshold: number
): string => {
  if (status === "low") {
    return `inventory_total:>0 AND inventory_total:<${lowStockThreshold}`;
  } else if (status === "out") {
    return "inventory_total:0";
  }
  return "";
};
