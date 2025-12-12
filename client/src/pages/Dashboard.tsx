import { Layout } from "@/components/layout/Layout";
import { WeatherCard } from "@/components/dashboard/WeatherCard";
import { MarketCard } from "@/components/dashboard/MarketCard";
import { CropCard } from "@/components/dashboard/CropCard";
import { PriceChart } from "@/components/dashboard/PriceChart";
import { FinanceCard } from "@/components/dashboard/FinanceCard";
import { AgroChat } from "@/components/chat/AgroChat";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import heroImage from "@assets/generated_images/aerial_view_of_modern_sustainable_farm.png";
import { useAppStore } from "@/lib/store";
import { FARMS_DATA } from "@/lib/mock-data";

export default function Dashboard() {
  const { selectedFarmId } = useAppStore();
  const selectedFarm = FARMS_DATA.find(f => f.id === selectedFarmId) || FARMS_DATA[0];

  return (
    <Layout>
      <div className="relative rounded-xl overflow-hidden mb-8 h-48 md:h-64 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
        <img 
          src={heroImage} 
          alt="Fazenda Boa Vista" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 text-white">
          <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-2">{selectedFarm.name}</h2>
          <p className="text-white/80 font-mono text-sm md:text-base flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Status: Operacional • {selectedFarm.location} • {selectedFarm.size} ha
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold font-outfit text-foreground">Visão Geral</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" /> Compartilhar
          </Button>
          <Button size="sm" className="gap-2">
            <Download className="w-4 h-4" /> Relatório
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 h-[250px]">
          <WeatherCard />
        </div>
        <div className="col-span-1 h-[250px]">
          <MarketCard />
        </div>
        <div className="col-span-1 h-[250px]">
          <CropCard />
        </div>
        
        <div className="col-span-1 lg:col-span-2 min-h-[350px]">
          <PriceChart />
        </div>
        <div className="col-span-1 min-h-[350px]">
          <FinanceCard />
        </div>
      </div>
      
      <AgroChat />
    </Layout>
  );
}
