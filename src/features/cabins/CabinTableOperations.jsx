import { HiOutlineUserPlus } from "react-icons/hi2";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import SortyBy from "../../ui/SortyBy";
import AddCabin from "./AddCabin";
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortyBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (low first) " },
          { value: "regularPrice-desc", label: "Sort by price (high first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
        ]}
      />

      <AddCabin>
        <HiOutlineUserPlus />
        Add cabin
      </AddCabin>
    </TableOperations>
  );
}

export default CabinTableOperations;
