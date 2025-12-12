import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, ArrowDownRight, PieChart } from "lucide-react";

export function FinanceCard() {
  return (
    <Card className="col-span-full border-border bg-gradient-to-r from-card to-muted/30">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground font-outfit uppercase tracking-wider">
          Gestão Financeira (Safra 2024/25)
        </CardTitle>
        <PieChart className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div>
             <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Receita Esperada</span>
                <span className="font-mono font-bold text-green-600 flex items-center">
                  R$ 425.000 <ArrowUpRight className="w-4 h-4 ml-1" />
                </span>
             </div>
             <Progress value={100} className="h-2" indicatorClassName="bg-green-500" />
          </div>

          <div>
             <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Custos Totais</span>
                <span className="font-mono font-bold text-red-600 flex items-center">
                  R$ 247.300 <ArrowDownRight className="w-4 h-4 ml-1" />
                </span>
             </div>
             <div className="flex items-center gap-2">
               <Progress value={58} className="h-2 flex-1" indicatorClassName="bg-red-500" />
               <span className="text-xs font-mono font-medium text-muted-foreground">58%</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
             <div className="bg-background rounded-lg p-3 border border-border shadow-sm">
               <span className="text-xs text-muted-foreground uppercase">Margem Líquida</span>
               <p className="text-xl font-bold font-outfit text-primary mt-1">R$ 177.700</p>
             </div>
             <div className="bg-background rounded-lg p-3 border border-border shadow-sm">
               <span className="text-xs text-muted-foreground uppercase">ROI Estimado</span>
               <p className="text-xl font-bold font-outfit text-primary mt-1">41.8%</p>
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
