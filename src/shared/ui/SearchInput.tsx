import { Search } from 'lucide-react';
import { cn } from '../lib/utils';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export const SearchInput = ({ 
  className, 
  placeholder = 'Поиск...', 
  ...props 
}: SearchInputProps) => {
  return (
    <div className="relative">
      <Search 
        size={18} 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
      />
      <input
        type="text"
        className={cn(
          'w-full pl-11 pr-4 py-3 rounded-2xl',
          'bg-white/5 border border-white/10',
          'text-white placeholder:text-gray-500',
          'focus:outline-none focus:border-violet-500/50 focus:bg-white/10',
          'transition-all duration-300',
          className
        )}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};
