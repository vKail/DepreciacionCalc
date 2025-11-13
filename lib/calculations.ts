import {
  StraightLineRow,
  SumOfDigitsRow,
  DecliningBalanceRow,
  ProductionUnitsRow,
} from "./types";

/**
 * Método de Línea Recta
 * Depreciación = Valor activo / Vida útil
 */
export function calculateStraightLine(
  assetValue: number,
  usefulLife: number
): StraightLineRow[] {
  const results: StraightLineRow[] = [];
  const depreciationQuota = assetValue / usefulLife;

  for (let period = 1; period <= usefulLife; period++) {
    const accumulatedDepreciation =
      period === 1
        ? depreciationQuota
        : results[period - 2].accumulatedDepreciation + depreciationQuota;

    const netBookValue =
      period === 1
        ? assetValue - depreciationQuota
        : results[period - 2].netBookValue - depreciationQuota;

    results.push({
      period,
      depreciationQuota,
      accumulatedDepreciation,
      netBookValue,
    });
  }

  return results;
}

/**
 * Método de Suma de Dígitos
 * Suma de dígitos = [(Vida útil * (Vida útil + 1)) / 2]
 * Factor = (Vida útil - período + 1) / Suma de dígitos
 * Depreciación = Factor * Valor activo
 */
export function calculateSumOfDigits(
  assetValue: number,
  usefulLife: number
): SumOfDigitsRow[] {
  const results: SumOfDigitsRow[] = [];
  const sumOfDigits = (usefulLife * (usefulLife + 1)) / 2;

  for (let period = 1; period <= usefulLife; period++) {
    const factor = (usefulLife - period + 1) / sumOfDigits;
    const percentage = factor * 100;
    const depreciationQuota = factor * assetValue;

    const accumulatedDepreciation =
      period === 1
        ? depreciationQuota
        : results[period - 2].accumulatedDepreciation + depreciationQuota;

    const netBookValue =
      period === 1
        ? assetValue - depreciationQuota
        : results[period - 2].netBookValue - depreciationQuota;

    results.push({
      period,
      factor,
      percentage,
      assetValue,
      depreciationQuota,
      accumulatedDepreciation,
      netBookValue,
    });
  }

  return results;
}

/**
 * Método de Reducción de Saldos
 * Valor de salvamento = Valor activo * 0.1
 * Tasa de depreciación = 1 - (Valor salvamento / Valor activo) ^ (1/n)
 * Cuota depreciación = Tasa depreciación * Valor sin depreciar
 */
export function calculateDecliningBalance(
  assetValue: number,
  usefulLife: number
): DecliningBalanceRow[] {
  const results: DecliningBalanceRow[] = [];
  const salvageValue = assetValue * 0.1;
  const depreciationRate = 1 - Math.pow(salvageValue / assetValue, 1 / usefulLife);

  for (let period = 1; period <= usefulLife; period++) {
    const undepreciatedValue =
      period === 1
        ? assetValue
        : results[period - 2].undepreciatedValue -
          results[period - 2].depreciationQuota;

    const depreciationQuota = depreciationRate * undepreciatedValue;

    const accumulatedDepreciation =
      period === 1
        ? depreciationQuota
        : results[period - 2].accumulatedDepreciation + depreciationQuota;

    const netBookValue =
      period === 1
        ? assetValue - depreciationQuota
        : results[period - 2].netBookValue - depreciationQuota;

    results.push({
      period,
      depreciationRate,
      undepreciatedValue,
      depreciationQuota,
      accumulatedDepreciation,
      netBookValue,
    });
  }

  return results;
}

/**
 * Método de Unidades de Producción
 * Depreciación por unidad = Valor activo / Unidades producidas totales
 * Unidades por período = Unidades producidas totales / Vida útil
 * Depreciación por período = Unidades por período × Depreciación por unidad
 */
export function calculateProductionUnits(
  assetValue: number,
  usefulLife: number,
  totalProductionUnits: number
): ProductionUnitsRow[] {
  const results: ProductionUnitsRow[] = [];
  const depreciationPerUnit = assetValue / totalProductionUnits;
  const unitsPerPeriod = totalProductionUnits / usefulLife;
  const depreciationQuota = unitsPerPeriod * depreciationPerUnit;

  for (let period = 1; period <= usefulLife; period++) {
    const accumulatedDepreciation =
      period === 1
        ? depreciationQuota
        : results[period - 2].accumulatedDepreciation + depreciationQuota;

    const netBookValue =
      period === 1
        ? assetValue - depreciationQuota
        : results[period - 2].netBookValue - depreciationQuota;

    results.push({
      period,
      unitsProduced: unitsPerPeriod,
      depreciationPerUnit,
      depreciationQuota,
      accumulatedDepreciation,
      netBookValue,
    });
  }

  return results;
}

/**
 * Método de Unidades de Producción Variable
 * Depreciación por unidad = Valor activo / Suma de todas las unidades producidas
 * Depreciación por período = Unidades del período × Depreciación por unidad
 * 
 * En este método, el usuario ingresa las unidades producidas para cada período
 * individualmente, permitiendo una depreciación variable según la producción real.
 */
export function calculateVariableProductionUnits(
  assetValue: number,
  variableUnits: number[]
): ProductionUnitsRow[] {
  const results: ProductionUnitsRow[] = [];
  
  // Calcula el total de unidades sumando todos los valores ingresados
  const totalProductionUnits = variableUnits.reduce((sum, units) => sum + units, 0);
  
  // Calcula cuánto vale la depreciación por cada unidad producida
  const depreciationPerUnit = assetValue / totalProductionUnits;

  // Itera sobre cada período usando las unidades específicas de cada uno
  for (let period = 1; period <= variableUnits.length; period++) {
    const unitsProduced = variableUnits[period - 1];
    
    // La cuota varía según las unidades producidas en este período
    const depreciationQuota = unitsProduced * depreciationPerUnit;

    const accumulatedDepreciation =
      period === 1
        ? depreciationQuota
        : results[period - 2].accumulatedDepreciation + depreciationQuota;

    const netBookValue =
      period === 1
        ? assetValue - depreciationQuota
        : results[period - 2].netBookValue - depreciationQuota;

    results.push({
      period,
      unitsProduced,
      depreciationPerUnit,
      depreciationQuota,
      accumulatedDepreciation,
      netBookValue,
    });
  }

  return results;
}
