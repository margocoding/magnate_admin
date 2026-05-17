import type { Giveaway, Participant } from '../../../entities/giveaway';

export const mockGiveaways: Giveaway[] = [
  {
    id: '1',
    title: 'Новогодний розыгрыш',
    prizeAmount: 25000,
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    participantCount: 1247,
    fundAmount: 50000,
    status: 'active',
    createdAt: new Date('2025-01-01'),
    telegramChannel: 't.me/newyear_channel',
    isActive: true,
  },
  {
    id: '2',
    title: 'Весенний марафон',
    prizeAmount: 50000,
    endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    participantCount: 3542,
    fundAmount: 100000,
    status: 'finished',
    createdAt: new Date('2025-02-15'),
    telegramChannel: 't.me/spring_marathon',
    isActive: false,
  },
  {
    id: '3',
    title: 'VIP розыгрыш для подписчиков',
    prizeAmount: 100000,
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    participantCount: 892,
    fundAmount: 150000,
    status: 'active',
    createdAt: new Date('2025-03-01'),
    telegramChannel: 't.me/vip_subscribers',
    isActive: true,
  },
  {
    id: '4',
    title: 'Быстрый старт',
    prizeAmount: 5000,
    endTime: new Date(Date.now() + 10 * 60 * 60 * 1000),
    participantCount: 234,
    fundAmount: 7500,
    status: 'draft',
    createdAt: new Date('2025-03-10'),
    telegramChannel: 't.me/quick_start',
    isActive: false,
  },
  {
    id: '5',
    title: 'Мега розыгрыш',
    prizeAmount: 500000,
    endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    participantCount: 15234,
    fundAmount: 750000,
    status: 'active',
    createdAt: new Date('2025-03-05'),
    telegramChannel: 't.me/mega_giveaway',
    isActive: true,
  },
];

export const generateMockParticipants = (count: number): Participant[] => {
  const firstNames = ['Александр', 'Дмитрий', 'Максим', 'Сергей', 'Андрей', 'Алексей', 'Артем', 'Илья', 'Кирилл', 'Михаил'];
  const lastNames = ['Иванов', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Петров', 'Соколов', 'Михайлов', 'Новиков', 'Федоров'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `p-${i + 1}`,
    username: `user_${i + 1}`,
    fullName: `${lastNames[i % 10]} ${firstNames[i % 10]}`,
    avatarUrl: undefined,
    joinedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    isBot: Math.random() < 0.05,
    telegramId: `tg_${i + 1}`,
  }));
};

export const mockParticipantsByGiveaway: Record<string, Participant[]> = {
  '1': generateMockParticipants(1247),
  '2': generateMockParticipants(3542),
  '3': generateMockParticipants(892),
  '4': generateMockParticipants(234),
  '5': generateMockParticipants(15234),
};
