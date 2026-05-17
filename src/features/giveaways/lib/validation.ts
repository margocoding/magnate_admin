import type { GiveawayFormData } from '@/entities/giveaway';

export interface GiveawayFormErrors {
  title?: string;
  prizeAmount?: string;
  endTime?: string;
  telegramChannel?: string;
  [key: string]: string | undefined;
}

export const validateGiveawayForm = (data: GiveawayFormData): GiveawayFormErrors => {
  const errors: GiveawayFormErrors = {};

  // Валидация названия (минимум 3 символа)
  if (!data.title || data.title.trim().length < 3) {
    errors.title = 'Название должно содержать минимум 3 символа';
  }

  // Валидация приза (не пустой, больше 0)
  if (!data.prizeAmount || data.prizeAmount <= 0) {
    errors.prizeAmount = 'Приз должен быть больше 0';
  }

  // Валидация даты окончания (должна быть в будущем)
  if (!data.endTime) {
    errors.endTime = 'Укажите дату окончания';
  } else if (data.endTime <= new Date()) {
    errors.endTime = 'Дата окончания должна быть в будущем';
  }

  // Валидация Telegram канала (только t.me)
  if (!data.telegramChannel || data.telegramChannel.trim() === '') {
    errors.telegramChannel = 'Укажите ссылку на канал';
  } else {
    const telegramRegex = /^(https?:\/\/)?(www\.)?t\.me\/[a-zA-Z0-9_]+$/;
    if (!telegramRegex.test(data.telegramChannel)) {
      errors.telegramChannel = 'Ссылка должна быть формата t.me/username';
    }
  }

  return errors;
};

export const hasErrors = (errors: GiveawayFormErrors): boolean => {
  return Object.keys(errors).length > 0;
};

// Форматирование даты для input datetime-local
export const formatDateTimeLocal = (date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Парсинг даты из input datetime-local
export const parseDateTimeLocal = (value: string): Date => {
  return new Date(value);
};
