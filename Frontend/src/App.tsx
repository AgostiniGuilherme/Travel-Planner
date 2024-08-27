import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ViagensDetalhesPage } from "./Paginas/viagem-detalhes";
import { CriarViagemPage } from "./Paginas/criar-viagem";

const router = createBrowserRouter([
  {
    path: "/viagem",
    element: <CriarViagemPage />,
  },
  {
    path: "/viagem/:IdViagem",
    element: <ViagensDetalhesPage />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
