import AuthLayout from "../layouts/auth-layout";
import LoginPage from "../pages/auth/login/login";
import SignUpPage from "../pages/auth/signup/signup";

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
    ],
  },
];

export default authRouter;