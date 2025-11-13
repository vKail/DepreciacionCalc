"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DepreciationMethod } from "@/lib/types";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface FormulaDisplayProps {
  method: DepreciationMethod | null;
}

export function FormulaDisplay({ method }: FormulaDisplayProps) {
  if (!method) return null;

  const formulas = {
    "straight-line": {
      title: "📐 Fórmula: Línea Recta",
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-medium mb-2">Cuota de Depreciación:</p>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <BlockMath math="\text{Cuota de Depreciación} = \frac{\text{Valor del Activo}}{\text{Vida Útil}}" />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              <strong>Depreciación Acumulada:</strong> Suma de todas las cuotas hasta el período actual
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              <strong>Valor Neto en Libros:</strong> Valor del Activo - Depreciación Acumulada
            </p>
          </div>
        </div>
      ),
    },
    "sum-of-digits": {
      title: "📊 Fórmulas: Suma de Dígitos",
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-medium mb-2">1. Suma de Dígitos:</p>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <BlockMath math="\text{Suma de Dígitos} = \frac{n \times (n + 1)}{2}" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">donde <InlineMath math="n" /> = Vida Útil</p>
          </div>
          <div>
            <p className="font-medium mb-2">2. Factor de Depreciación:</p>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <BlockMath math="\text{Factor} = \frac{n - \text{período} + 1}{\text{Suma de Dígitos}}" />
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">3. Cuota de Depreciación:</p>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <BlockMath math="\text{Cuota} = \text{Factor} \times \text{Valor del Activo}" />
            </div>
          </div>
        </div>
      ),
    },
    "declining-balance": {
      title: "📉 Fórmulas: Reducción de Saldos",
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-medium mb-2">1. Valor de Salvamento:</p>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <BlockMath math="\text{Valor de Salvamento} = \text{Valor del Activo} \times 0.1" />
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">2. Tasa de Depreciación:</p>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <BlockMath math="\text{Tasa} = 1 - \sqrt[n]{\frac{\text{Valor Salvamento}}{\text{Valor del Activo}}}" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">donde <InlineMath math="n" /> = Vida Útil</p>
          </div>
          <div>
            <p className="font-medium mb-2">3. Cuota de Depreciación:</p>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <BlockMath math="\text{Cuota} = \text{Tasa} \times \text{Valor sin Depreciar}" />
            </div>
          </div>
        </div>
      ),
    },
    "production-units": {
      title: "🏭 Fórmulas: Unidades de Producción",
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-medium mb-2">1. Depreciación por Unidad:</p>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <BlockMath math="\text{Depreciación por Unidad} = \frac{\text{Valor del Activo}}{\text{Unidades Producidas Total}}" />
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">2. Unidades por Período:</p>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <BlockMath math="\text{Unidades por Período} = \frac{\text{Unidades Producidas Total}}{\text{Vida Útil}}" />
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">3. Cuota de Depreciación:</p>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <BlockMath math="\text{Cuota} = \text{Unidades por Período} \times \text{Depreciación por Unidad}" />
            </div>
          </div>
        </div>
      ),
    },
    "variable-production-units": {
      title: "🏭 Fórmulas: Unidades de Producción Variable",
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-medium mb-2">1. Total de Unidades:</p>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <BlockMath math="\text{Total de Unidades} = \sum_{i=1}^{n} \text{Unidades}_i" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Suma de todas las unidades producidas en cada período
            </p>
          </div>
          <div>
            <p className="font-medium mb-2">2. Depreciación por Unidad:</p>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <BlockMath math="\text{Depreciación por Unidad} = \frac{\text{Valor del Activo}}{\text{Total de Unidades}}" />
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">3. Cuota de Depreciación (por período):</p>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <BlockMath math="\text{Cuota}_i = \text{Unidades}_i \times \text{Depreciación por Unidad}" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              La cuota varía según las unidades producidas en cada período
            </p>
          </div>
        </div>
      ),
    },
  };

  const selectedFormula = formulas[method];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{selectedFormula.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        {selectedFormula.content}
      </CardContent>
    </Card>
  );
}
