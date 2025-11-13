export type TimeUnit = "years" | "months" | "days";

export type DepreciationMethod = "straight-line" | "sum-of-digits" | "declining-balance" | "production-units";

export interface FormInputs {
  usefulLife: number;
  assetValue: number;
  timeUnit: TimeUnit;
  method: DepreciationMethod;
  productionUnits?: number;
  hasVAT: boolean;
  vatPercentage?: number;
}

export interface StraightLineRow {
  period: number;
  depreciationQuota: number;
  accumulatedDepreciation: number;
  netBookValue: number;
}

export interface SumOfDigitsRow {
  period: number;
  factor: number;
  percentage: number;
  assetValue: number;
  depreciationQuota: number;
  accumulatedDepreciation: number;
  netBookValue: number;
}

export interface DecliningBalanceRow {
  period: number;
  depreciationRate: number;
  undepreciatedValue: number;
  depreciationQuota: number;
  accumulatedDepreciation: number;
  netBookValue: number;
}

export interface ProductionUnitsRow {
  period: number;
  unitsProduced: number;
  depreciationPerUnit: number;
  depreciationQuota: number;
  accumulatedDepreciation: number;
  netBookValue: number;
}
