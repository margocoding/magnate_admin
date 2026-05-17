export type GiveawayStatus = 'active' | 'finished' | 'draft';

export interface Giveaway {
  id: string;
  title: string;
  prizeAmount: number;
  endTime: Date;
  participantCount: number;
  fundAmount: number;
  status: GiveawayStatus;
  createdAt: Date;
  telegramChannel?: string;
  isActive: boolean;
}

export interface GiveawayFormData {
  title: string;
  prizeAmount: number;
  endTime: Date;
  telegramChannel: string;
  isActive: boolean;
}

export interface Participant {
  id: string;
  username: string;
  fullName?: string;
  avatarUrl?: string;
  joinedAt: Date;
  isBot?: boolean;
  telegramId: string;
}
