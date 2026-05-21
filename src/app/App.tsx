import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";

import { LoginPage } from "./components/auth/LoginPage";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { CustomersPage } from "./components/customers/CustomersPage";
import { Toaster } from "./components/ui/sonner";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

function RouteMetadata() {
  const location = useLocation();

  useEffect(() => {
    const routeMap: Record<
      string,
      {
        title: string;
        description: string;
      }
    > = {
      "/": {
        title: "Login - Loopin",
        description: "Access Loopin and manage your customer relationships.",
      },

      "/customers": {
        title: "Customers - Loopin",
        description: "View and manage your customers in Loopin.",
      },
    };

    const metadata = routeMap[location.pathname] ?? {
      title: "Loopin",
      description: "Manage your customer relationships with Loopin.",
    };

    document.title = metadata.title;

    const descriptionMeta = document.querySelector('meta[name="description"]');

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
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Navigate to="/customers" replace />} />
              <Route path="/customers" element={<CustomersPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>

      <Toaster />
    </div>
  );
}
