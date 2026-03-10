import type { MatchInsight } from '@/types';

export const getMatchInsight = async (): Promise<MatchInsight> => {
  return {
    score: 75,
    message: "AI matching temporarily disabled"
  };
};
