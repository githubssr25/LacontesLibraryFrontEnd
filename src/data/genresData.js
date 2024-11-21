export const getGenres = async () => {
  const response = await fetch("http://localhost:5167/api/genres");
  const data = await response.json();
  console.log("Genres Data:", data);
  return data;
};
