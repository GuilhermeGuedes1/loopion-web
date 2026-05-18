import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router";
import { useEffect } from "react";
import { LoginPage } from "./components/LoginPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./components/Dashboard";
import { CustomersPage } from "./components/CustomersPage";
import { VisitsPage } from "./components/VisitsPage";
import { MessagesPage } from "./components/MessagesPage";
import { SettingsPage } from "./components/SettingsPage";
import { Toaster } from "./components/ui/sonner";

function RouteMetadata() {
  const location = useLocation();

  useEffect(() => {
    const routeMap: Record<string, { title: string; description: string }> = {
      "/": {
        title: "Login - Loopin",
        description: "Access your Loopin dashboard and manage customer sessions.",
      },
      "/dashboard": {
        title: "Dashboard - Loopin",
        description: "Your Loopin overview with KPIs and latest activity.",
      },
      "/customers": {
        title: "Customers - Loopin",
        description: "View and manage your customers in Loopin.",
      },
      "/visits": {
        title: "Visits - Loopin",
        description: "Track customer visits and history in Loopin.",
      },
      "/messages": {
        title: "Messages - Loopin",
        description: "Review conversations and messages in Loopin.",
      },
      "/settings": {
        title: "Settings - Loopin",
        description: "Update your Loopin preferences and account settings.",
      },
    };

    const metadata = routeMap[location.pathname] ?? {
      title: "Loopin",
      description: "Manage customers, visits, messages and settings with Loopin.",
    };

    document.title = metadata.title;

    const descriptionMeta = document.querySelector(
      'meta[name="description"]',
    );
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", metadata.description);
    }
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <div className="dark size-full">
      <BrowserRouter>
        <RouteMetadata />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/visits" element={<VisitsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}
