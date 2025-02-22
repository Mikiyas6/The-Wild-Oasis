import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { deleteCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const {
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    id: cabinId,
  } = cabin;
  /*
- useQueryClient() is a React Query hook that gives access to the QueryClient instance.
- This allows you to interact with the cache, invalidate queries, refetch data, and more.
  */
  const queryClient = useQueryClient();
  /**
   - useMutation is a React Query hook used for mutations (changing data on the server).
   */
  const {
    isLoading: isDeleting,
    mutate /**mutate - A function that triggers the mutation. */,
  } = useMutation({
    //mutationFn is the function that runs when mutate() is called.
    mutationFn: deleteCabin,

    // a function that performs side effects like invalidating the cache or showing a success message.
    // It invalidates (marks as stale) any queries with the key defined by queryKey and then triggering a refetch
    // Runs after a successful mutation. Meaning, It runs only if the function defined by mutationFn succeeds.
    // queryClient.invalidateQueries({queryKey:["cabin"]}) makes the query with the defined queryKey stale and then immediately forces a refetch after a successful mutation, even if the data is still fresh.

    // - All this happens if the mutation was successful. Because If you think about it, If there was no mutation, then why go through all this work of making the data stale and triggering a re-fetch.

    /**
     *  Breakdown of the Behavior
1️⃣ Marks Queries with ["cabin"] as Stale

- Even if the data was fresh (staleTime not exceeded), it immediately becomes stale.
This means React Query considers it outdated.
2️⃣ Triggers an Immediate Refetch (If Active)
If a component is currently using the ["cabin"] query, React Query will automatically refetch the data.
The UI updates with fresh data once the refetch is complete.
3️⃣ If the Query is Not Active (Unused in UI), The query is marked stale, but it won’t refetch immediately.
- N.B (query becomes active when we are on a page that uses it. You can see it in the React query tools.) 
- So in that case, When the component using ["cabin"] mounts later, it automatically re-fetches because it sees stale data.
     */

    onSuccess: () => {
      toast.success("Cabin Successfully Deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return (
    <>
      <TableRow>
        <img src={image} alt="" />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button onClick={() => setShowForm((showForm) => !showForm)}>
            Edit
          </button>
          <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
            Delete
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
