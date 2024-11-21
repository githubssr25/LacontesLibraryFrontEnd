import { useEffect, useState } from "react";
import { getGlobalState, fetchGlobalState } from "../../GlobalState";
import { deactivatePatron } from "../../data/patronsData";

const ViewAllPatrons = () => {
  const [localPatrons, setLocalPatrons] = useState([]);
  const [lateFeesForPatrons, setLateFeesForPatrons] = useState([]);

  // Fetch patrons and late fees on component mount
  useEffect(() => {
    const fetchData = async () => {
      await fetchGlobalState();
      const { patrons, lateFees } = getGlobalState();
      setLocalPatrons(patrons);
      setLateFeesForPatrons(lateFees);
    };

    fetchData();
  }, []);

  // Handle deactivation of a patron
  const handleDeactivate = async (id) => {
    try {
      // Call the centralized API method
      const updatedPatron = await deactivatePatron(id);
      console.log("Deactivated Patron Data:", updatedPatron);

      // Refresh the global state and update local state
      await fetchGlobalState();
      const { patrons } = getGlobalState();
      setLocalPatrons(patrons);
    } catch (error) {
      console.error("Error deactivating patron:", error);
    }
  };

  return (
    <>
      <div>
        <h2>View All Patrons</h2>
        {localPatrons.map((patron) => (
          <div key={patron.patronId}>
            <p>Patron First Name: {patron.patronDTO.firstName}</p>
            <p>Last Name: {patron.patronDTO.lastName}</p>
            <p>Address: {patron.patronDTO.address}</p>
            <p>Email: {patron.patronDTO.email}</p>
            <p>Are they still active: {patron.patronDTO.isActive ? "yes" : "no"}</p>
            {/* Show "Deactivate" button only if patron is active */}
            {patron.patronDTO.isActive && (
              <button onClick={() => handleDeactivate(patron.patronId)}>
                Deactivate
              </button>
            )}
          </div>
        ))}
      </div>
      <section>
        <article>
          <h2> Patrons With Late Fees </h2>
          {lateFeesForPatrons.map((lateFeePatron, index) => (
            <div key={index}>
              <p>First Name: {lateFeePatron.firstName}</p>
              <p>Last Name: {lateFeePatron.lastName}</p>
              <p>Late Fee Balance: ${lateFeePatron.balance}</p>
              <p>
                Are they still active: {lateFeePatron.isActive ? "yes" : "no"}
              </p>
            </div>
          ))}
        </article>
      </section>
    </>
  );
};

export default ViewAllPatrons;
