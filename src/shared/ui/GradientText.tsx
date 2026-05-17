import { cn } from '../lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'prize' | 'accent' | 'title';
}

export const GradientText = ({ 
  children, 
  className, 
  variant = 'prize' 
}: GradientTextProps) => {
  const variants = {
    prize: 'from-yellow-400 via-orange-500 to-red-500',
    accent: 'from-violet-400 via-fuchsia-500 to-purple-600',
    title: 'from-cyan-400 via-blue-500 to-violet-600',
  };

  return (
    <span className={cn(
      'bg-gradient-to-r bg-clip-text text-transparent font-bold',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
