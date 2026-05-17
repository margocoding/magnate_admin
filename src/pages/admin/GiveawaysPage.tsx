import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { GlassCard, GradientText, Button } from '@/shared/ui';
import { GiveawayCard } from '@/widgets/giveaway/GiveawayCard';
import { ParticipantsModal } from '@/features/participants/ui/ParticipantsModal';
import { mockGiveaways } from '@/features/participants/lib/mockData';
import type { Giveaway } from '@/entities/giveaway';

export const GiveawaysPage = () => {
  const [selectedGiveaway, setSelectedGiveaway] = useState<Giveaway | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewParticipants = (giveaway: Giveaway) => {
    setSelectedGiveaway(giveaway);
    setIsModalOpen(true);
  };

  const handleEdit = (giveaway: Giveaway) => {
    console.log('Edit giveaway:', giveaway);
  };

  const handleDelete = (giveaway: Giveaway) => {
    console.log('Delete giveaway:', giveaway);
  };

  const handleCreate = () => {
    console.log('Create new giveaway');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-violet-950/20 to-gray-950">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl shadow-lg shadow-violet-900/30">
                <Sparkles size={24} className="text-white" />
              </div>
              <GradientText variant="accent" className="text-3xl font-black">
                РОЗЫГРЫШИ
              </GradientText>
            </div>
            <p className="text-gray-400">Управление розыгрышами и участниками</p>
          </div>

          <Button 
            variant="primary" 
            size="lg"
            onClick={handleCreate}
            className="hidden sm:inline-flex"
          >
            <Plus size={20} />
            Создать розыгрыш
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Всего розыгрышей', value: '5', color: 'from-violet-400 to-purple-500' },
            { label: 'Активных', value: '3', color: 'from-green-400 to-emerald-500' },
            { label: 'Участников', value: '21,149', color: 'from-cyan-400 to-blue-500' },
            { label: 'Призовой фонд', value: '1,012,500 ₽', color: 'from-yellow-400 to-orange-500' },
          ].map((stat) => (
            <GlassCard key={stat.label} className="!p-4">
              <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
              <GradientText className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </GradientText>
            </GlassCard>
          ))}
        </div>

        {/* Giveaways Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGiveaways.map((giveaway) => (
            <GiveawayCard
              key={giveaway.id}
              giveaway={giveaway}
              onViewParticipants={handleViewParticipants}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Mobile FAB */}
        <button
          onClick={handleCreate}
          className="sm:hidden fixed bottom-6 right-6 p-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full shadow-2xl shadow-violet-900/50 z-40 hover:scale-110 transition-transform"
        >
          <Plus size={24} className="text-white" />
        </button>

        {/* Participants Modal */}
        <ParticipantsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedGiveaway(null);
          }}
          giveaway={selectedGiveaway}
        />
      </div>
    </div>
  );
};
