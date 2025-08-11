import React, { useEffect, useState } from "react";

const RefCount = ({ count }) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = count || 0;
    if (start === end) return;

    const duration = 1000;
    const incrementTime = 20;
    const steps = duration / incrementTime;
    const increment = end / steps;

    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setDisplayCount(end);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(current));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className="referral-card stat-card">
      <h3>Successful Referrals</h3>
      <p className="stat-value">{displayCount}</p>
    </div>
  );
};

export default RefCount;
