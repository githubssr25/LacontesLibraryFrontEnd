import React, { useState, useEffect } from "react";
import { updatePatron } from "../../data/patronsData"; // Assuming API methods are in `data/patronsData.js`
import { fetchGlobalState, getGlobalState } from "../../GlobalState"; // Access global state functions
import { useLocation, useNavigate } from "react-router-dom";

const BrowseCheckouts = () => {
  const [availableMaterials, setAvailableMaterials] = useState([]); // State for materials in circulation
  const [allMaterials, setAllMaterials] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetchGlobalState(); // Fetch the updated global state
      const { materials, materialsInCirculation } = getGlobalState(); // Access materials in circulation from global state
      setAllMaterials(materials);
      setAvailableMaterials(materialsInCirculation);
    };

    fetchData();
  }, [location]); // Trigger on route change to ensure data is up to date

  const handleCreateCheckout = (materialId) => {
    navigate(`/createCheckout/${materialId}`);
  }

  return (
    <div className="container">
      <h2>Available Materials</h2>
      <h2> How many total materials in general {allMaterials.length}</h2>
      <h2> How many Available checkouts: {availableMaterials.length}</h2>
      {availableMaterials.length > 0 ? (
        <ul>
          {availableMaterials.map((material) => (
            <>
            <li key={material.materialId}>
              <strong>{material.materialName}</strong> - {material.genre || "No Genre"}
              <br />
              Type: {material.materialType?.name || "Unknown"}
              <br />
              Checkout Days: {material.materialType?.checkoutDays || "N/A"}
            </li>
            <button onClick= {() => handleCreateCheckout(material.materialId)}> Click Here To Checkout This Item</button>
            </>
          ))}
        </ul>
      ) : (
        <p>No materials currently available for checkout.</p>
      )}
    </div>
  );
};

export default BrowseCheckouts;
