import { useEffect, useRef } from 'react';

const useIdleTimer = (onIdle, timeout = 60000) => { // 10 minutes default timeout
  const timeoutRef = useRef(null);
  const lastActivityRef = useRef(Date.now());

  const resetTimer = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(onIdle, timeout);
   
  };

  const handleActivity = () => {
    lastActivityRef.current = Date.now();
    resetTimer();
  };

  useEffect(() => {
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];

    activityEvents.forEach(event => 
      window.addEventListener(event, handleActivity)
    );
   
    resetTimer();

    return () => {
      clearTimeout(timeoutRef.current);
      activityEvents.forEach(event => 
        window.removeEventListener(event, handleActivity)
      );
    };
  }, [timeout, onIdle]);

  return lastActivityRef.current;
};

export default useIdleTimer;
