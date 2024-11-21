export const getMaterialTypes = async () => {
  const response = await fetch("http://localhost:5167/api/materialtypes");
  const data = await response.json();
  console.log("Material Types Data:", data);
  return data;
};
