import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortyBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortBy = searchParams.get("sortBy");
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      onChange={handleChange}
      value={currentSortBy || options[0].value}
    />
  );
}

export default SortyBy;
