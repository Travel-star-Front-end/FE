import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/root-layout";
import LoginPage from "../pages/login/login";
import NotFoundPage from "../pages/notFound/notFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
