import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CalendarDays, Users, Activity, Sparkles, Bell, TrendingUp, Ticket } from 'lucide-react';
import { fetchEvents } from '@/services/events';
import { fetchTeams } from '@/services/teams';
import { getMatchInsight } from '@/services/ai';
import { fetchRegistrationsByUser } from '@/services/registrations';
import { Navbar } from '@/components/Navbar';
import { BottomNav } from '@/components/BottomNav';
import { EventCard } from '@/components/EventCard';
import { PageTransition } from '@/components/motion/PageTransition';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { TiltCard } from '@/components/motion/TiltCard';
import { FloatingOrbs } from '@/components/motion/FloatingOrbs';
import { StatSkeleton, CardGridSkeleton } from '@/components/LoadingSkeleton';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { CampusEvent, Team, MatchInsight } from '@/types';

const COLORS = [
  'hsl(230, 85%, 60%)',
  'hsl(270, 70%, 60%)',
  'hsl(152, 55%, 48%)',
  'hsl(340, 65%, 55%)',
  'hsl(200, 70%, 50%)',
  'hsl(38, 92%, 50%)',
];

const Dashboard = () => {
  const { user, isAdmin, isStudent } = useAuth();
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [insight, setInsight] = useState<MatchInsight | null>(null);
  const [loading, setLoading] = useState(true);
  const [myEventCount, setMyEventCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      const results = await Promise.allSettled([
        fetchEvents(),
        fetchTeams(),
        getMatchInsight(),
        user && isStudent ? fetchRegistrationsByUser(user.uid) : Promise.resolve([]),
      ]);
      if (results[0].status === 'fulfilled') setEvents(results[0].value);
      if (results[1].status === 'fulfilled') setTeams(results[1].value);
      if (results[2].status === 'fulfilled') setInsight(results[2].value);
      if (results[3].status === 'fulfilled') setMyEventCount((results[3].value as any[]).length);
      setLoading(false);
    };
    load();
  }, [user, isStudent]);

  const upcoming = events.filter(e => new Date(e.date) >= new Date());
  const upcomingCount = upcoming.length;

  const categoryData = events.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

  // Student stats
  const studentStats = [
    { icon: CalendarDays, label: 'Upcoming Events', value: upcomingCount, iconClass: 'text-primary icon-pulse' },
    { icon: Ticket, label: 'My Registrations', value: myEventCount, iconClass: 'text-accent icon-pulse' },
    { icon: Users, label: 'Active Teams', value: teams.length, iconClass: 'text-success icon-pulse' },
    { icon: Sparkles, label: 'AI Match Score', value: insight?.score ?? '—', iconClass: 'text-accent icon-glow', sub: insight?.message },
  ];

  // Admin stats
  const adminStats = [
    { icon: CalendarDays, label: 'Total Events', value: events.length, iconClass: 'text-primary icon-pulse' },
    { icon: Users, label: 'Active Teams', value: teams.length, iconClass: 'text-accent icon-pulse' },
    { icon: Activity, label: 'Upcoming', value: upcomingCount, iconClass: 'text-success icon-pulse' },
    { icon: TrendingUp, label: 'Categories', value: Object.keys(categoryData).length, iconClass: 'text-accent icon-glow' },
  ];

  const stats = isAdmin ? adminStats : studentStats;

  // Student quick actions
  const studentActions = [
    { to: '/events', label: 'Browse Events', icon: CalendarDays },
    { to: '/calendar', label: 'Calendar', icon: Activity },
    { to: '/my-events', label: 'My Events', icon: Ticket },
    { to: '/teams', label: 'Teams', icon: Users },
  ];

  // Admin quick actions
  const adminActions = [
    { to: '/events', label: 'Manage Events', icon: CalendarDays },
    { to: '/admin', label: 'Admin Panel', icon: Sparkles },
    { to: '/calendar', label: 'Calendar', icon: Activity },
    { to: '/teams', label: 'Teams', icon: Users },
  ];

  const actions = isAdmin ? adminActions : studentActions;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <Navbar />
        <div className="page-container relative">
          <FloatingOrbs />
          <div className="relative z-10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="section-title mb-0">
                  {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {isAdmin
                    ? 'Manage your campus events and analytics'
                    : `Welcome back, ${user?.displayName || 'Student'}!`}
                </p>
              </div>
              <Link to="/notifications" className="relative rounded-lg p-2 text-muted-foreground hover:text-foreground transition-colors md:hidden">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[0,1,2,3].map(i => <StatSkeleton key={i} />)}
              </div>
            ) : (
              <>
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {stats.map((s, i) => (
                    <ScrollReveal key={s.label} delay={i * 0.1}>
                      <TiltCard className="glass-card-glow rounded-2xl p-6 h-full">
                        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                          <s.icon className={`h-5 w-5 ${s.iconClass}`} />
                          <span className="text-sm font-medium">{s.label}</span>
                        </div>
                        <p className="text-3xl font-bold text-foreground">{s.value}</p>
                        {'sub' in s && s.sub && <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>}
                      </TiltCard>
                    </ScrollReveal>
                  ))}
                </div>

                {/* Quick Actions */}
                <ScrollReveal>
                  <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {actions.map((action) => (
                      <Link key={action.to} to={action.to} className="glass-card rounded-xl p-4 text-center transition-all hover:-translate-y-1 hover:bg-muted/20">
                        <action.icon className="mx-auto mb-2 h-5 w-5 text-primary" />
                        <span className="text-xs font-medium text-foreground">{action.label}</span>
                      </Link>
                    ))}
                  </div>
                </ScrollReveal>

                {/* Upcoming Events for Students */}
                {isStudent && upcoming.length > 0 && (
                  <ScrollReveal>
                    <div className="mb-8">
                      <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-foreground">Upcoming Events</h2>
                        <Link to="/events" className="text-sm text-primary hover:underline">View all</Link>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {upcoming.slice(0, 6).map((ev, i) => (
                          <ScrollReveal key={ev.id} delay={i * 0.08}>
                            <EventCard event={ev} />
                          </ScrollReveal>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                )}

                {/* Category chart for admin */}
                {isAdmin && pieData.length > 0 && (
                  <ScrollReveal>
                    <div className="glass-card-glow rounded-2xl p-6">
                      <h2 className="mb-4 text-lg font-semibold text-foreground">Events by Category</h2>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                              {pieData.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ background: 'hsl(222 40% 10%)', border: '1px solid hsl(222 20% 18%)', borderRadius: '0.5rem', color: 'hsl(210 20% 92%)' }} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </ScrollReveal>
                )}

                {events.length === 0 && teams.length === 0 && (
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <p className="text-muted-foreground">No data yet. Configure your Firebase project and add events and teams to get started.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default Dashboard;
