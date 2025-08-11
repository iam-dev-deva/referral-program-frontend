import React, { useEffect, useState } from "react";

const ReferralRewards = ({ points }) => {
  const [displayPoints, setDisplayPoints] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = points || 0;
    if (start === end) return;

    const duration = 1000; 
    const incrementTime = 20;
    const steps = duration / incrementTime;
    const increment = end / steps;

    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setDisplayPoints(end);
        clearInterval(timer);
      } else {
        setDisplayPoints(Math.floor(current));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [points]);

  return (
    <div className="referral-card stat-card">
      <h3>Reward Points Earned</h3>
      <p className="stat-value">{displayPoints} pts</p>
    </div>
  );
};

export default ReferralRewards;
