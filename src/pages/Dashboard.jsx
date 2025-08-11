import React, { useEffect, useState } from "react";
import { getMyReferral } from "../services/ApiService";
import RefCount from "../components/RefCount/RefCount";
import ReferralRewards from "../components/ReferralRewards/ReferralRewards";
import { ToastContainer, toast } from "react-toastify";
import './CSS/Style.css'

const Dashboard = () => {
  const [referralCode, setReferralCode] = useState("");
  const [referralCount, setReferralCount] = useState(0);
  const [rewardPoints, setRewardPoints] = useState(0);

  const shareLink = `${window.location.origin}/register?ref=${referralCode || "..."}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "light",
    });
  };

  useEffect(() => {
    const fetchReferralData = async () => {
      try {

        const data = await getMyReferral();

        setReferralCode(data.referralCode || "");
        setReferralCount(data.referrals.length || 0);

        setRewardPoints(data.rewardPoints || 0);
      } catch (err) {
        console.error("Failed to fetch referral data", err);
      }
    };

    fetchReferralData();
  }, []);



  return (
    <div>
      <div className="dashboard-container">
        <div className="dashboard-title">Referral Dashboard</div>
        <div className="card-grid">
          <div className="referral-card">
            <h3>Your Referral Code</h3>
            <p className="ref-code">{referralCode || "..."}</p>
            <p className="share-link-tag">
              Share Link: <span className="share-link">{shareLink}</span>
            </p>
            <button onClick={copyToClipboard} className="btn success-btn">
              Copy Link
            </button>
          </div>
          <RefCount count={referralCount} />
          <ReferralRewards points={rewardPoints} />
        </div>
      </div>
      <ToastContainer />

    </div>
  );
};

export default Dashboard;