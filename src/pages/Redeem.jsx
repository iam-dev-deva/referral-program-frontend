import React, { useState, useEffect } from "react";
import { redeemReferral, getMyReferral } from "../services/ApiService"; 
import { toast, ToastContainer } from "react-toastify";

const Redeem = () => {
  const [gpayNumber, setGpayNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const data = await getMyReferral();
        setCurrentPoints(data.rewardPoints || 0);
      } catch (error) {
        toast.error("Failed to fetch current points.");
      }
    };

    fetchPoints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gpayNumber) {
      toast.error("Please enter your GPay number.");
      return;
    }

    setLoading(true);

    try {
      const response = await redeemReferral({ gpayNumber });

      toast.success(response.message || "Redeem successful!");
      setGpayNumber(""); 

      const data = await getMyReferral();
      setCurrentPoints(data.rewardPoints || 0);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to redeem points. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Redeem Points</h2>

      <p>
        <strong>Current Points:</strong> {currentPoints}
      </p>

      <form onSubmit={handleSubmit} className="form_main">
        <label htmlFor="gpayNumber">Enter UPI id</label>
        <input
          type="text"
          id="gpayNumber"
          name="gpayNumber"
          placeholder="Enter your UPI Id here"
          value={gpayNumber}
          onChange={(e) => setGpayNumber(e.target.value)}
          className="inputField"
          required
        />
        <button type="submit" disabled={loading} id="button">
          {loading ? "Processing..." : "Redeem"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Redeem;
