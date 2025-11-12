"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { StraightLineRow, SumOfDigitsRow, DecliningBalanceRow, ProductionUnitsRow } from "@/lib/types";
import { downloadCSV } from "@/lib/export";

interface StraightLineTableProps {
  data: StraightLineRow[];
  unit: string;
}

export function StraightLineTable({ data, unit }: StraightLineTableProps) {
  if (data.length === 0) return null;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Método de Línea Recta</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadCSV(data, "straight-line", unit)}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Descargar CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{unit === "years" ? "Año" : "Mes"}</TableHead>
                <TableHead className="text-right">Cuota de Depreciación</TableHead>
                <TableHead className="text-right">Depreciación Acumulada</TableHead>
                <TableHead className="text-right">Valor Neto en Libros</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.period}>
                  <TableCell>{row.period}</TableCell>
                  <TableCell className="text-right">
                    ${row.depreciationQuota.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${row.accumulatedDepreciation.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${row.netBookValue.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

interface SumOfDigitsTableProps {
  data: SumOfDigitsRow[];
  unit: string;
}

export function SumOfDigitsTable({ data, unit }: SumOfDigitsTableProps) {
  if (data.length === 0) return null;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Método de Suma de Dígitos</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadCSV(data, "sum-of-digits", unit)}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Descargar CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{unit === "years" ? "Año" : "Mes"}</TableHead>
                <TableHead className="text-right">Factor</TableHead>
                <TableHead className="text-right">Porcentaje</TableHead>
                <TableHead className="text-right">Valor Activo</TableHead>
                <TableHead className="text-right">Cuota Depreciación</TableHead>
                <TableHead className="text-right">Depreciación Acumulada</TableHead>
                <TableHead className="text-right">Valor Neto en Libros</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.period}>
                  <TableCell>{row.period}</TableCell>
                  <TableCell className="text-right">
                    {row.factor.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-right">
                    {row.percentage.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right">
                    ${row.assetValue.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${row.depreciationQuota.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${row.accumulatedDepreciation.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${row.netBookValue.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

interface DecliningBalanceTableProps {
  data: DecliningBalanceRow[];
  unit: string;
}

export function DecliningBalanceTable({ data, unit }: DecliningBalanceTableProps) {
  if (data.length === 0) return null;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Método de Reducción de Saldos</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadCSV(data, "declining-balance", unit)}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Descargar CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{unit === "years" ? "Año" : "Mes"}</TableHead>
                <TableHead className="text-right">Tasa de Depreciación</TableHead>
                <TableHead className="text-right">Valor sin Depreciar</TableHead>
                <TableHead className="text-right">Cuota Depreciación</TableHead>
                <TableHead className="text-right">Depreciación Acumulada</TableHead>
                <TableHead className="text-right">Valor Neto en Libros</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.period}>
                  <TableCell>{row.period}</TableCell>
                  <TableCell className="text-right">
                    {(row.depreciationRate * 100).toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right">
                    ${row.undepreciatedValue.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${row.depreciationQuota.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${row.accumulatedDepreciation.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${row.netBookValue.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

interface ProductionUnitsTableProps {
  data: ProductionUnitsRow[];
  unit: string;
}

export function ProductionUnitsTable({ data, unit }: ProductionUnitsTableProps) {
  if (data.length === 0) return null;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Método de Unidades de Producción</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadCSV(data, "production-units", unit)}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Descargar CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{unit === "years" ? "Año" : "Mes"}</TableHead>
                <TableHead className="text-right">Unidades Producidas</TableHead>
                <TableHead className="text-right">Depreciación por Unidad</TableHead>
                <TableHead className="text-right">Cuota Depreciación</TableHead>
                <TableHead className="text-right">Depreciación Acumulada</TableHead>
                <TableHead className="text-right">Valor Neto en Libros</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.period}>
                  <TableCell>{row.period}</TableCell>
                  <TableCell className="text-right">
                    {row.unitsProduced.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${row.depreciationPerUnit.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${row.depreciationQuota.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${row.accumulatedDepreciation.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${row.netBookValue.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
