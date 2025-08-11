import React from "react";
import PropTypes from "prop-types";
import "./ReferralsList.css";

const ReferralsList = ({ referrals }) => {
  if (!referrals || referrals.length === 0) {
    return <p>No referrals yet.</p>;
  }

  return (
    <div className="referrals-list-container">
      <h3>Referred Users</h3>
      <div className="table-responsive">
        <table className="referrals-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Joined On</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral, index) => (
              <tr key={referral.id || index}>
                <td>{index + 1}</td>
                <td>{referral.name || "-"}</td>
                <td>{referral.email || "-"}</td>
                <td>{new Date(referral.createdAt).toLocaleDateString() || "-"}</td>
                <td>{referral.isDeleted ? "Inactive" : "Active"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ReferralsList.propTypes = {
  referrals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      createdAt: PropTypes.string,
      status: PropTypes.string,
    })
  ),
};

export default ReferralsList;
