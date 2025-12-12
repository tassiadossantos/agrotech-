import { Layout } from "@/components/layout/Layout";
import { WeatherCard } from "@/components/dashboard/WeatherCard";
import { MarketCard } from "@/components/dashboard/MarketCard";
import { CropCard } from "@/components/dashboard/CropCard";
import { PriceChart } from "@/components/dashboard/PriceChart";
import { FinanceCard } from "@/components/dashboard/FinanceCard";
import { FarmMap } from "@/components/dashboard/FarmMap";
import { AgroChat } from "@/components/chat/AgroChat";
import { Button } from "@/components/ui/button";
import { Download, Share2, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/aerial_view_of_modern_sustainable_farm.png";
import { useAppStore } from "@/lib/store";
import { FARMS_DATA } from "@/lib/mock-data";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 50, damping: 10 } }
};

export default function Dashboard() {
  const { selectedFarmId } = useAppStore();
  const selectedFarm = FARMS_DATA.find(f => f.id === selectedFarmId) || FARMS_DATA[0];

  return (
    <Layout>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Header Section with Glassmorphism */}
        <motion.div variants={item} className="relative rounded-2xl overflow-hidden h-[300px] shadow-2xl group">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
          <img 
            src={heroImage} 
            alt="Fazenda Boa Vista" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute top-0 right-0 p-6 z-20">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1 text-white text-sm font-medium flex items-center gap-2">
               <Sparkles className="w-3 h-3 text-yellow-400" />
               IA Analysis Active
             </div>
          </div>
          <div className="absolute bottom-0 left-0 p-8 z-20 text-white w-full">
            <div className="flex justify-between items-end">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-2 tracking-tight">{selectedFarm.name}</h2>
                </motion.div>
                <p className="text-white/80 font-mono text-sm md:text-base flex items-center gap-3">
                  <span className="flex items-center gap-1.5 bg-green-500/20 px-2 py-0.5 rounded text-green-300 border border-green-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    Operacional
                  </span>
                  <span>•</span>
                  <span>{selectedFarm.location}</span>
                  <span>•</span>
                  <span>{selectedFarm.size} ha</span>
                </p>
              </div>
              <div className="hidden md:flex gap-3">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm gap-2">
                  <Share2 className="w-4 h-4" /> Compartilhar
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-white gap-2 shadow-lg shadow-primary/25">
                  <Download className="w-4 h-4" /> Relatório Diário
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold font-outfit text-foreground flex items-center gap-2">
            Visão Geral 
            <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-md">Tempo Real</span>
          </h3>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Top Row Stats */}
          <motion.div variants={item} className="lg:col-span-4 h-[260px]">
            <WeatherCard />
          </motion.div>
          <motion.div variants={item} className="lg:col-span-4 h-[260px]">
            <MarketCard />
          </motion.div>
          <motion.div variants={item} className="lg:col-span-4 h-[260px]">
            <CropCard />
          </motion.div>
          
          {/* Middle Row: Map & Finance */}
          <motion.div variants={item} className="lg:col-span-8 min-h-[400px]">
            <FarmMap />
          </motion.div>
          <motion.div variants={item} className="lg:col-span-4 min-h-[400px]">
            <FinanceCard />
          </motion.div>

          {/* Bottom Row: Charts */}
          <motion.div variants={item} className="lg:col-span-12 min-h-[350px]">
            <PriceChart />
          </motion.div>
        </div>
      </motion.div>
      
      <AgroChat />
    </Layout>
  );
}
