import { motion } from 'framer-motion';

const orbs = [
  { size: 320, x: '15%', y: '-5%', color: 'var(--glow-primary)', delay: 0, duration: 18 },
  { size: 260, x: '70%', y: '10%', color: 'var(--glow-secondary)', delay: 3, duration: 22 },
  { size: 200, x: '45%', y: '60%', color: 'var(--glow-primary)', delay: 6, duration: 20 },
];

export const FloatingOrbs = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {orbs.map((o, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: o.size,
          height: o.size,
          left: o.x,
          top: o.y,
          background: `hsl(${o.color})`,
          filter: 'blur(100px)',
          opacity: 0.15,
        }}
        animate={{
          y: [0, -30, 0, 20, 0],
          x: [0, 15, -10, 0],
          scale: [1, 1.05, 0.97, 1],
        }}
        transition={{
          duration: o.duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: o.delay,
        }}
      />
    ))}
  </div>
);
