import { useState, useEffect } from "react";
import { AdminLayout } from "./widgets/layout/AdminLayout";
import { GiveawaysPage } from "./pages/admin/GiveawaysPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { GiveawayPage } from "./pages/giveaway/GiveawayPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState<string>("admin");
  
  useEffect(() => {
    // Проверка токена при загрузке
    const token = localStorage.getItem("auth_token");
    const route = localStorage.getItem("current_route") || "admin";
    
    setIsAuthenticated(!!token);
    setCurrentRoute(route);
    setIsLoading(false);
    
    // Обработчик для навигации на страницу розыгрыша
    const handleRouteChange = (event: CustomEvent) => {
      setCurrentRoute(event.detail.route);
      localStorage.setItem("current_route", event.detail.route);
    };
    
    window.addEventListener("route-change" as any, handleRouteChange as any);
    
    return () => {
      window.removeEventListener("route-change" as any, handleRouteChange as any);
    };
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <LoginPage />;
  }
  
  // Рендер страницы розыгрыша (без админки)
  if (currentRoute === "giveaway") {
    return <GiveawayPage />;
  }
  
  // Рендер админ-панели
  return (
    <AdminLayout>
      <GiveawaysPage />
    </AdminLayout>
  );
}

export default App;
