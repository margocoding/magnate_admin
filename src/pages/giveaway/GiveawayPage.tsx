import { useState, useEffect } from 'react';
import { Gift, Users, Clock, Trophy } from 'lucide-react';
import { GlassCard, GradientText, CountdownTimer } from '@/shared/ui';
import { mockGiveaways } from '@/features/participants/lib/mockData';
import type { Giveaway } from '@/entities/giveaway';

export const GiveawayPage = () => {
  const [activeGiveaway, setActiveGiveaway] = useState<Giveaway | null>(null);

  useEffect(() => {
    // Находим активный розыгрыш
    const active = mockGiveaways.find(g => g.status === 'active' && g.endTime > new Date());
    setActiveGiveaway(active || null);
  }, []);

  if (!activeGiveaway) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <GlassCard className="!p-8 text-center">
          <Gift size={48} className="mx-auto mb-4 text-gray-500" />
          <GradientText variant="accent" className="text-2xl font-bold mb-2">
            Нет активных розыгрышей
          </GradientText>
          <p className="text-gray-400">Заходите позже!</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl shadow-lg shadow-yellow-900/30">
              <Trophy size={32} className="text-white" />
            </div>
          </div>
          <GradientText variant="accent" className="text-4xl font-black mb-2">
            РОЗЫГРЫШ
          </GradientText>
          <p className="text-gray-400">Примите участие и выиграйте крутые призы!</p>
        </div>

        {/* Main Giveaway Card */}
        <GlassCard className="!p-8 mb-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {activeGiveaway.title}
              </h1>
              <GradientText variant="prize" className="text-6xl font-black">
                {activeGiveaway.prizeAmount.toLocaleString()} ₽
              </GradientText>
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={20} />
              <span>До окончания:</span>
            </div>

            <CountdownTimer endTime={activeGiveaway.endTime} />

            <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-cyan-500/20 rounded-xl">
                  <Users size={24} className="text-cyan-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-400">Участников</p>
                  <p className="text-xl font-bold text-white">
                    {activeGiveaway.participantCount.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-fuchsia-500/20 rounded-xl">
                  <Gift size={24} className="text-fuchsia-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-400">Призовой фонд</p>
                  <p className="text-xl font-bold text-white">
                    {activeGiveaway.fundAmount.toLocaleString()} ₽
                  </p>
                </div>
              </div>
            </div>

            {/* Join Button */}
            <button className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold rounded-2xl shadow-lg shadow-violet-900/30 hover:shadow-violet-900/50 transition-all hover:scale-105">
              Принять участие
            </button>
          </div>
        </GlassCard>

        {/* Info */}
        <GlassCard className="!p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-violet-500/20 rounded-xl">
              <Gift size={24} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Как участвовать?</h3>
              <ol className="space-y-2 text-gray-400 text-sm">
                <li>1. Нажмите кнопку "Принять участие"</li>
                <li>2. Подпишитесь на наш Telegram-канал</li>
                <li>3. Дождитесь окончания розыгрыша</li>
                <li>4. Победитель будет определён случайным образом</li>
              </ol>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
