export const getMaterials = async () => {
  const response = await fetch("http://localhost:5167/api/materials");
  const data = await response.json();
  console.log("Materials Data:", data);
  return data;
};

export const getMaterialByQuery = async (materialTypeId, genreId) => {
  // Ensure materialTypeId and genreId are numbers
  const materialTypeIdNum = materialTypeId ? parseInt(materialTypeId, 10) : null;
  const genreIdNum = genreId ? parseInt(genreId, 10) : null;

  // Build the URL dynamically
  let url = "http://localhost:5167/api/materialsQueryParams";

  // Add query parameters only if they are not null
  if (materialTypeIdNum !== null || genreIdNum !== null) {
    url += "?";
    if (materialTypeIdNum !== null) {
      url += `materialTypeId=${materialTypeIdNum}`;
    }
    if (genreIdNum !== null) {
      url += `${materialTypeIdNum !== null ? "&" : ""}genreId=${genreIdNum}`;
    }
  }

  console.log("Generated URL:", url); // Debugging

  // Fetch the materials
  const response = await fetch(url);
  if (!response.ok) {
    console.error("Failed to fetch materials:", response.status, response.statusText);
    throw new Error("Failed to fetch materials");
  }

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
