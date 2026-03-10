import { Link, useLocation } from 'react-router-dom';
import { Home, CalendarDays, Ticket, Settings, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export const BottomNav = () => {
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  if (!user) return null;

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Home' },
    { to: '/events', icon: CalendarDays, label: 'Events' },
    { to: '/my-events', icon: Ticket, label: 'My Events' },
    ...(isAdmin ? [{ to: '/admin', icon: LayoutDashboard, label: 'Admin' }] : []),
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/80 backdrop-blur-2xl md:hidden">
      <div className="flex items-center justify-around px-2 py-1.5">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-colors',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {active && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute inset-0 rounded-xl bg-primary/10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <item.icon className="relative z-10 h-5 w-5" />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
