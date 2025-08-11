const RefCount = ({ count }) => {
  return (
    <div className="referral-card stat-card">
      <h3>Successful Referrals</h3>
      <p className="stat-value">{count || "..."}</p>
    </div>
  );
};

export default RefCount;
