export const getPatronsWithMaterials = async () => {
    const response = await fetch("http://localhost:5167/api/patrons/materials");
    const data = await response.json();
    console.log("Patrons with Materials Data:", data);
    return data;
  };
  
  export const updatePatron = async (id, updatedPatron) => {
    const response = await fetch(`http://localhost:5167/api/patrons/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPatron),
    });
    const data = await response.json();
    console.log("Updated Patron Data:", data);
    return data;
  };
  
  export const deactivatePatron = async (id) => {
    const response = await fetch(`http://localhost:5167/api/patrons/deactivate/${id}`, {
      method: "PUT",
    });
    const data = await response.json();
    console.log("Deactivated Patron Data:", data);
    return data;
  };
  