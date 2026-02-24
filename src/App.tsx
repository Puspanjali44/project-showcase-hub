import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import BrowseNGOs from "./pages/BrowseNGOs";
import NGODetail from "./pages/NGODetail";
import DonorDashboard from "./pages/DonorDashboard";
import NGODashboard from "./pages/NGODashboard";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/ngos"
              element={
                <ProtectedRoute requiredRole="donor">
                  <BrowseNGOs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ngos/:id"
              element={
                <ProtectedRoute requiredRole="donor">
                  <NGODetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/donor-dashboard"
              element={
                <ProtectedRoute requiredRole="donor">
                  <DonorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ngo-dashboard"
              element={
                <ProtectedRoute requiredRole="ngo">
                  <NGODashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
