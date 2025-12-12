import { useState, useEffect } from "react";
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
  Bell,
  MapPin,
  Moon,
  Sun,
  Search,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppStore } from "@/lib/store";
import { FARMS_DATA } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  
  // Theme state
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const NavContent = () => (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-green-600 flex items-center justify-center text-primary-foreground shadow-lg shadow-green-500/20">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-outfit font-bold text-xl tracking-tight text-foreground">AgroTech</h1>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Enterprise</p>
          </div>
        </div>
        
        <div className="mb-2">
          <label className="text-xs font-medium text-muted-foreground mb-2 block px-1">Fazenda Selecionada</label>
           <Select value={selectedFarmId} onValueChange={setSelectedFarmId}>
            <SelectTrigger className="w-full bg-sidebar-accent/30 border-sidebar-border text-left h-12 shadow-sm">
              <SelectValue placeholder="Selecione a fazenda" />
            </SelectTrigger>
            <SelectContent>
              {FARMS_DATA.map((farm) => (
                <SelectItem key={farm.id} value={farm.id} className="cursor-pointer py-3">
                  <div className="flex flex-col items-start gap-1">
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

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <p className="px-4 text-xs font-medium text-muted-foreground mb-2 mt-2 uppercase tracking-wider">Menu Principal</p>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 font-outfit group relative overflow-hidden",
                location === item.href
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              )}
            >
              {location === item.href && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-30" />
              )}
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", location === item.href ? "text-white" : "text-muted-foreground group-hover:text-foreground")} />
              {item.label}
            </a>
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-gradient-to-br from-sidebar-accent/50 to-sidebar-accent/20 border border-sidebar-border rounded-xl p-4">
           <div className="flex items-center gap-3 mb-3">
             <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
               <CloudSun className="w-4 h-4 text-blue-600 dark:text-blue-400" />
             </div>
             <div>
               <p className="text-xs font-medium">Clima Atual</p>
               <p className="text-sm font-bold">{selectedFarm.weather.temp}°C {selectedFarm.weather.condition === 'sunny' ? 'Ensolarado' : 'Nublado'}</p>
             </div>
           </div>
           <div className="w-full bg-muted/50 rounded-full h-1.5 mb-1 overflow-hidden">
             <div className="bg-blue-500 h-full rounded-full" style={{ width: '75%' }}></div>
           </div>
           <p className="text-[10px] text-muted-foreground text-right">Umidade: 75%</p>
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent w-full transition-colors text-left group">
              <Avatar className="h-9 w-9 border-2 border-background shadow-sm group-hover:border-primary/50 transition-colors">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate font-outfit text-foreground group-hover:text-primary transition-colors">João da Silva</p>
                <p className="text-xs text-muted-foreground truncate font-mono">Admin</p>
              </div>
              <Settings className="w-4 h-4 text-muted-foreground group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuItem>Assinatura</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 border-r border-border fixed inset-y-0 z-50 bg-card/50 backdrop-blur-xl">
        <NavContent />
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 w-full h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 lg:px-8 transition-all duration-300">
          <div className="flex items-center gap-4 lg:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-ml-2 hover:bg-muted/50">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 border-r border-border">
                <NavContent />
              </SheetContent>
            </Sheet>
            <span className="font-outfit font-bold text-lg flex items-center gap-2">
              <Sprout className="w-5 h-5 text-primary" />
              AgroTech
            </span>
          </div>

          <div className="hidden lg:flex flex-1 max-w-md ml-4">
             <div className="relative w-full group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
               <Input 
                 placeholder="Buscar culturas, máquinas ou relatórios..." 
                 className="pl-9 bg-muted/30 border-transparent focus:bg-background focus:border-primary/20 transition-all rounded-full" 
               />
             </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full hover:bg-muted/50"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              ) : (
                <Sun className="w-5 h-5 text-muted-foreground hover:text-yellow-400 transition-colors" />
              )}
            </Button>
            
            <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-muted/50">
              <Bell className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background animate-pulse"></span>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
          <div className="max-w-[1600px] mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
