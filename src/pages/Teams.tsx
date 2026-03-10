import { useEffect, useState } from 'react';
import { fetchTeams, joinTeam } from '@/services/teams';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { BottomNav } from '@/components/BottomNav';
import { TeamCard } from '@/components/TeamCard';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Team } from '@/types';
import { PageTransition } from '@/components/motion/PageTransition';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { CardGridSkeleton } from '@/components/LoadingSkeleton';

const Teams = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  const load = async () => {
    try {
      setTeams(await fetchTeams());
    } catch { /* Firebase may not be configured */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleJoin = async (teamId: string) => {
    if (!user) return;
    setJoining(true);
    try {
      await joinTeam(teamId, user.uid);
      toast({ title: 'Joined team!' });
      await load();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setJoining(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <Navbar />
        <div className="page-container">
          <h1 className="section-title">Teams</h1>

          {loading ? (
            <CardGridSkeleton count={3} />
          ) : teams.length === 0 ? (
            <div className="glass-card rounded-2xl p-8 text-center">
              <p className="text-muted-foreground">No teams yet. Add teams to your Firestore to see them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {teams.map((t, i) => (
                <ScrollReveal key={t.id} delay={i * 0.08}>
                  <TeamCard team={t} userId={user!.uid} onJoin={handleJoin} joining={joining} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default Teams;
