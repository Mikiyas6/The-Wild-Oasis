import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "../cabins/useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const moveBack = () => navigate(-1);
  const { isLoading, booking, error } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeletingBooking, deleteBooking } = useDeleteBooking();
  if (!booking) return <p>Error: Booking not found</p>;
  const { status, id: bookingId } = booking;
  if (isLoading || isDeletingBooking) return <Spinner />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  function handleCheckOut() {
    checkout({ bookingId });
    navigate("/bookings");
  }
  function handleDelete() {
    deleteBooking(bookingId, { onSettled: () => navigate(-1) });
  }
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
          )}
          {status === "checked-in" && (
            <Button
              onClick={handleCheckOut}
              icon={<HiArrowUpOnSquare />}
              disabled={isCheckingOut}
            >
              Check Out
            </Button>
          )}
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
          <Modal.Open opens="deleteBooking">
            <Button variation="danger" icon={<HiTrash />}>
              Delete Booking
            </Button>
          </Modal.Open>
        </ButtonGroup>
        <Modal.Window name="deleteBooking">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeletingBooking}
            onConfirm={handleDelete}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
