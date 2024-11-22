import React, { useState, useEffect} from "react";
import { createCheckout } from "../../data/checkoutsData"; // Assuming API methods are in `data/patronsData.js`
import { fetchGlobalState, getGlobalState } from "../../GlobalState"; // Access global state functions
import { useLocation, useParams } from "react-router-dom";

 const CreateCheckout = () => {


    const [allPatrons, setAllPatrons] = useState([]);
    const [allPatronIDs, setAllPatronIDs] = useState([]);
    const [selectedPatronId, setSelectedPatronId] = useState(null);
    const [allMaterials, setAllMaterials] = useState([]);
    const [specificMaterialInfo, setSpecificMaterialInfo] = useState(null);
    const location = useLocation();
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [createdCheckoutDetails, setCreatedCheckoutDetails] = useState(null);

    const { materialId } = useParams(); // Retrieve materialId from the route parameter

    useEffect(() => {
      console.log("Material ID for checkout:", materialId);
      // Fetch material details or initialize state for the checkout process
    }, [materialId]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchGlobalState();
            const {patrons, materials} = getGlobalState();
            setAllPatrons(patrons);
            const patronIds = patrons.map( eachPatron => eachPatron.patronId);
            const ourMaterial = materials.find(eachMaterial => eachMaterial.materialId === materialId);
            setAllPatronIDs(patronIds);
            setAllMaterials(materials);
            setSpecificMaterialInfo(ourMaterial);
        };
        fetchData();
    }, [location]);

    const handlePatronChange = (event) => {
        setSelectedPatronId(event.target.value); // Set the selected patron ID
      };
    
      const onSubmitForm = async (event) => {
        event.preventDefault();
        const form = event.target; // The form element
        const patronId = form.elements.patronId.value; // The selected patron ID
    
        const createCheckoutDTO = {
          MaterialId: parseInt(materialId),
          PatronId: parseInt(patronId),
        };
    
        const createdCheckout = await createCheckout(createCheckoutDTO);
        if (createdCheckout) {
           console.log("what is createdCheckout response structure", createdCheckout);
          setCreatedCheckoutDetails(createdCheckout);
          setSuccessfulCreation(true);
        }
      };
    
      return (
        <div>
          {!successfulCreation ? (
            <>
              <form onSubmit={onSubmitForm}>
                <label> Select the User you are Submitting For </label>
                <select
                  name="patronId"
                  value={selectedPatronId || ""}
                  onChange={handlePatronChange}
                  required
                >
                  <option value="" disabled>
                    Select Which Patron You Are
                  </option>
                  {allPatrons.map((patron) => (
                    <option key={patron.patronId} value={patron.patronId}>
                      Given PatronID: {patron.patronId} - Name: {patron.patronDTO.firstName} {patron.patronDTO.lastName}
                    </option>
                  ))}
                </select>
                <button type="submit">Checkout The Material For Your User</button>
              </form>
            </>
          ) : (
            <div>
              <h2>Checkout Successful!</h2>
              <p>
                <strong>Checkout Date:</strong> {createdCheckoutDetails.checkoutDTO?.checkoutDate || "Unknown"}
              </p>
              <p>
                <strong>Material Name:</strong> {createdCheckoutDetails.materialDTO?.materialName || "Unknown"}
              </p>
              <p>
                <strong>Material Genre:</strong> {createdCheckoutDetails.materialDTO?.genreDTO?.name || "Unknown"}
              </p>
              <p>
                <strong>Checkout Days:</strong> {createdCheckoutDetails.materialDTO?.materialTypeDTO?.checkoutDays || "N/A"}
              </p>
              <p>
                <strong>Patron Name:</strong>{" "}
                {createdCheckoutDetails.checkoutDTO?.patronDTO?.firstName || "Unknown"}{" "}
                {createdCheckoutDetails.checkoutDTO?.patronDTO?.lastName || ""}
              </p>
            </div>
          )}
        </div>
      );

    }
      
    
    export default CreateCheckout;