import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { getMaterials } from "../../data/materialsData";
import {getGlobalState, fetchGlobalState} from "../../GlobalState";

const ViewAllPatrons = ()  => {
  const [localPatrons, setLocalPatrons] = useState([]);
  const [lateFeesForPatrons, setLateFeesForPatrons] = useState([]);

  //add useEffect here to get the ticket details from the API
  
  useEffect(() => {
    const fetchData = async () => {
      await fetchGlobalState();
      const {patrons, lateFees} = getGlobalState();
      console.log("value of lateFees from globalState", lateFees);
      setLocalPatrons(patrons);
      setLateFeesForPatrons(lateFees);
    };

  fetchData();
  }, []);

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
        </div>
      ))}
    </div>
    <section>
      <article>
        <h2> Patrons With Late Fees </h2>
        {lateFeesForPatrons.map((lateFeePatron, index) => (
          <div key={index} >
      <p>First Name: {lateFeePatron.firstName}</p>
      <p>Last Name: {lateFeePatron.lastName}</p>
      <p>Late Fee Balance: ${lateFeePatron.balance}</p>
      <p> Are they still active: ${lateFeePatron.isActive ? "yes" : "no"}  </p>
          </div>
        ))
        }

      </article>
    </section>
    </>
  );
};



export default ViewAllPatrons;