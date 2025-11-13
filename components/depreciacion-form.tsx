"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormInputs, TimeUnit, DepreciationMethod } from "@/lib/types";
import { FormulaDisplay } from "@/components/formula-display";

interface DepreciacionFormProps {
  onCalculate: (inputs: FormInputs) => void;
  currentMethod: DepreciationMethod | null;
}

export function DepreciacionForm({ onCalculate, currentMethod }: DepreciacionFormProps) {
  const [usefulLife, setUsefulLife] = useState<string>("");
  const [assetValue, setAssetValue] = useState<string>("");
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("years");
  const [method, setMethod] = useState<DepreciationMethod>("straight-line");
  const [productionUnits, setProductionUnits] = useState<string>("");
  const [hasVAT, setHasVAT] = useState<boolean>(true);
  const [vatPercentage, setVatPercentage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let finalAssetValue = parseFloat(assetValue);
    if (!hasVAT && vatPercentage) {
      const vatDecimal = parseFloat(vatPercentage) / 100;
      finalAssetValue = finalAssetValue * (1 + vatDecimal);
    }

    const inputs: FormInputs = {
      usefulLife: parseFloat(usefulLife),
      assetValue: finalAssetValue,
      timeUnit,
      method,
      hasVAT,
      vatPercentage: !hasVAT ? parseFloat(vatPercentage) : undefined,
      ...(method === "production-units" && { productionUnits: parseFloat(productionUnits) }),
    };

    onCalculate(inputs);
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Calculadora de Depreciación</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Valor Activo */}
            <div className="space-y-2">
              <Label htmlFor="assetValue">Valor del Activo (USD)</Label>
              <Input
                id="assetValue"
                type="number"
                placeholder="Ej: 10000"
                value={assetValue}
                onChange={(e) => setAssetValue(e.target.value)}
                required
                min="0"
                step="any"
              />
            </div>

            {/* IVA */}
            <div className="space-y-2">
              <Label>¿El valor incluye IVA?</Label>
              <RadioGroup
                value={hasVAT ? "yes" : "no"}
                onValueChange={(value) => setHasVAT(value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="vat-yes" />
                  <Label htmlFor="vat-yes" className="font-normal cursor-pointer">
                    Sí, ya incluye IVA
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="vat-no" />
                  <Label htmlFor="vat-no" className="font-normal cursor-pointer">
                    No, agregar IVA
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Porcentaje de IVA - Solo si no incluye IVA */}
            {!hasVAT && (
              <div className="space-y-2">
                <Label htmlFor="vatPercentage">Porcentaje de IVA (%)</Label>
                <Input
                  id="vatPercentage"
                  type="number"
                  placeholder="Ej: 15"
                  value={vatPercentage}
                  onChange={(e) => setVatPercentage(e.target.value)}
                  required
                  min="0"
                  max="100"
                  step="any"
                />
              </div>
            )}
            {/* Vida Útil */}
            <div className="space-y-2">
              <Label htmlFor="usefulLife">
                Vida Útil ({timeUnit === "years" ? "en años" : timeUnit === "months" ? "en meses" : "en días"})
              </Label>
              <Input
                id="usefulLife"
                type="number"
                placeholder="Ej: 5"
                value={usefulLife}
                onChange={(e) => setUsefulLife(e.target.value)}
                required
                min="1"
                step="any"
              />
            </div>

            {/* Unidad de Tiempo */}
            <div className="space-y-2">
              <Label>Unidad de Tiempo</Label>
              <RadioGroup
                value={timeUnit}
                onValueChange={(value) => setTimeUnit(value as TimeUnit)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="years" id="years" />
                  <Label htmlFor="years" className="font-normal cursor-pointer">
                    Años
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="months" id="months" />
                  <Label htmlFor="months" className="font-normal cursor-pointer">
                    Meses
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="days" id="days" />
                  <Label htmlFor="days" className="font-normal cursor-pointer">
                    Días
                  </Label>
                </div>
              </RadioGroup>
            </div>



            {/* Método de Depreciación */}
            <div className="space-y-2">
              <Label htmlFor="method">Método de Depreciación</Label>
              <Select
                value={method}
                onValueChange={(value) => setMethod(value as DepreciationMethod)}
              >
                <SelectTrigger id="method">
                  <SelectValue placeholder="Selecciona un método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="straight-line">Línea Recta</SelectItem>
                  <SelectItem value="sum-of-digits">Suma de Dígitos</SelectItem>
                  <SelectItem value="declining-balance">
                    Reducción de Saldos
                  </SelectItem>
                  <SelectItem value="production-units">
                    Unidades de Producción
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Unidades Producidas - Solo para método de unidades de producción */}
            {method === "production-units" && (
              <div className="space-y-2">
                <Label htmlFor="productionUnits">Unidades Producidas Total</Label>
                <Input
                  id="productionUnits"
                  type="number"
                  placeholder="Ej: 10000"
                  value={productionUnits}
                  onChange={(e) => setProductionUnits(e.target.value)}
                  required
                  min="1"
                  step="any"
                />
                <p className="text-xs text-muted-foreground">
                  Total de unidades que se producirán durante toda la vida útil del activo
                </p>
              </div>
            )}

            <Button type="submit" className="w-full">
              Calcular Depreciación
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Fórmulas Matemáticas */}
      <FormulaDisplay method={currentMethod} />
    </div>
  );
}
