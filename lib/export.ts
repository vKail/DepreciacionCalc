import { StraightLineRow, SumOfDigitsRow, DecliningBalanceRow, ProductionUnitsRow } from "./types";

/**
 * Convierte los datos a formato CSV y descarga el archivo
 */
export function downloadCSV(
  data: StraightLineRow[] | SumOfDigitsRow[] | DecliningBalanceRow[] | ProductionUnitsRow[],
  method: string,
  unit: string
) {
  if (data.length === 0) return;

  let csv = "";
  const fileName = `depreciation_${method}_${new Date().toISOString().split("T")[0]}.csv`;

  if ("factor" in data[0]) {
    // Suma de Dígitos
    csv = `${unit === "years" ? "Año" : unit === "months" ? "Mes" : "Día"},Factor,Porcentaje,Valor Activo,Cuota Depreciación,Depreciación Acumulada,Valor Neto en Libros\n`;
    (data as SumOfDigitsRow[]).forEach((row) => {
      csv += `${row.period},${row.factor.toFixed(4)},${row.percentage.toFixed(2)}%,${row.assetValue.toFixed(2)},${row.depreciationQuota.toFixed(2)},${row.accumulatedDepreciation.toFixed(2)},${row.netBookValue.toFixed(2)}\n`;
    });
  } else if ("depreciationRate" in data[0]) {
    // Reducción de Saldos
    csv = `${unit === "years" ? "Año" : unit === "months" ? "Mes" : "Día"},Tasa de Depreciación,Valor sin Depreciar,Cuota Depreciación,Depreciación Acumulada,Valor Neto en Libros\n`;
    (data as DecliningBalanceRow[]).forEach((row) => {
      csv += `${row.period},${(row.depreciationRate * 100).toFixed(2)}%,${row.undepreciatedValue.toFixed(2)},${row.depreciationQuota.toFixed(2)},${row.accumulatedDepreciation.toFixed(2)},${row.netBookValue.toFixed(2)}\n`;
    });
  } else if ("unitsProduced" in data[0]) {
    // Unidades de Producción
    csv = `${unit === "years" ? "Año" : unit === "months" ? "Mes" : "Día"},Unidades Producidas,Depreciación por Unidad,Cuota Depreciación,Depreciación Acumulada,Valor Neto en Libros\n`;
    (data as ProductionUnitsRow[]).forEach((row) => {
      csv += `${row.period},${row.unitsProduced.toFixed(2)},${row.depreciationPerUnit.toFixed(4)},${row.depreciationQuota.toFixed(2)},${row.accumulatedDepreciation.toFixed(2)},${row.netBookValue.toFixed(2)}\n`;
    });
  } else {
    // Línea Recta
    csv = `${unit === "years" ? "Año" : unit === "months" ? "Mes" : "Día"},Cuota de Depreciación,Depreciación Acumulada,Valor Neto en Libros\n`;
    (data as StraightLineRow[]).forEach((row) => {
      csv += `${row.period},${row.depreciationQuota.toFixed(2)},${row.accumulatedDepreciation.toFixed(2)},${row.netBookValue.toFixed(2)}\n`;
    });
  }

  // Crear y descargar el archivo
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
