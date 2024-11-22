let checkouts = [];
let materials = [];
let patrons = [];
let lateFees = [];
let materialsInCirculation = []; // Add this new state for materials in circulation
let isLoading = true;
let error = null;

// Getter for Global State
export const getGlobalState = () => ({
  checkouts,
  materials,
  patrons,
  lateFees,
  materialsInCirculation, // Include this in the global state getter
  isLoading,
  error,
});

// Fetch and Set Global State
export const fetchGlobalState = async () => {
  isLoading = true;
  error = null;

  try {
    const [
      checkoutsData,
      materialsData,
      patronsData,
      lateFeeData,
      materialsInCirculationData
    ] = await Promise.all([
      fetch("http://localhost:5167/api/checkouts/frontend").then((res) =>
        res.json()
      ),
      fetch("http://localhost:5167/api/materials/frontend").then((res) =>
        res.json()
      ),
      fetch("http://localhost:5167/api/patrons/frontend").then((res) =>
        res.json()
      ),
      fetch("http://localhost:5167/api/patrons/lateFees").then((res) =>
        res.json()
      ),
      fetch("http://localhost:5167/api/materials/circulation/frontend").then(
        (res) => res.json()
      ), // Fetch materials in circulation from the new endpoint
    ]);

    checkouts = checkoutsData;
    materials = materialsData;
    patrons = patronsData;
    lateFees = lateFeeData;
    materialsInCirculation = materialsInCirculationData; // Set the materials in circulation
  } catch (err) {
    console.error("Failed to fetch global state:", err);
    error = err;
  } finally {
    isLoading = false;
  }
};
