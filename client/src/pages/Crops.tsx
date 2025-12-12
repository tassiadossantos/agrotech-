import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sprout, Calendar, Map, CheckCircle2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { FARMS_DATA } from "@/lib/mock-data";

export default function CropsPage() {
  const { selectedFarmId } = useAppStore();
  const selectedFarm = FARMS_DATA.find(f => f.id === selectedFarmId) || FARMS_DATA[0];
  const { activeCrops } = selectedFarm;

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold font-outfit text-foreground">Gestão de Safras</h2>
          <p className="text-muted-foreground">Status detalhado das culturas em {selectedFarm.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeCrops.map((crop) => (
            <Card key={crop.id} className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="font-outfit text-xl">{crop.name}</CardTitle>
                    <span className="text-sm text-muted-foreground capitalize">{crop.type} • {crop.status}</span>
                  </div>
                </div>
                <Badge variant="outline" className="h-8 px-3">
                   ID: {crop.id.toUpperCase()}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Progresso do Ciclo</span>
                    <span className="font-mono font-bold">{crop.progress}%</span>
                  </div>
                  <Progress value={crop.progress} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-3 rounded-lg flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Data Plantio</p>
                      <p className="font-medium text-sm">{crop.plantedDate}</p>
                    </div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Colheita Est.</p>
                      <p className="font-medium text-sm">{crop.harvestEstimate}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-dashed border-border">
                  <Map className="w-4 h-4" />
                  <span>Área plantada: {Math.round(selectedFarm.size * 0.6)} hectares</span>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {activeCrops.length === 0 && (
            <div className="col-span-full p-12 text-center border-2 border-dashed border-border rounded-xl bg-muted/10">
              <Sprout className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Nenhuma cultura ativa</h3>
              <p className="text-muted-foreground">Inicie um novo planejamento de safra para ver os dados aqui.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
