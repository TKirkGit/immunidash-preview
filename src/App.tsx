import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PatientDetails from "./pages/PatientDetails";
import Patients from "./pages/Patients";
import Search from "./pages/Search";
import Update from "./pages/Update";
import Tests from "./pages/Tests";
import Geraete from "./pages/Geraete";
import Settings from "./pages/Settings";
 
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/:pid" element={<Patients />} />
          <Route path="/search" element={<Search />} />
          <Route path="/update" element={<Update />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/geraete" element={<Geraete />} />
          <Route path="/details/:pid" element={<PatientDetails />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
