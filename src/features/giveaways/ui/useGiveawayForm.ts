import { useState, useEffect } from 'react';
import type { Giveaway, GiveawayFormData } from '@/entities/giveaway';
import { giveawaysApi, addGiveawayToStore, updateGiveawayInStore } from '../api/giveawaysApi';
import { validateGiveawayForm, hasErrors } from '../lib/validation';

interface UseGiveawayFormProps {
  giveaway?: Giveaway | null; // Если передан - режим редактирования
  onSuccess: (giveaway: Giveaway) => void;
}

export const useGiveawayForm = ({ giveaway, onSuccess }: UseGiveawayFormProps) => {
  const [formData, setFormData] = useState<GiveawayFormData>({
    title: '',
    prizeAmount: 0,
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Завтра по умолчанию
    telegramChannel: '',
    isActive: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Инициализация формы данными розыгрыша при редактировании
  useEffect(() => {
    if (giveaway) {
      setFormData({
        title: giveaway.title,
        prizeAmount: giveaway.prizeAmount,
        endTime: giveaway.endTime,
        telegramChannel: giveaway.telegramChannel || '',
        isActive: giveaway.isActive,
      });
    }
  }, [giveaway]);

  const updateField = <K extends keyof GiveawayFormData>(field: K, value: GiveawayFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Очищаем ошибку для этого поля при изменении
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    setSubmitError(null);
  };

  const validate = (): boolean => {
    const validationErrors = validateGiveawayForm(formData);
    setErrors(validationErrors as Record<string, string>);
    return !hasErrors(validationErrors);
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setSubmitError(null);

    try {
      let result: Giveaway;

      if (giveaway) {
        // Режим редактирования
        result = await giveawaysApi.update(giveaway.id, formData);
        updateGiveawayInStore(result);
      } else {
        // Режим создания
        result = await giveawaysApi.create(formData);
        addGiveawayToStore(result);
      }

      onSuccess(result);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Произошла ошибка при сохранении');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    submitError,
    updateField,
    handleSubmit,
    isEditMode: !!giveaway,
  };
};
