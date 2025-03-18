import { HiOutlineUserPlus } from "react-icons/hi2";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import Button from "../../ui/Button";
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
      <Button>
        <HiOutlineUserPlus />
        Add cabin
      </Button>
    </TableOperations>
  );
}

export default CabinTableOperations;
