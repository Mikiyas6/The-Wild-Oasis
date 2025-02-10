import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
<<<<<<< HEAD
        <p>Filter / Sort</p>
=======
        <p>Filter/Sort</p>
>>>>>>> 5035407718b514f86506a147577f2145f9705cfb
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
