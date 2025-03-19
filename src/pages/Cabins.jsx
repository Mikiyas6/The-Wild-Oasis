import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import { HiOutlineUserPlus } from "react-icons/hi2";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin>
          <span>
            <HiOutlineUserPlus />
            Add cabin
          </span>
        </AddCabin>
      </Row>
    </>
  );
}

export default Cabins;
