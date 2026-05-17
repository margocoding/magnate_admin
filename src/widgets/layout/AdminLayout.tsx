import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Gift, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Trophy
} from 'lucide-react';
import { GlassCard } from '@/shared/ui/GlassCard';
import { Button } from '@/shared/ui/Button';
import { GradientText } from '@/shared/ui/GradientText';

interface AdminLayoutProps {
  children: React.ReactNode;
}

type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
};

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Обзор', icon: LayoutDashboard },
  { id: 'giveaways', label: 'Розыгрыши', icon: Gift, badge: 3 },
  { id: 'participants', label: 'Участники', icon: Users },
  { id: 'settings', label: 'Настройки', icon: Settings },
];

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [activeNav, setActiveNav] = useState('giveaways');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 z-50 lg:z-auto
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <GlassCard variant="default" className="h-full rounded-none lg:rounded-r-3xl lg:rounded-l-none border-l-0 lg:border-l border-white/10 p-6 flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Trophy size={20} className="text-white" />
              </div>
              <GradientText className="text-xl font-bold">Magnate</GradientText>
            </div>
            <button 
              className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group
                  ${activeNav === item.id 
                    ? 'bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <item.icon 
                    size={20} 
                    className={`transition-colors ${activeNav === item.id ? 'text-violet-400' : 'group-hover:text-violet-400'}`} 
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-violet-500 text-white text-xs font-semibold rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10"
              onClick={() => setShowLogoutModal(true)}
            >
              <LogOut size={20} />
              Выйти
            </Button>
          </div>
        </GlassCard>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Trophy size={16} className="text-white" />
              </div>
              <GradientText className="text-lg font-bold">Magnate</GradientText>
            </div>
            <button 
              className="p-2 hover:bg-white/5 rounded-xl transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} className="text-gray-400" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>

      {/* Logout confirmation modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLogoutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm"
            >
              <GlassCard variant="accent" className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                  <LogOut size={24} className="text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Выйти из системы?</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Вам потребуется снова ввести логин и пароль для входа.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowLogoutModal(false)}
                  >
                    Отмена
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1 bg-red-500 hover:bg-red-600"
                    onClick={handleLogout}
                  >
                    Выйти
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
