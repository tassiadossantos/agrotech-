import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/lib/store";
import { FARMS_DATA } from "@/lib/mock-data";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";

export default function FinancePage() {
  const { selectedFarmId } = useAppStore();
  const selectedFarm = FARMS_DATA.find(f => f.id === selectedFarmId) || FARMS_DATA[0];
  const { finance } = selectedFarm;

  const monthlyData = [
    { name: 'Jan', receita: finance.revenue * 0.05, despesa: finance.cost * 0.12 },
    { name: 'Fev', receita: finance.revenue * 0.08, despesa: finance.cost * 0.10 },
    { name: 'Mar', receita: finance.revenue * 0.15, despesa: finance.cost * 0.08 },
    { name: 'Abr', receita: finance.revenue * 0.20, despesa: finance.cost * 0.05 },
    { name: 'Mai', receita: finance.revenue * 0.12, despesa: finance.cost * 0.15 },
    { name: 'Jun', receita: finance.revenue * 0.10, despesa: finance.cost * 0.10 },
  ];

  const costDistribution = [
    { name: 'Insumos', value: 45, color: '#ef4444' },
    { name: 'Maquinário', value: 25, color: '#f97316' },
    { name: 'Mão de Obra', value: 20, color: '#eab308' },
    { name: 'Outros', value: 10, color: '#84cc16' },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold font-outfit text-foreground">Controle Financeiro</h2>
          <p className="text-muted-foreground">Fluxo de caixa e DRE da {selectedFarm.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Receita Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">R$ {finance.revenue.toLocaleString('pt-BR')}</div>
              <p className="text-xs text-muted-foreground mt-1">+12% vs safra anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Custos Operacionais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">R$ {finance.cost.toLocaleString('pt-BR')}</div>
              <p className="text-xs text-muted-foreground mt-1">-5% otimização de insumos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Lucro Líquido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">R$ {(finance.revenue - finance.cost).toLocaleString('pt-BR')}</div>
              <p className="text-xs text-muted-foreground mt-1">Margem de {Math.round(((finance.revenue - finance.cost) / finance.revenue) * 100)}%</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Fluxo de Caixa (Semestral)</CardTitle>
            </CardHeader>
            <CardContent className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `R$${value/1000}k`} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="receita" name="Receita" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="despesa" name="Despesa" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Custos</CardTitle>
            </CardHeader>
            <CardContent className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {costDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 flex-wrap mt-[-20px]">
                {costDistribution.map((item, i) => (
                  <div key={i} className="flex items-center gap-1 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
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
