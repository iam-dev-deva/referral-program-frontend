const ReferralRewards = ({ points }) => {
  return (
    <div className="referral-card stat-card">
      <h3>Reward Points Earned</h3>
      <p className="stat-value">{points || 0} pts</p>
    </div>
  );
};

export default ReferralRewards;
