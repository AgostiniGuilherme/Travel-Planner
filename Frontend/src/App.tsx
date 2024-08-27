import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TripDetailsPage } from "./Pages/trip-details";
import { CreateTripPage } from "./Pages/create-trip";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
