import React, { useState, useEffect } from "react";
import { updatePatron } from "../../data/patronsData"; // Assuming API methods are in `data/patronsData.js`
import { fetchGlobalState, getGlobalState } from "../../GlobalState"; // Access global state functions

const EditPatronInfo = () => {
  const [allPatrons, setAllPatrons] = useState([]); // State for all patrons
  const [selectedPatronId, setSelectedPatronId] = useState(null); // Selected patron ID
  const [address, setAddress] = useState("");
  
  const [email, setEmail] = useState("");
  const [updatedPatron, setUpdatedPatron] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch all patrons on component mount
  useEffect(() => {
    const fetchData = async () => {
      await fetchGlobalState();
      const { patrons } = getGlobalState();
      setAllPatrons(patrons);
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!selectedPatronId) {
      setMessage("Please select a patron to update.");
      return;
    }

    // Find the selected patron
    const selectedPatron = allPatrons.find((p) => p.patronId === selectedPatronId);

    if (!selectedPatron) {
      setMessage("Patron not found.");
      return;
    }

    // Create the updated PatronDTO object
    const updatedPatronData = {
      firstName: selectedPatron.patronDTO.firstName,
      lastName: selectedPatron.patronDTO.lastName,
      isActive: selectedPatron.patronDTO.isActive,
      address: address || selectedPatron.patronDTO.address, // Use updated address or existing one
      email: email || selectedPatron.patronDTO.email, // Use updated email or existing one
    };

    try {
      // Call the API to update patron info
      await updatePatron(selectedPatronId, updatedPatronData);

      // Fetch the updated global state
      await fetchGlobalState();

         // Retrieve the specific updated patron from the global state
    const { patrons } = getGlobalState();
    const updatedPatron = patrons.find((p) => p.patronId === selectedPatronId);

    // Set the updated patron for display or verification
    setUpdatedPatron(updatedPatron);

      setMessage("Patron info updated successfully!");
    } catch (error) {
      console.error("Error updating patron info:", error);
      setMessage("Failed to update patron info. Please try again.");
    }
  };

  return (
    <div>
      <h2>Edit Patron Info</h2>
      {/* Dropdown to select a patron */}
      <label>
        Select Patron:
        <select
          value={selectedPatronId || ""}
          onChange={(e) => setSelectedPatronId(parseInt(e.target.value))}
        >
          <option value="" disabled>
            Select a patron
          </option>
          {allPatrons.map((patron) => {
            // console.log("Patron:", patron);
            return (
            <option key={patron.patronId} value={patron.patronId}>
              {patron.patronDTO.firstName} {patron.patronDTO.lastName}
            </option>
            );
        })}
        </select>
      </label>
      <br />
      <form>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleSubmit}>
          Update Info
        </button>
      </form>

      {message && <p>{message}</p>}

      {/* Display the updated patron */}
      {updatedPatron && (
        <div>
          <h3>Updated Patron Info</h3>
          <p>First Name: {updatedPatron.patronDTO.firstName}</p>
          <p>Last Name: {updatedPatron.patronDTO.lastName}</p>
          <p>Address: {updatedPatron.patronDTO.address}</p>
          <p>Email: {updatedPatron.patronDTO.email}</p>
          <p>Active: {updatedPatron.patronDTO.isActive ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default EditPatronInfo;
