import { Gift, Users, Wallet, Eye, Edit2, Trash2 } from 'lucide-react';
import { GlassCard, GradientText, CountdownTimer, Button, StatusBadge } from '@/shared/ui';
import { formatPrice, formatDate } from '@/shared/lib/utils';
import type { Giveaway } from '@/entities/giveaway';

interface GiveawayCardProps {
  giveaway: Giveaway;
  onViewParticipants: (giveaway: Giveaway) => void;
  onEdit: (giveaway: Giveaway) => void;
  onDelete: (giveaway: Giveaway) => void;
}

export const GiveawayCard = ({ 
  giveaway, 
  onViewParticipants, 
  onEdit, 
  onDelete 
}: GiveawayCardProps) => {
  return (
    <GlassCard className="group relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-yellow-500/20 rounded-2xl">
              <Gift size={24} className="text-yellow-400" />
            </div>
            <div>
              <GradientText variant="accent" className="text-xs font-semibold uppercase tracking-wider">
                РОЗЫГРЫШ
              </GradientText>
              <h3 className="text-lg font-bold text-white mt-0.5">{giveaway.title}</h3>
            </div>
          </div>
          <StatusBadge status={giveaway.status} />
        </div>

        {/* Prize Amount */}
        <div className="py-2">
          <GradientText variant="prize" className="text-4xl font-black">
            {formatPrice(giveaway.prizeAmount)} ₽
          </GradientText>
        </div>

        {/* Timer */}
        {giveaway.status === 'active' && (
          <CountdownTimer endTime={giveaway.endTime} />
        )}

        {/* Stats */}
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl">
            <Users size={16} className="text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Участники</p>
              <p className="text-sm font-semibold text-white">{formatPrice(giveaway.participantCount)}</p>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl">
            <Wallet size={16} className="text-fuchsia-400" />
            <div>
              <p className="text-xs text-gray-400">Фонд</p>
              <p className="text-sm font-semibold text-white">{formatPrice(giveaway.fundAmount)} ₽</p>
            </div>
          </div>
        </div>

        {/* End Date */}
        <div className="pt-2 border-t border-white/10">
          <p className="text-xs text-gray-400">
            Окончание: <span className="text-gray-300">{formatDate(giveaway.endTime)}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewParticipants(giveaway)}
          >
            <Eye size={16} />
            Участники
          </Button>
          
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onEdit(giveaway)}
            >
              <Edit2 size={16} />
            </Button>
            <Button 
              variant="danger" 
              size="sm"
              onClick={() => onDelete(giveaway)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
