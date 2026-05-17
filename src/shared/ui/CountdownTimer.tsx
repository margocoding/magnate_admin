import { useEffect, useState } from 'react';
import { getTimeRemaining } from '../lib/utils';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  endTime: Date;
  onExpire?: () => void;
  large?: boolean;
}

export const CountdownTimer = ({ endTime, onExpire, large = false }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining(endTime);
      setTimeLeft(remaining);
      
      if (remaining.isExpired && onExpire) {
        onExpire();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onExpire]);

  if (timeLeft.isExpired) {
    return (
      <div className="flex items-center gap-2 text-red-400">
        <Clock size={16} />
        <span className="text-sm font-medium">Завершён</span>
      </div>
    );
  }

  const formatUnit = (value: number) => String(value).padStart(2, '0');

  return (
    <div className={`flex items-center gap-3 ${large ? 'scale-150' : ''}`}>
      <Clock size={large ? 24 : 16} className="text-violet-400" />
      <div className={`flex gap-1.5 ${large ? 'text-lg' : 'text-sm'} font-mono`}>
        {timeLeft.days > 0 && (
          <>
            <span className={`px-2 py-1 bg-violet-500/20 rounded-lg text-violet-300 ${large ? 'text-xl' : ''}`}>
              {formatUnit(timeLeft.days)}д
            </span>
          </>
        )}
        <span className={`px-2 py-1 bg-violet-500/20 rounded-lg text-violet-300 ${large ? 'text-xl' : ''}`}>
          {formatUnit(timeLeft.hours)}ч
        </span>
        <span className={`px-2 py-1 bg-violet-500/20 rounded-lg text-violet-300 ${large ? 'text-xl' : ''}`}>
          {formatUnit(timeLeft.minutes)}м
        </span>
        <span className={`px-2 py-1 bg-fuchsia-500/20 rounded-lg text-fuchsia-300 ${large ? 'text-xl' : ''}`}>
          {formatUnit(timeLeft.seconds)}с
        </span>
      </div>
    </div>
  );
};
