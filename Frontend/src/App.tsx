import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ViagensDetalhesPage } from "./Paginas/viagem-detalhes";
import { CriarViagemPage } from "./Paginas/criar-viagem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CriarViagemPage />,
  },
  {
    path: "/viagem/:viagemId",
    element: <ViagensDetalhesPage />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
