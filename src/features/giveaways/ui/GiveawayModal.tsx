import { Gift, Coins, Calendar, Link, ToggleLeft, ToggleRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal, Button, GradientText } from '@/shared/ui';
import { formatDateTimeLocal, parseDateTimeLocal } from '../lib/validation';
import { useGiveawayForm } from './useGiveawayForm';
import type { Giveaway } from '@/entities/giveaway';

interface GiveawayModalProps {
  isOpen: boolean;
  onClose: () => void;
  giveaway?: Giveaway | null;
  onSuccess: (giveaway: Giveaway) => void;
}

export const GiveawayModal = ({
  isOpen,
  onClose,
  giveaway,
  onSuccess,
}: GiveawayModalProps) => {
  const {
    formData,
    errors,
    isLoading,
    submitError,
    updateField,
    handleSubmit,
  } = useGiveawayForm({
    giveaway,
    onSuccess,
  });

  const isEditing = !!giveaway;

  return (
    <Modal
      isOpen={isOpen}
      onClose={isLoading ? () => {} : onClose} // Блокируем закрытие во время загрузки
      title={
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
            <Gift size={20} className="text-white" />
          </div>
          <span>{isEditing ? 'Редактирование розыгрыша' : 'Создание розыгрыша'}</span>
        </div>
      }
      size="md"
    >
      <div className="p-6 space-y-6">
        {/* Ошибка отправки */}
        <AnimatePresence>
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-400 text-sm"
            >
              {submitError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Поле: Название */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Gift size={16} />
            Название розыгрыша
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Например: Новогодний розыгрыш"
            className={`w-full px-4 py-3 bg-white/5 border ${
              errors.title ? 'border-red-500/50' : 'border-white/10'
            } rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all`}
            disabled={isLoading}
          />
          {errors.title && (
            <p className="text-xs text-red-400">{errors.title}</p>
          )}
        </div>

        {/* Поле: Приз */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Coins size={16} />
            Размер приза (₽)
          </label>
          <input
            type="number"
            value={formData.prizeAmount || ''}
            onChange={(e) => updateField('prizeAmount', Number(e.target.value))}
            placeholder="50000"
            min="0"
            className={`w-full px-4 py-3 bg-white/5 border ${
              errors.prizeAmount ? 'border-red-500/50' : 'border-white/10'
            } rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all`}
            disabled={isLoading}
          />
          {errors.prizeAmount && (
            <p className="text-xs text-red-400">{errors.prizeAmount}</p>
          )}
        </div>

        {/* Поле: Дата окончания */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Calendar size={16} />
            Дата и время окончания
          </label>
          <input
            type="datetime-local"
            value={formatDateTimeLocal(formData.endTime)}
            onChange={(e) => updateField('endTime', parseDateTimeLocal(e.target.value))}
            className={`w-full px-4 py-3 bg-white/5 border ${
              errors.endTime ? 'border-red-500/50' : 'border-white/10'
            } rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert`}
            disabled={isLoading}
          />
          {errors.endTime && (
            <p className="text-xs text-red-400">{errors.endTime}</p>
          )}
        </div>

        {/* Поле: Telegram канал */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Link size={16} />
            Ссылка на Telegram-канал
          </label>
          <input
            type="text"
            value={formData.telegramChannel}
            onChange={(e) => updateField('telegramChannel', e.target.value)}
            placeholder="t.me/mychannel"
            className={`w-full px-4 py-3 bg-white/5 border ${
              errors.telegramChannel ? 'border-red-500/50' : 'border-white/10'
            } rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all`}
            disabled={isLoading}
          />
          {errors.telegramChannel && (
            <p className="text-xs text-red-400">{errors.telegramChannel}</p>
          )}
        </div>

        {/* Переключатель активности */}
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${formData.isActive ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
              {formData.isActive ? (
                <ToggleRight size={20} className="text-green-400" />
              ) : (
                <ToggleLeft size={20} className="text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-white">Активен</p>
              <p className="text-xs text-gray-400">
                {formData.isActive ? 'Розыгрыш виден пользователям' : 'Розыгрыш в черновиках'}
              </p>
            </div>
          </div>
          <button
            onClick={() => updateField('isActive', !formData.isActive)}
            disabled={isLoading}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              formData.isActive ? 'bg-green-500' : 'bg-gray-600'
            }`}
          >
            <span
              className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                formData.isActive ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>

        {/* Только для редактирования: количество участников */}
        {isEditing && giveaway && (
          <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-xl">
                  <Coins size={20} className="text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Участников</p>
                  <p className="text-xs text-gray-400">Текущее количество участников</p>
                </div>
              </div>
              <GradientText variant="accent" className="text-2xl font-black">
                {giveaway.participantCount}
              </GradientText>
            </div>
          </div>
        )}

        {/* Кнопки действий */}
        <div className="flex gap-3 pt-4 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Отмена
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            isLoading={isLoading}
            className="flex-1"
          >
            {isEditing ? 'Сохранить' : 'Создать'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
