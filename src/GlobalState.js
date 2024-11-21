let checkouts = [];
let materials = [];
let patrons = [];
let lateFees = [];
let isLoading = true;
let error = null;

// Getter for Global State
export const getGlobalState = () => ({
  checkouts,
  materials,
  patrons,
  lateFees,
  isLoading,
  error,
});

// Fetch and Set Global State
export const fetchGlobalState = async () => {
  isLoading = true;
  error = null;

  try {
    const [checkoutsData, materialsData, patronsData, lateFeeData] = await Promise.all([
      fetch("http://localhost:5167/api/checkouts/frontend").then((res) => res.json()),
      fetch("http://localhost:5167/api/materials/frontend").then((res) => res.json()),
      fetch("http://localhost:5167/api/patrons/frontend").then((res) => res.json()),
      fetch("http://localhost:5167/api/patrons/lateFees").then((res) => res.json())
    ]);

    checkouts = checkoutsData;
    materials = materialsData;
    patrons = patronsData;
    lateFees = lateFeeData
  } catch (err) {
    console.error("Failed to fetch global state:", err);
    error = err;
  } finally {
    isLoading = false;
  }
};
