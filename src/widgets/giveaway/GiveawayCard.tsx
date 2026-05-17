import { Gift, Users, Wallet, Eye, Edit2, Trash2, Clock } from "lucide-react";
import {
  GlassCard,
  GradientText,
  CountdownTimer,
  Button,
  StatusBadge,
} from "@/shared/ui";
import { formatPrice, formatDate } from "@/shared/lib/utils";
import type { Giveaway } from "@/entities/giveaway";

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
  onDelete,
}: GiveawayCardProps) => {
  const isActive = giveaway.status === "active";
  const isFinished = giveaway.status === "finished";

  return (
    <GlassCard className="group relative overflow-hidden flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex flex-col flex-1 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-yellow-500/20 rounded-2xl">
              <Gift size={24} className="text-yellow-400" />
            </div>

            <div className="min-h-[4.5rem] flex flex-col justify-start">
              <GradientText
                variant="accent"
                className="text-xs font-semibold uppercase tracking-wider"
              >
                РОЗЫГРЫШ
              </GradientText>

              <h3 className="text-lg font-bold text-white line-clamp-2 leading-snug">
                {giveaway.title}
              </h3>
            </div>
          </div>

          <StatusBadge status={giveaway.status} />
        </div>

        <div className="py-2">
          <GradientText variant="prize" className="text-4xl font-black">
            {formatPrice(giveaway.prizeAmount)} ₽
          </GradientText>
        </div>

        <div className="min-h-[40px] flex items-center">
          {isActive ? (
            <CountdownTimer endTime={giveaway.endTime} />
          ) : (
            <div className="flex items-center gap-2 text-gray-500">
              <Clock size={16} />
              <span className="text-sm">
                {isFinished ? "Розыгрыш завершён" : "Неактивен"}
              </span>
            </div>
          )}
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex gap-3">
            <div
              className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5`}
            >
              <Users size={16} className="text-cyan-400" />
              <div>
                <p className="text-xs text-gray-400">Участники</p>
                <p className="text-sm font-semibold text-white">
                  {giveaway.participantCount}
                </p>
              </div>
            </div>

            <div
              className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5`}
            >
              <Wallet size={16} className="text-fuchsia-400" />
              <div>
                <p className="text-xs text-gray-400">Фонд</p>
                <p className="text-sm font-semibold text-white">
                  {formatPrice(giveaway.fundAmount)} ₽
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10">
            <p className="text-xs text-gray-400">
              Окончание:{" "}
              <span className="text-gray-300">
                {formatDate(giveaway.endTime)}
              </span>
            </p>
          </div>

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
      </div>
    </GlassCard>
  );
};
