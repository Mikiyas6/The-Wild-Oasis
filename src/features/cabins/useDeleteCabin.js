import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
export function useDeleteCabin() {
  /*
- useQueryClient() is a React Query hook that gives access to the QueryClient instance or the application's central data management system.
- This allows you to interact with the cache, invalidate queries, refetch data, and more.

// This was how we used to do it before
const { data, isLoading } = useQuery({
  queryKey: ["cabins"],
  queryFn: getCabins,
});

// Direct access through QueryClient (Now we can do this)
const queryClient = useQueryClient();

    // A. Read from cache directly
    const cachedCabins = queryClient.getQueryData(["cabins"]);

    // B. Write to cache directly
    queryClient.setQueryData(["cabins"], newCabins);

    // C. Check cache status
    const isStale = queryClient.isQueryStale(["cabins"]);

    // D. Force refetch
    queryClient.refetchQueries({ queryKey: ["cabins"] });

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
    // is a callback function that Runs after a successful mutation. Meaning, It runs only if the function defined by mutationFn succeeds.
    onSuccess: () => {
      toast.success("Cabin Successfully Deleted");
      // queryClient.invalidateQueries({queryKey:["cabin"]}) makes the query with the defined queryKey stale and then immediately forces a refetch even if the data is still fresh.
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      /*
    Breakdown of the Behavior
1️⃣ Marks Queries with ["cabin"] as Stale
- Even if the data was fresh (staleTime not exceeded), it immediately becomes stale.
This means React Query considers it outdated.
2️⃣ Triggers an Immediate Refetch (If Active)
If a component is currently using the cabin data, React Query will automatically refetch the data.
The UI updates with fresh data once the refetch is complete.
3️⃣ If the Query is Not Active (Unused in UI), The query is marked stale, but it won’t refetch immediately.
- N.B (query becomes active when we are on a page that uses it. You can see it in the React query tools.) 
- So in that case, When the component using ["cabin"] mounts later, it automatically re-fetches because it sees stale data.
   */
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}
