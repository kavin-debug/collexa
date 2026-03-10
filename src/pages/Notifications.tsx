import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { BottomNav } from '@/components/BottomNav';
import { PageTransition } from '@/components/motion/PageTransition';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Bell, CalendarDays, Megaphone, RefreshCw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Notification } from '@/types';

// Mock notifications for demonstration
const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'Event Reminder', message: 'Tech Workshop starts tomorrow at 10 AM', type: 'reminder', read: false, createdAt: '2026-03-05', eventId: '1' },
  { id: '2', title: 'New Event Added', message: 'Cultural Fest 2026 has been announced — register now!', type: 'announcement', read: false, createdAt: '2026-03-04' },
  { id: '3', title: 'Registration Confirmed', message: 'You are registered for the Sports Meet', type: 'update', read: true, createdAt: '2026-03-03', eventId: '2' },
  { id: '4', title: 'Event Update', message: 'Venue changed for AI Workshop to Hall B', type: 'update', read: true, createdAt: '2026-03-02', eventId: '3' },
  { id: '5', title: 'Reminder', message: 'Academic Seminar is in 2 days', type: 'reminder', read: true, createdAt: '2026-03-01', eventId: '4' },
];

const iconMap = {
  reminder: CalendarDays,
  update: RefreshCw,
  announcement: Megaphone,
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <Navbar />
        <div className="page-container max-w-2xl">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="feature-icon">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <h1 className="section-title mb-0">Notifications</h1>
                <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllRead} className="text-primary hover:text-primary">
                <Check className="mr-1.5 h-4 w-4" /> Mark all read
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {notifications.map((n, i) => {
              const Icon = iconMap[n.type];
              return (
                <ScrollReveal key={n.id} delay={i * 0.06}>
                  <div className={`glass-card rounded-2xl p-4 transition-all hover:-translate-y-0.5 ${!n.read ? 'border-primary/20 bg-primary/[0.03]' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${
                        n.type === 'reminder' ? 'bg-primary/10 text-primary' :
                        n.type === 'announcement' ? 'bg-accent/10 text-accent' :
                        'bg-success/10 text-success'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">{n.title}</p>
                          {!n.read && <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">{n.createdAt}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default Notifications;
