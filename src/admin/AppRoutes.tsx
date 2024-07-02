import { useRoutes, Navigate } from "react-router-dom";
import { PageNotFound } from "./pages/404";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { useAuthContext } from "./contexts/AuthContext";

export default () => {
  const { authenticated } = useAuthContext();
  const publicRoutes = useRoutes([
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "*",
      element: <Navigate to="login" replace />,
    },
  ]);
  const privateRoutes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "login",
      element: <Navigate to="/" replace />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return <>{authenticated ? privateRoutes : publicRoutes}</>;
};
