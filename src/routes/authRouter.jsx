import AuthLayout from "../layouts/auth-layout";
import LoginPage from "../pages/auth/login/login";
import SignUpPage from "../pages/auth/signup/signup";
import CompletedPage from "../pages/auth/signup/completed";
import SettingPage from "../pages/auth/setting/setting";

const authRouter = [
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/signup",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignUpPage />,
      },
      {
        path: "completed",
        element: <CompletedPage />,
      }
    ],
  },
  {
    path: "/setting",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SettingPage />,
      },
    ],
  },
];

export default authRouter;