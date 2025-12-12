import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Globe, Newspaper } from "lucide-react";

const COMMODITIES = [
  { name: "Soja", price: 142.00, unit: "sc 60kg", change: 5.2, trend: "up" },
  { name: "Milho", price: 58.50, unit: "sc 60kg", change: -1.2, trend: "down" },
  { name: "Café Arábica", price: 1120.00, unit: "sc 60kg", change: 2.8, trend: "up" },
  { name: "Trigo", price: 1350.00, unit: "ton", change: 0.5, trend: "up" },
  { name: "Algodão", price: 4.85, unit: "lb", change: -0.8, trend: "down" },
  { name: "Boi Gordo", price: 245.00, unit: "@", change: 1.5, trend: "up" },
];

const NEWS = [
  { title: "Safra recorde de soja prevista para 2025 impulsiona exportações", source: "AgroNews", time: "2h atrás" },
  { title: "Clima favorável no Centro-Oeste acelera plantio do milho safrinha", source: "Canal Rural", time: "5h atrás" },
  { title: "Alta do dólar favorece competitividade do agronegócio brasileiro", source: "Globo Rural", time: "1d atrás" },
];

export default function MarketPage() {
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold font-outfit text-foreground">Mercado & Cotações</h2>
          <p className="text-muted-foreground">Acompanhamento em tempo real das commodities agrícolas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Cotações do Dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {COMMODITIES.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors border border-border/50">
                    <div className="flex flex-col">
                      <span className="font-bold text-lg font-outfit">{item.name}</span>
                      <span className="text-sm text-muted-foreground">R$ / {item.unit}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-mono text-xl font-bold">R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      <Badge 
                        variant={item.trend === "up" ? "default" : "destructive"} 
                        className={`w-20 justify-center h-7 ${
                          item.trend === "up" 
                            ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200" 
                            : "bg-red-100 text-red-700 hover:bg-red-200 border-red-200"
                        }`}
                      >
                        {item.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {Math.abs(item.change)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-primary text-primary-foreground border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Câmbio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="font-medium">USD/BRL</span>
                    <span className="font-mono font-bold text-xl">R$ 5,12</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="font-medium">EUR/BRL</span>
                    <span className="font-mono font-bold text-xl">R$ 5,54</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-blue-500" />
                  Notícias Relevantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {NEWS.map((news, i) => (
                    <div key={i} className="group cursor-pointer">
                      <h4 className="font-medium text-sm group-hover:text-primary transition-colors leading-snug">
                        {news.title}
                      </h4>
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>{news.source}</span>
                        <span>{news.time}</span>
                      </div>
                      {i < NEWS.length - 1 && <div className="h-px bg-border mt-3" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
