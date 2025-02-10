import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/*
- It sets up the cache and manages all the queries in the application.
- It is responsible for delegation of fetching to the useQuery, caching, synchronizing, and updating data in a declarative way.
- It is typically passed to a QueryClientProvider to be used throughout your React app.
- We're basically creating a place where all the data will live like a global store for all the queries and then later, we're going to provide it to the entire application
 */
const queryClient = new QueryClient({
  // Allows you to configure the default behavior of queries in React Query.
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
      /*
Purpose: The amount of time that the data in the cache will stay fresh or will stay valid until it is fetched again by React Query

Fresh Data: Data is not re-fetched if a new component subscribes to the same query.

Stale Data: After 60,000ms (1 minute), the data is considered stale, and if a component mounts or a query is triggered, it will refetch.

Example Behavior:
- If you fetch data and revisit the component within 1 minute, it won’t trigger a new request.
- After 1 minute, if the same query is used again, React Query will automatically refetch the data.

- Moral of the story is, Data will only be re-fetched if a the stale time is passed or a manual reload happens. Data will be fetched and stay the same that way for the amount of time we specified in the stale property even if the data is modified in the database. Since the cache is only updated after the time we specified has been passed or a reload happens, components who subscribed to the data will reflect the stale data till that time ends or the manual reload happens. No moving to another tab or component will help. But a reload does.
      */
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
