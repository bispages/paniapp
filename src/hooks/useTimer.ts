import { useEffect, useRef, useState } from 'react';

// Hook Timer.
const useTimer = (delay: number) => {
  const timer = useRef(0);
  const [days, setDays] = useState<number>();
  const [hours, setHours] = useState<number>();
  const [minutes, setMinutes] = useState<number>();
  const [seconds, setSeconds] = useState<number>();

  const getTime = () => {
    delay = delay - 1;
    setDays(Math.floor(delay / (3600 * 24)));
    setHours(Math.floor((delay % (3600 * 24)) / 3600));
    setMinutes(Math.floor((delay % 3600) / 60));
    setSeconds(Math.floor(delay % 60));
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      if (delay > 0) getTime();
      else clearInterval(timer.current);
    }, 1000);
    return () => clearInterval(timer.current);
  }, []);

  return { days, hours, minutes, seconds };
};

export default useTimer;
