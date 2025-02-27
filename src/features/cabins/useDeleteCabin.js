import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
export function useDeleteCabin() {
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
    mutate: deleteCabin /**mutate - A function that triggers the mutation. */,
  } = useMutation({
    //mutationFn is the function that runs when mutate() is called.
    mutationFn: deleteCabinApi,

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
  return { isDeleting, deleteCabin };
}
