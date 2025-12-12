import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Sun, Wind, Droplets, CalendarDays } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { FARMS_DATA } from "@/lib/mock-data";

export default function WeatherPage() {
  const { selectedFarmId } = useAppStore();
  const selectedFarm = FARMS_DATA.find(f => f.id === selectedFarmId) || FARMS_DATA[0];
  const { weather } = selectedFarm;

  const forecast = [
    { day: "Hoje", temp: weather.temp, icon: weather.condition === 'rainy' ? CloudRain : Sun, prob: weather.condition === 'rainy' ? 80 : 10 },
    { day: "Amanhã", temp: weather.temp - 2, icon: CloudRain, prob: 65 },
    { day: "Qua", temp: weather.temp + 1, icon: Sun, prob: 20 },
    { day: "Qui", temp: weather.temp - 1, icon: CloudRain, prob: 45 },
    { day: "Sex", temp: weather.temp + 2, icon: Sun, prob: 5 },
    { day: "Sáb", temp: weather.temp + 3, icon: Sun, prob: 0 },
    { day: "Dom", temp: weather.temp, icon: CloudRain, prob: 55 },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold font-outfit text-foreground">Clima & Solo</h2>
          <p className="text-muted-foreground">Monitoramento meteorológico e condições do solo para {selectedFarm.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-2 border-primary/20 bg-gradient-to-br from-blue-50/50 to-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-orange-500" />
                Previsão 7 Dias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {forecast.map((day, i) => (
                  <div key={i} className="flex flex-col items-center p-3 rounded-lg hover:bg-white/50 transition-colors border border-transparent hover:border-border">
                    <span className="text-sm font-medium mb-2">{day.day}</span>
                    <day.icon className={`w-8 h-8 mb-2 ${day.prob > 50 ? 'text-blue-500' : 'text-orange-500'}`} />
                    <span className="text-lg font-bold">{day.temp}°</span>
                    <span className="text-xs text-muted-foreground">{day.prob}% chv</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                Condições Atuais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Temperatura</span>
                <span className="font-bold text-xl">{weather.temp}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Umidade</span>
                <span className="font-bold text-xl">{weather.humidity}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Vento</span>
                <span className="font-bold text-xl">{weather.windSpeed} km/h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Precipitação (24h)</span>
                <span className="font-bold text-xl">12mm</span>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-full">
             <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-green-600" />
                Janelas de Pulverização
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 overflow-x-auto pb-2">
                 {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(hour => (
                   <div key={hour} className={`flex-1 min-w-[80px] p-3 rounded-lg border text-center ${
                      hour >= 10 && hour <= 14 
                        ? 'bg-red-50 border-red-200 opacity-50 cursor-not-allowed' 
                        : 'bg-green-50 border-green-200 cursor-pointer hover:bg-green-100'
                   }`}>
                     <span className="text-sm font-bold block mb-1">{hour}:00</span>
                     <span className={`text-xs font-medium ${
                        hour >= 10 && hour <= 14 ? 'text-red-700' : 'text-green-700'
                     }`}>
                        {hour >= 10 && hour <= 14 ? 'Inadequado' : 'Ideal'}
                     </span>
                   </div>
                 ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
