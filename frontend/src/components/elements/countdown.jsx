import React, { useState, useEffect } from 'react';

const Countdown = () => {
  // Calculate a target date 15 days from now
  const targetDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

  const calculateTimeLeft = () => {
    const now = new Date();
    const diff = targetDate - now;

    return {
      days:    Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
      hours:   Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center p-4">
      <div className="grid grid-flow-col gap-4 text-center auto-cols-max">
        {[
          { label: 'days',    value: timeLeft.days    },
          { label: 'hours',   value: timeLeft.hours   },
          { label: 'min',     value: timeLeft.minutes },
          { label: 'sec',     value: timeLeft.seconds },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center p-2 bg-gray-900 border-2 border-gray-700 rounded-box shadow-lg">
            <span className="countdown font-mono text-5xl">
              <span style={{ '--value': value }} />
            </span>
            <span className="mt-1 text-sm uppercase">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;