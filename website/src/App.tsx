import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/Navbar";

import Home from "@/pages/Home";
import Overview from "@/pages/Overview";
import Dashboard from "@/pages/Dashboard";
import Insights from "@/pages/Insights";
import Dataset from "@/pages/Dataset";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/overview" component={Overview} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/insights" component={Insights} />
          <Route path="/dataset" component={Dataset} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <footer className="border-t bg-muted/30 py-6 px-4 text-center text-xs text-muted-foreground">
        <p>
          Food Delivery Operations Analytics &mdash; A project by{" "}
          <span className="font-medium text-foreground">Sitanshu Singh</span>
        </p>
        <p className="mt-1">Analyzed in Python and SQL &middot; Visualized in Power BI &middot; Deployed on GitHub Pages</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
