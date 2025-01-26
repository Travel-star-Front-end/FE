import AuthLayout from "../layouts/auth-layout";
import LoginPage from "../pages/auth/login/login";
import SearchIdPage from "../pages/auth/search/searchId";
import CompletedIdPage from "../pages/auth/search/completedId";
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
    path: "/search",
    element: <AuthLayout />,
    children: [
      {
        path: "id",
        element: <SearchIdPage />,
      },
      {
        path: "id/completed",
        element: <CompletedIdPage />,
      }
    ]
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