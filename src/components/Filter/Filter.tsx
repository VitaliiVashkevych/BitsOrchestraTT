import { useBookContext } from "../../hooks/useBookContext";
import "./Filter.css";

const Filter = () => {
  const { filter, handleChange } = useBookContext();
  return (
    <div className="filter-container">
      <label htmlFor="filter-dropdown" className="filter-label">
        Filter:
      </label>
      <select
        id="filter-dropdown"
        value={filter}
        onChange={handleChange}
        className="filter-dropdown"
      >
        <option value="Show All">Show All</option>
        <option value="Show Active">Show Active</option>
        <option value="Show Deactivated">Show Deactivated</option>
      </select>
    </div>
  );
};

export default Filter;
