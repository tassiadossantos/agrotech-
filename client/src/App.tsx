import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import WeatherPage from "@/pages/Weather";
import MarketPage from "@/pages/Market";
import CropsPage from "@/pages/Crops";
import MachineryPage from "@/pages/Machinery";
import FinancePage from "@/pages/Finance";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/weather" component={WeatherPage} />
      <Route path="/market" component={MarketPage} />
      <Route path="/crops" component={CropsPage} />
      <Route path="/machinery" component={MachineryPage} />
      <Route path="/finance" component={FinancePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
