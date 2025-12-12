import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const data = [
  { month: "Jan", soja: 120, milho: 50 },
  { month: "Fev", soja: 125, milho: 52 },
  { month: "Mar", soja: 135, milho: 55 },
  { month: "Abr", soja: 132, milho: 53 },
  { month: "Mai", soja: 140, milho: 58 },
  { month: "Jun", soja: 145, milho: 60 },
  { month: "Jul", soja: 142, milho: 59 },
  { month: "Ago", soja: 150, milho: 62 },
  { month: "Set", soja: 148, milho: 61 },
  { month: "Out", soja: 155, milho: 65 },
  { month: "Nov", soja: 160, milho: 68 },
  { month: "Dez", soja: 158, milho: 66 },
];

export function PriceChart() {
  return (
    <Card className="col-span-full border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="font-outfit text-lg font-bold">Evolução de Preços</CardTitle>
          <p className="text-sm text-muted-foreground">Histórico de 12 meses (R$ por saca)</p>
        </div>
        <Select defaultValue="soja">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Commodity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="soja">Soja & Milho</SelectItem>
            <SelectItem value="cafe">Café</SelectItem>
            <SelectItem value="algodao">Algodão</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[300px] w-full pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSoja" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorMilho" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow-lg)"
              }}
              itemStyle={{ color: "hsl(var(--foreground))", fontFamily: "var(--font-mono)" }}
            />
            <Area 
              type="monotone" 
              dataKey="soja" 
              name="Soja"
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSoja)" 
            />
            <Area 
              type="monotone" 
              dataKey="milho" 
              name="Milho"
              stroke="hsl(var(--chart-2))" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorMilho)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
