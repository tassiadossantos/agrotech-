import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { FARMS_DATA } from "@/lib/mock-data";

export function CropCard() {
  const { selectedFarmId } = useAppStore();
  const selectedFarm = FARMS_DATA.find(f => f.id === selectedFarmId) || FARMS_DATA[0];
  const { activeCrops } = selectedFarm;

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
          {activeCrops.map((crop, index) => (
            <div key={crop.id} className={index > 0 ? "pt-4 border-t border-border border-dashed" : ""}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-bold font-outfit text-lg">{crop.name}</span>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-medium ${
                    crop.type === 'summer' 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : crop.type === 'winter'
                        ? 'bg-orange-100 text-orange-700 border border-orange-200'
                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    {crop.type === 'summer' ? 'Verão' : crop.type === 'winter' ? 'Inverno' : 'Perene'}
                  </span>
                </div>
                <span className="text-sm font-mono font-medium">{crop.progress}%</span>
              </div>
              <Progress 
                value={crop.progress} 
                className="h-3 bg-muted" 
                indicatorClassName={
                  crop.status === 'harvesting' 
                    ? "bg-gradient-to-r from-yellow-500 to-amber-600"
                    : "bg-gradient-to-r from-green-500 to-emerald-600"
                } 
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>
                  {crop.plantedDate !== 'N/A' ? `Plantio: ${crop.plantedDate}` : 'Cultura Perene'}
                </span>
                <span className="text-foreground font-medium">
                  {crop.status === 'harvesting' ? 'Colhendo: ' : 'Colheita: '} 
                  {crop.harvestEstimate}
                </span>
              </div>
            </div>
          ))}
          
          {activeCrops.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              Nenhuma cultura ativa no momento.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
