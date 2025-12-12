import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const commodities = [
  { name: "Soja", price: "142,00", unit: "sc", change: 5.2, trend: "up" },
  { name: "Milho", price: "58,50", unit: "sc", change: -1.2, trend: "down" },
  { name: "Café", price: "1.120", unit: "sc", change: 2.8, trend: "up" },
];

export function MarketCard() {
  return (
    <Card className="h-full border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground font-outfit uppercase tracking-wider">
          Mercado de Commodities
        </CardTitle>
        <DollarSign className="h-4 w-4 text-green-600" />
      </CardHeader>
      <CardContent className="space-y-4">
        {commodities.map((item) => (
          <div key={item.name} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors group">
            <div className="flex flex-col">
              <span className="font-bold font-outfit text-foreground group-hover:text-primary transition-colors">{item.name}</span>
              <span className="text-xs text-muted-foreground">R$ / {item.unit}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-mono font-medium text-lg">R$ {item.price}</span>
              <Badge 
                variant={item.trend === "up" ? "default" : "destructive"} 
                className={`text-[10px] h-5 px-1.5 ${item.trend === "up" ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200" : "bg-red-100 text-red-700 hover:bg-red-200 border-red-200"}`}
              >
                {item.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {Math.abs(item.change)}%
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
