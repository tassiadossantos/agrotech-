import { CloudRain, Droplets, ThermometerSun, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WeatherCard() {
  return (
    <Card className="overflow-hidden border-border bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-card h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground font-outfit uppercase tracking-wider">
          Clima em Tempo Real
        </CardTitle>
        <CloudRain className="h-4 w-4 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-4xl font-bold font-outfit text-foreground">28°C</span>
              <p className="text-xs text-muted-foreground font-medium mt-1">Fazenda Boa Vista</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
              <ThermometerSun className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="flex flex-col items-center p-2 bg-background/50 rounded-lg border border-border/50">
              <Droplets className="h-4 w-4 text-blue-500 mb-1" />
              <span className="text-sm font-bold">75%</span>
              <span className="text-[10px] text-muted-foreground uppercase">Chuva</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-background/50 rounded-lg border border-border/50">
              <Wind className="h-4 w-4 text-slate-500 mb-1" />
              <span className="text-sm font-bold">12km/h</span>
              <span className="text-[10px] text-muted-foreground uppercase">Vento</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-background/50 rounded-lg border border-border/50">
              <span className="text-lg leading-none">🌧️</span>
              <span className="text-sm font-bold mt-1">Amanhã</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
