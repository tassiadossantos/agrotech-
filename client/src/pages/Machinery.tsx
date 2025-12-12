import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tractor, Fuel, Clock, Wrench } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { FARMS_DATA } from "@/lib/mock-data";

export default function MachineryPage() {
  const { selectedFarmId } = useAppStore();
  const selectedFarm = FARMS_DATA.find(f => f.id === selectedFarmId) || FARMS_DATA[0];
  const { machinery } = selectedFarm;

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold font-outfit text-foreground">Frota & Maquinário</h2>
          <p className="text-muted-foreground">Gerenciamento de ativos da {selectedFarm.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {machinery.map((machine) => (
            <Card key={machine.id} className="overflow-hidden">
              <div className="h-2 w-full bg-primary/20">
                <div 
                  className={`h-full ${
                    machine.status === 'working' ? 'bg-green-500' : 
                    machine.status === 'maintenance' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} 
                  style={{ width: '100%' }}
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-outfit text-lg">{machine.name}</CardTitle>
                    <p className="text-sm text-muted-foreground capitalize">{machine.type}</p>
                  </div>
                  <Badge 
                    variant={machine.status === 'working' ? 'default' : 'secondary'}
                    className={
                      machine.status === 'working' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                      machine.status === 'maintenance' ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                      'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    }
                  >
                    {machine.status === 'working' ? 'Em Operação' :
                     machine.status === 'maintenance' ? 'Manutenção' : 'Parado'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-2 rounded flex items-center gap-2">
                    <Fuel className="w-4 h-4 text-orange-500" />
                    <div>
                      <span className="text-xs text-muted-foreground block">Combustível</span>
                      <span className="font-bold text-sm">{machine.fuelLevel}%</span>
                    </div>
                  </div>
                  <div className="bg-muted/30 p-2 rounded flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <div>
                      <span className="text-xs text-muted-foreground block">Horímetro</span>
                      <span className="font-bold text-sm">{machine.hours}h</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex justify-between items-center text-sm">
                   <span className="text-muted-foreground flex items-center gap-1">
                     <Wrench className="w-3 h-3" /> Próx. Revisão
                   </span>
                   <span className="font-medium">Em 80h</span>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Card className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border bg-muted/10 hover:bg-muted/20 cursor-pointer transition-colors min-h-[200px]">
             <div className="h-12 w-12 rounded-full bg-background border border-border flex items-center justify-center mb-4">
               <Tractor className="w-6 h-6 text-muted-foreground" />
             </div>
             <p className="font-medium text-muted-foreground">Adicionar Máquina</p>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
