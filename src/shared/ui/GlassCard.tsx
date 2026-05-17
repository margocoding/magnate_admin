import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'highlight';
}

export const GlassCard = ({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}: GlassCardProps) => {
  const variants = {
    default: 'bg-black/70 border-white/10',
    accent: 'bg-violet-950/40 border-violet-500/30',
    highlight: 'bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40 border-fuchsia-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative backdrop-blur-xl rounded-3xl border p-6 shadow-2xl',
        'shadow-violet-900/10 hover:shadow-violet-900/20 transition-shadow duration-300',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
