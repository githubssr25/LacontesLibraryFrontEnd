

import { useEffect, useState } from "react";
import { getGlobalState, fetchGlobalState } from "../../GlobalState";
import { deactivatePatron } from "../../data/patronsData";
import { useLocation } from "react-router-dom";
import { returnCheckout } from "../../data/checkoutsData";

const ViewCheckouts = () => {
    
    const location = useLocation();
    //this is so everytime we go back to this page later on the dep array will re run 
    //otherwise empty dep array only runs upon mounting not if you leave this page and then come back later
    // thiat is why hence we have useLocation() 
    const [localCheckouts, setLocalCheckouts] = useState([]);
    const [overdueCheckouts, setOverdueCheckouts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          await fetchGlobalState();
          const { checkouts } = getGlobalState();
          console.log("What is value of checkouts", checkouts);
          setLocalCheckouts(checkouts);
        };
    
        fetchData();
      }, [location]);

const handleReturnCheckout = async (checkoutId) => {

    console.log("valueof our checkout before calling returnCheckout", localCheckouts);
    const returnedCheckout = await returnCheckout(checkoutId);
    console.log("the checkout we get back", returnedCheckout);

    const {checkouts} = getGlobalState();

    const updatedCheckoutState = checkouts.find((eachCheckout) => eachCheckout.checkoutId === checkoutId);
    if (updatedCheckoutState) {
        updatedCheckoutState.returnDate = null; // Set the returnDate to null
        console.log("Updated Checkout State:", updatedCheckoutState);
    }
    const updatedCheckouts = checkouts.map((eachCheckout) => {
       return eachCheckout.checkoutId === checkoutId
        ? {...eachCheckout, returnDate: null}
        : eachCheckout
});
    console.log("value of checkouts after we update globalState", updatedCheckouts);
    setLocalCheckouts(updatedCheckouts);
 
};


return (
    <div>
        <h2> View All Checkouts </h2>
        {localCheckouts.map((checkout) => (
          <div key={checkout.checkoutId}>
            <p>Checkout Date: {checkout.checkoutDate.split("T")[0]}</p>
            <p>Return Date: {checkout.returnDate}</p>
            <p>Material: {checkout.material.materialName}</p>
            <p>Patron: {checkout.patron.firstName} {checkout.patron.lastName}</p>
            <p>Checkout Days {checkout.material.materialType.checkoutDays} </p>
            <p> Currently Checked out? {checkout.returnDate != null ? "Yes" : "No"} </p>
            {checkout.returnDate != null && (
                <button onClick={() => handleReturnCheckout(checkout.checkoutId)}> Click To Return Checkout </button>
            )

            }
        </div>
       ))}
    </div>
)






}
export default ViewCheckouts