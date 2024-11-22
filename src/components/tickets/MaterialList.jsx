import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { removeMaterial } from "../../data/materialsData";
import { Link } from "react-router-dom";
import { getGlobalState, fetchGlobalState } from "../../GlobalState";

export default function MaterialList() {
  const [circulatingMaterials, setCirculatingMaterials] = useState([]); // Only keep circulating materials state

  useEffect(() => {
    const fetchData = async () => {
      await fetchGlobalState();
      const { materialsInCirculation } = getGlobalState(); // Fetch only circulating materials
      setCirculatingMaterials(materialsInCirculation); // Set circulating materials
    };

    fetchData();
  }, []);

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
  };

  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>Materials</h4>
        <Link to="/materials/create">Add</Link>
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
          {circulatingMaterials.map((m) => (
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