import { createBrowserRouter, Navigate } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ProtectedRoute from "./Components/main/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signin" replace />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

export default router;
