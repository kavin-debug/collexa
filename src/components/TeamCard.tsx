import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Team } from '@/types';
import { TiltCard } from '@/components/motion/TiltCard';

interface Props {
  team: Team;
  userId: string;
  onJoin: (teamId: string) => void;
  joining: boolean;
}

export const TeamCard = ({ team, userId, onJoin, joining }: Props) => {
  const isMember = team.members.includes(userId);

  return (
    <TiltCard>
      <div className="stat-card h-full">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-card-foreground">{team.name}</h3>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{team.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">{team.members.length} member{team.members.length !== 1 ? 's' : ''}</span>
          {isMember ? (
            <span className="inline-flex items-center rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">Joined ✓</span>
          ) : (
            <Button size="sm" onClick={() => onJoin(team.id)} disabled={joining} className="rounded-xl text-xs font-semibold transition-all hover:scale-[1.03]">
              Join Team
            </Button>
          )}
        </div>
      </div>
    </TiltCard>
  );
};
