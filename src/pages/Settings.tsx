import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { BottomNav } from '@/components/BottomNav';
import { PageTransition } from '@/components/motion/PageTransition';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings as SettingsIcon, Moon, Sun, Bell, Shield, LogOut, User } from 'lucide-react';

const Settings = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <Navbar />
        <div className="page-container max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="feature-icon">
              <SettingsIcon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="section-title mb-0">Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your preferences</p>
            </div>
          </div>

          {/* Profile Section */}
          <ScrollReveal>
            <div className="glass-card-glow rounded-2xl p-6 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <User className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{user?.displayName || 'User'}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Appearance */}
          <ScrollReveal delay={0.1}>
            <div className="glass-card-glow rounded-2xl p-6 mb-4">
              <h2 className="text-base font-semibold text-foreground mb-4">Appearance</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-accent" />}
                  <div>
                    <Label className="text-sm font-medium">Dark Mode</Label>
                    <p className="text-xs text-muted-foreground">Toggle dark/light theme</p>
                  </div>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </div>
          </ScrollReveal>

          {/* Notifications */}
          <ScrollReveal delay={0.2}>
            <div className="glass-card-glow rounded-2xl p-6 mb-4">
              <h2 className="text-base font-semibold text-foreground mb-4">Notifications</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-primary" />
                  <div>
                    <Label className="text-sm font-medium">Event Reminders</Label>
                    <p className="text-xs text-muted-foreground">Get notified about upcoming events</p>
                  </div>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </div>
          </ScrollReveal>

          {/* Privacy */}
          <ScrollReveal delay={0.3}>
            <div className="glass-card-glow rounded-2xl p-6 mb-4">
              <h2 className="text-base font-semibold text-foreground mb-4">Privacy & Security</h2>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-success" />
                <div>
                  <p className="text-sm font-medium text-foreground">Account secured</p>
                  <p className="text-xs text-muted-foreground">Your data is encrypted and secure</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Logout */}
          <ScrollReveal delay={0.4}>
            <Button
              variant="destructive"
              className="w-full transition-all hover:scale-[1.01]"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </ScrollReveal>
        </div>
        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default Settings;
