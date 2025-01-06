import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthRouter from "./authRouter";
import RootLayout from "../layouts/root-layout";
import HomePage from "../pages/home/home";
import PostsPage from "../pages/posts/posts";
import PostsWritePage from "../pages/posts/write";
import PostsEditPage from "../pages/posts/edit";
import PlanetPage from "../pages/planet/planet";
import RankingPage from "../pages/ranking/ranking";
import CalenderPage from "../pages/calender/calender";
import MyPagePage from "../pages/auth/mypage/mypage";
import MyPageEditPage from "../pages/auth/mypage/edit";
import MyPagePostsPage from "../pages/auth/mypage/posts";
import MyPageFriendsPage from "../pages/auth/mypage/friends";
import NotFoundPage from "../pages/notFound/notFound";

import TravelPost from "../components/travelPost/travel-post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "travelpost",
        element: <TravelPost />,
      },

      {
        path: "posts",
        errorElement: <NotFoundPage />,
        children: [
          {
            index: "true",
            element: <PostsPage />,
          },
          {
            path: "write",
            element: <PostsWritePage />,
          },
          {
            path: "edit",
            element: <PostsEditPage />,
          },
        ],
      },

      {
        path: "planet",
        element: <PlanetPage />,
      },
      {
        path: "ranking",
        element: <RankingPage />,
      },
      {
        path: "calender",
        element: <CalenderPage />,
      },

      {
        path: "mypage",
        errorElement: <NotFoundPage />,
        children: [
          {
            index: "true",
            element: <MyPagePage />,
          },
          {
            path: "edit",
            element: <MyPageEditPage />,
          },
          {
            path: "posts",
            element: <MyPagePostsPage />,
          },
          {
            path: "friends",
            element: <MyPageFriendsPage />,
          },
        ],
      },
    ],
  },

  ...AuthRouter,
]);

export default router;
