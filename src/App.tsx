import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import NGOPreviewLayout from "@/components/NGOPreviewLayout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import BrowseNGOs from "./pages/BrowseNGOs";
import NGODetail from "./pages/NGODetail";
import DonorDashboard from "./pages/DonorDashboard";
import NGODashboard from "./pages/NGODashboard";
import NGOProjects from "./pages/NGOProjects";
import NGOCreateProject from "./pages/NGOCreateProject";
import NGOSettings from "./pages/NGOSettings";
import NGOAnalytics from "./pages/NGOAnalytics";
import MyDonations from "./pages/MyDonations";
import Badges from "./pages/Badges";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const DonorLayout = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute requiredRole="donor">
    <DashboardLayout>{children}</DashboardLayout>
  </ProtectedRoute>
);

const NGOLayout = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute requiredRole="ngo">
    <DashboardLayout>{children}</DashboardLayout>
  </ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes with Navbar + Footer */}
            <Route path="/" element={<><Navbar /><Index /><Footer /></>} />
            <Route path="/auth" element={<><Navbar /><Auth /><Footer /></>} />
            <Route path="/about" element={<><Navbar /><About /><Footer /></>} />

            {/* Donor protected routes with sidebar layout */}
            <Route path="/donor-dashboard" element={<DonorLayout><DonorDashboard /></DonorLayout>} />
            <Route path="/ngos" element={<DonorLayout><BrowseNGOs /></DonorLayout>} />
            <Route path="/ngos/:id" element={<DonorLayout><NGODetail /></DonorLayout>} />
            <Route path="/my-donations" element={<DonorLayout><MyDonations /></DonorLayout>} />
            <Route path="/badges" element={<DonorLayout><Badges /></DonorLayout>} />

            {/* NGO protected routes with sidebar layout */}
            <Route path="/ngo-dashboard" element={<NGOLayout><NGODashboard /></NGOLayout>} />
            <Route path="/ngo-projects" element={<NGOLayout><NGOProjects /></NGOLayout>} />
            <Route path="/ngo-create-project" element={<NGOLayout><NGOCreateProject /></NGOLayout>} />
            <Route path="/ngo-settings" element={<NGOLayout><NGOSettings /></NGOLayout>} />
            <Route path="/ngo-analytics" element={<NGOLayout><NGOAnalytics /></NGOLayout>} />

            <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
