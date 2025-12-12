import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Sprout, 
  Tractor, 
  CloudSun, 
  LineChart, 
  Wallet, 
  Settings, 
  Menu, 
  X,
  Bell,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppStore } from "@/lib/store";
import { FARMS_DATA } from "@/lib/mock-data";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: "Painel", href: "/" },
  { icon: CloudSun, label: "Clima", href: "/weather" },
  { icon: LineChart, label: "Mercado", href: "/market" },
  { icon: Sprout, label: "Safras", href: "/crops" },
  { icon: Tractor, label: "Maquinário", href: "/machinery" },
  { icon: Wallet, label: "Financeiro", href: "/finance" },
];

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { selectedFarmId, setSelectedFarmId } = useAppStore();
  const selectedFarm = FARMS_DATA.find(f => f.id === selectedFarmId) || FARMS_DATA[0];

  const NavContent = () => (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-outfit font-bold text-xl tracking-tight">AgroTech</h1>
            <p className="text-xs text-muted-foreground font-mono">v2.4.0</p>
          </div>
        </div>
        
        <div className="mt-6">
           <Select value={selectedFarmId} onValueChange={setSelectedFarmId}>
            <SelectTrigger className="w-full bg-sidebar-accent/50 border-sidebar-border text-left">
              <SelectValue placeholder="Selecione a fazenda" />
            </SelectTrigger>
            <SelectContent>
              {FARMS_DATA.map((farm) => (
                <SelectItem key={farm.id} value={farm.id} className="cursor-pointer">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{farm.name}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                       <MapPin className="w-3 h-3" /> {farm.location}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors font-outfit",
                location === item.href
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </a>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/50 border border-sidebar-border">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate font-outfit">João da Silva</p>
            <p className="text-xs text-muted-foreground truncate font-mono">{selectedFarm.name}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 border-r border-border fixed inset-y-0 z-50">
        <NavContent />
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 w-full h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4 lg:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-ml-2">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 border-r border-border">
                <NavContent />
              </SheetContent>
            </Sheet>
            <span className="font-outfit font-bold text-lg">AgroTech</span>
          </div>

          <div className="hidden lg:flex items-center text-sm text-muted-foreground">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/50 border border-accent">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Sistemas Online
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-background"></span>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
