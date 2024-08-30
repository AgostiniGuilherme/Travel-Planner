import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ViagensDetalhesPage } from "./Paginas/viagem-detalhes";
import { CriarViagemPage } from "./Paginas/criar-viagem";
import { CadastroPage } from "./Paginas/tela-cadastro";
import { LoginPage } from "./Paginas/tela-login";
import { MenuPage } from "./Paginas/menu";

const router = createBrowserRouter([
  {
    path: "/viagem",
    element: <CriarViagemPage />,
  },
  {
    path: "/viagem/:idViagem",
    element: <ViagensDetalhesPage />,
  },
  {
    path: "/cadastro",
    element: <CadastroPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/menu",
    element: <MenuPage />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
