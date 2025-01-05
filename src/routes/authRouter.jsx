import AuthLayout from "../layouts/auth-layout";
import LoginPage from "../pages/auth/login/login";
import SignUpPage from "../pages/auth/signup/signup";
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
    ],
  },
  {
    // 행성 설정 경로
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