import type { Giveaway, GiveawayFormData } from '@/entities/giveaway';

// Имитация API задержки
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Временное хранилище для обновления списка
let mockGiveawaysStore: Giveaway[] = [];

// Функция для инициализации хранилища текущими данными
export const initGiveawaysStore = (giveaways: Giveaway[]) => {
  mockGiveawaysStore = [...giveaways];
};

// Функция для получения текущего состояния хранилища
export const getGiveawaysStore = (): Giveaway[] => {
  return [...mockGiveawaysStore];
};

// Функция для обновления элемента в хранилище
export const updateGiveawayInStore = (updatedGiveaway: Giveaway): void => {
  const index = mockGiveawaysStore.findIndex(g => g.id === updatedGiveaway.id);
  if (index !== -1) {
    mockGiveawaysStore[index] = updatedGiveaway;
  } else {
    mockGiveawaysStore.push(updatedGiveaway);
  }
};

// Функция для добавления нового элемента в хранилище
export const addGiveawayToStore = (giveaway: Giveaway): void => {
  mockGiveawaysStore.push(giveaway);
};

// Mock сервис для работы с розыгрышами
export const giveawaysApi = {
  // Создание нового розыгрыша
  async create(data: GiveawayFormData): Promise<Giveaway> {
    await delay(800); // Имитация сетевого запроса
    
    const newGiveaway: Giveaway = {
      id: `giveaway-${Date.now()}`,
      title: data.title,
      prizeAmount: data.prizeAmount,
      endTime: data.endTime,
      participantCount: 0,
      fundAmount: data.prizeAmount * 2, // Удвоенный призовой фонд
      status: data.isActive ? 'active' : 'draft',
      createdAt: new Date(),
      telegramChannel: data.telegramChannel,
      isActive: data.isActive,
    };
    
    return newGiveaway;
  },

  // Обновление существующего розыгрыша
  async update(id: string, data: Partial<GiveawayFormData>): Promise<Giveaway> {
    await delay(600); // Имитация сетевого запроса
    
    // Находим существующий розыгрыш (в реальном API это было бы на сервере)
    const existingGiveaway = mockGiveawaysStore.find(g => g.id === id);
    
    if (!existingGiveaway) {
      throw new Error('Giveaway not found');
    }
    
    const updatedGiveaway: Giveaway = {
      ...existingGiveaway,
      title: data.title ?? existingGiveaway.title,
      prizeAmount: data.prizeAmount ?? existingGiveaway.prizeAmount,
      endTime: data.endTime ?? existingGiveaway.endTime,
      telegramChannel: data.telegramChannel ?? existingGiveaway.telegramChannel,
      isActive: data.isActive ?? existingGiveaway.isActive,
      status: data.isActive !== undefined 
        ? (data.isActive ? 'active' : 'draft') 
        : existingGiveaway.status,
    };
    
    // Обновляем в "хранилище"
    const index = mockGiveawaysStore.findIndex(g => g.id === id);
    if (index !== -1) {
      mockGiveawaysStore[index] = updatedGiveaway;
    }
    
    return updatedGiveaway;
  },
};
