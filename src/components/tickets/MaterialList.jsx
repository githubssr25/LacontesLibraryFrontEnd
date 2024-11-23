import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { removeMaterial, getMaterialByQuery } from "../../data/materialsData";
import { Link } from "react-router-dom";
import { getGlobalState, fetchGlobalState } from "../../GlobalState";
import { useLocation } from "react-router-dom";
import {getMaterialTypes} from "../../data/materialTypesData"
import {getGenres} from "../../data/genresData"

export default function MaterialList() {
  const [circulatingMaterials, setCirculatingMaterials] = useState([]); // Only keep circulating materials state
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [allGenres, setGenres] = useState([]);
  const [allMaterialTypes, setAllMaterialTypes] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(""); // State for selected Genre
  const [selectedMaterialType, setSelectedMaterialType] = useState(""); // State for selected Material Type
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      await fetchGlobalState();
      const { materialsInCirculation } = getGlobalState(); // Fetch only circulating materials
      setCirculatingMaterials(materialsInCirculation); // Set circulating materials
      setFilteredMaterials(materialsInCirculation);
    };

    fetchData();
  }, [location]);

  // Fetch Material Types and Genres
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const fetchedMaterialTypes = await getMaterialTypes();
        const fetchedGenres = await getGenres();
        console.log("what is structure of fetchedMaterialTypes and fetchedGenres", fetchedMaterialTypes, fetchedGenres);
        setAllMaterialTypes(fetchedMaterialTypes);
        setGenres(fetchedGenres);
      } catch (error) {
        console.error("Error fetching Material Types or Genres:", error);
      }
    };

    fetchFilters();
  }, []);

  useEffect( () => {
    const getFilteredMaterials = async () => {
    if(!selectedGenre && !selectedMaterialType){
      setFilteredMaterials(circulatingMaterials);
      return; // Stop further execution if no filters are selected
      //THIS WAY REST OF THIS WONT RUN 
    }
    const ourFilteredState = await getMaterialByQuery(selectedGenre, selectedMaterialType);
    console.log("our filteredState post getMaterialsByQuery", ourFilteredState);
    if(ourFilteredState != null){
      setFilteredMaterials(ourFilteredState);
    }
  }
  getFilteredMaterials();
  }, [selectedGenre, selectedMaterialType, circulatingMaterials]);





  const handleRemove = async (materialId) => {
    const removedMaterial = await removeMaterial(materialId);
    console.log("This is the material we removed:", removedMaterial);

    // Re-fetch the global state and update circulating materials
    await fetchGlobalState();
    const { materialsInCirculation } = getGlobalState();
    console.log(
      "Materials in circulation after removing and re-fetching:",
      materialsInCirculation
    );
    setCirculatingMaterials(materialsInCirculation);

     // Reapply the current filters to maintain consistency
  const filtered = materialsInCirculation.filter((material) =>
    (!selectedMaterialType || material.materialType?.id === Number(selectedMaterialType)) &&
    (!selectedGenre || material.genre?.id === Number(selectedGenre))
  );
  setFilteredMaterials(filtered);
  };

  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>Materials</h4>
        <Link to="/materials/create">Add</Link>
      </div>

      <div className="filters">
        <h1> Filter By </h1>

        <label htmlFor="genreFilter"> Genre </label>
        <select
        id ="genreFilter"
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="form-select"
        >
        <option value=""> All Genres </option>
        {allGenres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))};
        </select>

           {/* Material Type Filter */}
           <label htmlFor="materialTypeFilter">Material Type:</label>
        <select
          id="materialTypeFilter"
          value={selectedMaterialType}
          onChange={(e) => setSelectedMaterialType(e.target.value)}
          className="form-select"
        >
          <option value="">All Material Types</option>
          {allMaterialTypes.map((materialType) => (
            <option key={materialType.id} value={materialType.id}>
              {materialType.name}
            </option>
          ))}
        </select>
      </div>
    
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Type</th>
            <th>Genre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredMaterials.map((m) => (
            <tr key={`materials-${m.materialId}`}>
              <th scope="row">{m.materialId}</th>
              <td>{m.materialName}</td>
              <td>{m.materialType?.name}</td>
              <td>{m.genre}</td>
              <td>
                <Link to={`${m.materialId}`}>Details</Link>
              </td>
              <td>
                <button onClick={() => handleRemove(m.materialId)}>
                  Click Here To Remove Material
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}