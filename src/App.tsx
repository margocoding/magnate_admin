import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "./widgets/layout/AdminLayout";
import { GiveawaysPage } from "./pages/admin/GiveawaysPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { GiveawayPage } from "./pages/giveaway/GiveawayPage";

function App() {
  const isAuthenticated = !!localStorage.getItem("auth_token");

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <GiveawaysPage />
            </AdminLayout>
          }
        />
        <Route path="/giveaway" element={<GiveawayPage />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
