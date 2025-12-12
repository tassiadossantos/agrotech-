import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";

export function CropCard() {
  return (
    <Card className="h-full border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground font-outfit uppercase tracking-wider">
          Status da Safra
        </CardTitle>
        <CalendarClock className="h-4 w-4 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-bold font-outfit text-lg">Milho 2025</span>
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200 font-medium">Safrinha</span>
              </div>
              <span className="text-sm font-mono font-medium">82%</span>
            </div>
            <Progress value={82} className="h-3 bg-muted" indicatorClassName="bg-gradient-to-r from-yellow-500 to-orange-600" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Plantio: Out 2024</span>
              <span className="text-foreground font-medium">Colheita estimada: 23 dias</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border border-dashed">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-bold font-outfit text-lg">Soja 2025/26</span>
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200 font-medium">Verão</span>
              </div>
              <span className="text-sm font-mono font-medium">15%</span>
            </div>
            <Progress value={15} className="h-3 bg-muted" indicatorClassName="bg-gradient-to-r from-green-500 to-emerald-600" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Planejamento</span>
              <span>Início: Set 2025</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
