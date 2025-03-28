import React, { useEffect, useState } from 'react';
import './Timer.css';

const Timer = ({ initialSeconds, onTimeUp, active = true }) => {
  console.log('Renderizando Timer');
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (!active) return;

    if (seconds <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimeUp, active]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${sec
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className='timer-container'>
      <p className='timer-text'>{formatTime(seconds)}</p>
    </div>
  );
};

export default Timer;
