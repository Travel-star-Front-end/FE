import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthRouter from "./authRouter";
import RootLayout from "../layouts/root-layout";
import HomePage from "../pages/home/home";
import NotFoundPage from "../pages/notFound/notFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        // 접속 시 login 페이지로 이동
        index: true,
        element: <Navigate to="/login" />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
    ],
  },

  ...AuthRouter,
]);

export default router;
