import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;
function CabinTable() {
  /*
useQuery is a React hook used inside components that:
✅ Triggers the actual data fetching using queryFn.
✅ Gets query data from the cache (if available).
✅ Updates the UI when data is available.
✅ Tells QueryClient when to cache or refetch the data by defining the stale time.

How It Works
- useQuery always asks QueryClient to see if data is already cached.
- If cached and fresh, it doesn’t fetch (returns cached data instantly).
- If stale or data is not there, it fetches new data using the provided function.
  */
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    /* 
  - uniquely Identifies the data that we're going to query
  - "cabin" indicates that this query fetches cabin data.
  - React Query uses it to cache and manage data associated with this key.
  - If a query with the same queryKey exists in the cache and is still valid (not stale), React Query will use the cached data instead of refetching.
  - If the data is stale or doesn’t exist in the cache, React Query triggers queryFn to fetch fresh data.
  */
    queryKey: ["cabin"],
    queryFn: getCabins, // This is the function that's actually responsible for querying(Fetching) the data from the API. The function needs to be asynchronous or need to return a promise
  });
  /*
The `useQuery` hook returns several values, but the most important ones are:

 1️⃣ `data` – The fetched data ✅  
- If the query is successful, `data` contains the fetched response.  
- If the query is still loading, `data` is `undefined`.

 2️⃣ `isLoading` – True while fetching the data 🔄  
- Returns `true` when the request is in progress.  
- Returns `false` once data is fetched (or if an error occurs).

 3️⃣ `error` – Contains error details (if any) ❌  
- If the request fails, `error` contains an Error object with details.  
- If the request succeeds, `error` is `null`.

 4️⃣ `isError` – True if an error occurred ⚠️  
- Boolean flag that is `true` if the query failed.  

 5️⃣ `isFetching` – True whenever a request is being made 🔄  
- Unlike `isLoading`, it also returns `true` during refetching (e.g., after cache invalidation).  

 6️⃣ `refetch` – Manually trigger a refetch 🔄  
- If you want to fetch fresh data on demand, call `refetch()`.  
*/
  if (isLoading) return <Spinner />;
  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

export default CabinTable;
