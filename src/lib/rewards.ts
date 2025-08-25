type LevelRewards = {
  tapsPerDay: number;
  tonRequired: number;
};

export const LEVELS: Record<number, LevelRewards> = {
  0: { tapsPerDay: 5, tonRequired: 0 },
  1: { tapsPerDay: 25, tonRequired: 0.5 },
  2: { tapsPerDay: 60, tonRequired: 1.5 }
};