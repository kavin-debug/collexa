import { Link } from 'react-router-dom';
import { GraduationCap, CalendarDays, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { PageTransition } from '@/components/motion/PageTransition';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { TiltCard } from '@/components/motion/TiltCard';
import { FloatingOrbs } from '@/components/motion/FloatingOrbs';
import { motion } from 'framer-motion';

const features = [
  {
    icon: CalendarDays,
    title: 'Browse Events',
    desc: 'Find academic, cultural, sports, and tech events happening across your campus.',
    color: 'text-primary bg-primary/10',
  },
  {
    icon: Users,
    title: 'Join Teams',
    desc: 'Connect with peers by joining student teams, clubs, and interest groups.',
    color: 'text-success bg-success/10',
  },
  {
    icon: GraduationCap,
    title: 'Stay Connected',
    desc: 'Your personal dashboard keeps you up to date with everything that matters.',
    color: 'text-accent bg-accent/10',
  },
];

const Index = () => {
  const { user } = useAuth();

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        {/* Hero */}
        <div className="animated-mesh relative flex flex-col items-center justify-center overflow-hidden px-6 py-32 text-center sm:py-40">
          <FloatingOrbs />

          <div className="relative z-10 mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Your campus, connected
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-7xl"
            >
              Everything your campus
              <br />
              <span className="gradient-text">needs in one place</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              Discover events, join teams, and connect with your university community. Built for the modern student experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex items-center justify-center gap-4"
            >
              {user ? (
                <Button asChild size="lg" className="btn-glow h-12 rounded-xl px-8 text-base font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/30">
                  <Link to="/dashboard">Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="btn-glow h-12 rounded-xl px-8 text-base font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/30">
                    <Link to="/login">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-border px-8 text-base font-semibold transition-all duration-300 hover:scale-[1.03] hover:bg-secondary hover:border-primary/30">
                    <Link to="/register">Create Account</Link>
                  </Button>
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal className="mb-16 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Features</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Everything you need to stay engaged
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {features.map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 0.1}>
                  <TiltCard className="stat-card group cursor-default h-full">
                    <div className={`feature-icon mb-5 ${f.color} transition-transform duration-300 group-hover:scale-110`}>
                      <f.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-foreground">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-border bg-secondary/30 py-20">
          <ScrollReveal className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground">Ready to get started?</h2>
            <p className="mb-8 text-muted-foreground">Join thousands of students already using Collexa to stay connected.</p>
            <Button asChild size="lg" className="btn-glow h-12 rounded-xl px-10 text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-[1.03]">
              <Link to={user ? '/dashboard' : '/register'}>
                {user ? 'Open Dashboard' : 'Sign Up Free'} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
