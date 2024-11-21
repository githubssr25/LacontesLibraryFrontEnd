export const getMaterials = async () => {
  const response = await fetch("http://localhost:5167/api/materials");
  const data = await response.json();
  console.log("Materials Data:", data);
  return data;
};

export const getMaterialByQuery = async (materialTypeId, genreId) => {
  const url = `http://localhost:5167/api/materialsQueryParams?materialTypeId=${materialTypeId}&genreId=${genreId}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log("Materials Query Data:", data);
  return data;
};

export const getMaterialDetails = async (id) => {
  const response = await fetch(`http://localhost:5167/api/materials/special/${id}`);
  const data = await response.json();
  console.log("Material Details Data:", data);
  return data;
};

export const createMaterial = async (material) => {
  const response = await fetch("http://localhost:5167/api/materials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(material),
  });
  const data = await response.json();
  console.log("Created Material Data:", data);
  return data;
};

export const removeMaterial = async (id) => {
  const response = await fetch(`http://localhost:5167/api/materials/${id}/remove`, {
    method: "PUT",
  });
  const data = await response.json();
  console.log("Removed Material Data:", data);
  return data;
};

export const getAvailableMaterials = async () => {
  const response = await fetch("http://localhost:5167/api/materials/available");
  const data = await response.json();
  console.log("Available Materials Data:", data);
  return data;
};
