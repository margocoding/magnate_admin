import { cn } from '../lib/utils';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table = ({ children, className }: TableProps) => (
  <div className="overflow-x-auto">
    <table className={cn('w-full', className)}>{children}</table>
  </div>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead>
    <tr className="border-b border-white/10">
      {children}
    </tr>
  </thead>
);

export const TableRow = ({ 
  children, 
  hoverable = true,
  className 
}: { 
  children: React.ReactNode; 
  hoverable?: boolean;
  className?: string;
}) => (
  <tr className={cn(
    'border-b border-white/5 last:border-0',
    hoverable && 'hover:bg-white/5 transition-colors',
    className
  )}>
    {children}
  </tr>
);

export const TableCell = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => (
  <td className={cn('px-4 py-3 text-sm', className)}>
    {children}
  </td>
);

export const TableHead = ({ 
  children, 
  className 
}: { 
  children?: React.ReactNode; 
  className?: string;
}) => (
  <th className={cn(
    'px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider',
    className
  )}>
    {children}
  </th>
);
