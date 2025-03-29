import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { useCheckout } from "./useCheckout";
function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();
  if (isCheckingOut) return <Spinner />;
  return (
    <Button
      variation="primary"
      onClick={() => checkout({ bookingId })}
      size="small"
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
