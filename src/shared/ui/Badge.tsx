import { cn } from '../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export const Badge = ({ 
  children, 
  variant = 'default', 
  className 
}: BadgeProps) => {
  const variants = {
    default: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    danger: 'bg-red-500/20 text-red-400 border-red-500/30',
    info: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export const StatusBadge = ({ status }: { status: 'active' | 'finished' | 'draft' }) => {
  const config = {
    active: { label: 'Active', variant: 'success' as const },
    finished: { label: 'Finished', variant: 'default' as const },
    draft: { label: 'Draft', variant: 'warning' as const },
  };

  const { label, variant } = config[status];

  return <Badge variant={variant}>{label}</Badge>;
};
