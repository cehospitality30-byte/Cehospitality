import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Offers from "./pages/Offers";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// About subpages
import CompanyOverview from "./pages/about/CompanyOverview";
import VisionMission from "./pages/about/VisionMission";
import OurHistory from "./pages/about/OurHistory";
import Leadership from "./pages/about/Leadership";

// Menu subpages
import CoffeePage from "./pages/menu/CoffeePage";
import BeveragesPage from "./pages/menu/BeveragesPage";
import StartersPage from "./pages/menu/StartersPage";
import MainCoursePage from "./pages/menu/MainCoursePage";
import DessertsPage from "./pages/menu/DessertsPage";
import ChefSpecialsPage from "./pages/menu/ChefSpecialsPage";

// Admin pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import MenuManagement from "./pages/admin/MenuManagement";
import ServicesManagement from "./pages/admin/ServicesManagement";
import GalleryManagement from "./pages/admin/GalleryManagement";
import BookingsInbox from "./pages/admin/BookingsInbox";
import ContactInbox from "./pages/admin/ContactInbox";
import OffersManagement from "./pages/admin/OffersManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import LeadershipManagement from "./pages/admin/LeadershipManagement";
import Settings from "./pages/admin/Settings";
import Setup from "./pages/admin/Setup";
import SuperAdmin from "./pages/admin/SuperAdmin";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/overview" element={<CompanyOverview />} />
          <Route path="/about/vision" element={<VisionMission />} />
          <Route path="/about/history" element={<OurHistory />} />
          <Route path="/about/leadership" element={<Leadership />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/coffee" element={<CoffeePage />} />
          <Route path="/menu/beverages" element={<BeveragesPage />} />
          <Route path="/menu/starters" element={<StartersPage />} />
          <Route path="/menu/main-course" element={<MainCoursePage />} />
          <Route path="/menu/desserts" element={<DessertsPage />} />
          <Route path="/menu/chef-specials" element={<ChefSpecialsPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/setup" element={<Setup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/menu"
            element={
              <ProtectedRoute>
                <MenuManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <ProtectedRoute>
                <ServicesManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <GalleryManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute>
                <BookingsInbox />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contacts"
            element={
              <ProtectedRoute>
                <ContactInbox />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/offers"
            element={
              <ProtectedRoute>
                <OffersManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/content"
            element={
              <ProtectedRoute>
                <ContentManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/leadership"
            element={
              <ProtectedRoute>
                <LeadershipManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/superadmin"
            element={
              <ProtectedRoute>
                <SuperAdmin />
              </ProtectedRoute>
            }
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
