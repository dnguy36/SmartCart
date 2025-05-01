import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Scanner from "@/pages/Scanner";
import Pantry from "@/pages/Pantry";
import Recipes from "@/pages/Recipes";
import Prices from "@/pages/Prices";
import Analytics from "@/pages/Analytics";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/scanner" component={Scanner} />
      <Route path="/pantry" component={Pantry} />
      <Route path="/recipes" component={Recipes} />
      <Route path="/prices" component={Prices} />
      <Route path="/analytics" component={Analytics} />
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
