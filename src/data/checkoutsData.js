export const getOverdueCheckouts = async () => {
    const response = await fetch("http://localhost:5167/api/checkouts/overdue");
    const data = await response.json();
    console.log("Overdue Checkouts Data:", data);
    return data;
  };
  
  export const getOverdueCheckoutsAlt = async () => {
    const response = await fetch("http://localhost:5167/api/checkouts/overdue2");
    const data = await response.json();
    console.log("Alternative Overdue Checkouts Data:", data);
    return data;
  };
  
  export const createCheckout = async (checkout) => {
    const response = await fetch("http://localhost:5167/api/checkouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(checkout),
    });
    const data = await response.json();
    console.log("Created Checkout Data:", data);
    return data;
  };
  
  export const returnCheckout = async (id) => {
    const response = await fetch(`http://localhost:5167/api/checkouts/${id}/return`, {
      method: "PUT",
    });
    const data = await response.json();
    console.log("Returned Checkout Data:", data);
    return data;
  };
  