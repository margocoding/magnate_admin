import { useState, useEffect } from 'react';
import { AdminLayout } from '@/widgets/layout/AdminLayout';
import { GiveawaysPage } from './pages/admin/GiveawaysPage';
import { LoginPage } from './pages/auth/LoginPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверка токена при загрузке
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
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

  return (
    <AdminLayout>
      <GiveawaysPage />
    </AdminLayout>
  );
}

export default App;
