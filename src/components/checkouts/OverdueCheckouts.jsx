import React, { useState, useEffect } from "react";
import { getOverdueCheckouts } from "../../data/checkoutsData"; // Assuming this is the correct path

const OverdueCheckouts = () => {
  const [overdueCheckouts, setOverdueCheckouts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOverdueCheckouts();
      setOverdueCheckouts(data); // Set the overdue checkouts data to state
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Overdue Checkouts</h2>
      {overdueCheckouts.length > 0 ? (
        <ul>
          {overdueCheckouts.map((checkout) => (
            <li key={checkout.id}>
              <p>
                <strong>Material Name:</strong> {checkout.materialDTO.materialName || "Unknown"}
              </p>
              <p>
                <strong>Patron:</strong> {checkout.patronDTO.firstName}{" "}
                {checkout.patronDTO.lastName || "Unknown"}
              </p>
              <p>
                <strong>Checkout Date:</strong>{" "}
                {new Date(checkout.checkoutDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Days Overdue:</strong> {checkout.daysOverdue}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No overdue checkouts at the moment.</p>
      )}
    </div>
  );
};

export default OverdueCheckouts;
