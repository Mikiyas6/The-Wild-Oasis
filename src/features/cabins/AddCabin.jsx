import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin({ children }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>{children}</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <>
//       <Button onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}>
//         {isOpenModal ? "Close" : "Add New Cabin"}
//       </Button>
//       {isOpenModal && (
//         <Modal onCloseModal={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

export default AddCabin;
