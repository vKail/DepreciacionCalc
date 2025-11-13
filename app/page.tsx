"use client";

import { useState } from "react";
import Image from "next/image";
import { DepreciacionForm } from "@/components/depreciacion-form";
import {
  StraightLineTable,
  SumOfDigitsTable,
  DecliningBalanceTable,
  ProductionUnitsTable,
} from "@/components/depreciacion-tables";
import {
  calculateStraightLine,
  calculateSumOfDigits,
  calculateDecliningBalance,
  calculateProductionUnits,
} from "@/lib/calculations";
import {
  FormInputs,
  StraightLineRow,
  SumOfDigitsRow,
  DecliningBalanceRow,
  ProductionUnitsRow,
  DepreciationMethod,
} from "@/lib/types";

export default function Home() {
  const [straightLineResults, setStraightLineResults] = useState<StraightLineRow[]>([]);
  const [sumOfDigitsResults, setSumOfDigitsResults] = useState<SumOfDigitsRow[]>([]);
  const [decliningBalanceResults, setDecliningBalanceResults] = useState<DecliningBalanceRow[]>([]);
  const [productionUnitsResults, setProductionUnitsResults] = useState<ProductionUnitsRow[]>([]);
  const [currentMethod, setCurrentMethod] = useState<DepreciationMethod | null>(null);
  const [timeUnit, setTimeUnit] = useState<string>("years");

  const handleCalculate = (inputs: FormInputs) => {
    const { usefulLife, assetValue, timeUnit, method, productionUnits } = inputs;

    setCurrentMethod(method);
    setTimeUnit(timeUnit);

    setStraightLineResults([]);
    setSumOfDigitsResults([]);
    setDecliningBalanceResults([]);
    setProductionUnitsResults([]);

    switch (method) {
      case "straight-line":
        const straightLine = calculateStraightLine(assetValue, usefulLife);
        setStraightLineResults(straightLine);
        break;
      case "sum-of-digits":
        const sumOfDigits = calculateSumOfDigits(assetValue, usefulLife);
        setSumOfDigitsResults(sumOfDigits);
        break;
      case "declining-balance":
        const decliningBalance = calculateDecliningBalance(assetValue, usefulLife);
        setDecliningBalanceResults(decliningBalance);
        break;
      case "production-units":
        if (productionUnits) {
          const productionUnitsCalc = calculateProductionUnits(assetValue, usefulLife, productionUnits);
          setProductionUnitsResults(productionUnitsCalc);
        }
        break;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-[1700px] mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 mb-8 lg:relative lg:flex-row">
          <div className="lg:absolute lg:left-0">
            <Image
              src="/FICM.png"
              alt="Logo FICM"
              width={200}
              height={200}
              className="object-contain lg:w-[300px] lg:h-[300px]"
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold lg:text-3xl">
              Tecnología del Mantenimiento
            </h1>
            <h2 className="text-xl font-semibold text-muted-foreground mt-1 lg:text-2xl">
              Depreciación
            </h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 items-start">
          <div>
            <DepreciacionForm onCalculate={handleCalculate} currentMethod={currentMethod} />
          </div>

          <div className="w-full">
            {currentMethod === "straight-line" && (
              <StraightLineTable data={straightLineResults} unit={timeUnit} />
            )}
            {currentMethod === "sum-of-digits" && (
              <SumOfDigitsTable data={sumOfDigitsResults} unit={timeUnit} />
            )}
            {currentMethod === "declining-balance" && (
              <DecliningBalanceTable data={decliningBalanceResults} unit={timeUnit} />
            )}
            {currentMethod === "production-units" && (
              <ProductionUnitsTable data={productionUnitsResults} unit={timeUnit} />
            )}
            {currentMethod === null && (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <p className="text-muted-foreground text-center">
                  Completa el formulario y haz clic en &quot;Calcular Depreciación&quot; para ver los resultados
                </p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p className="font-medium">Ismael Flores</p>
          <p>Universidad Técnica de Ambato</p>
        </footer>
      </div>
    </div>
  );
}
