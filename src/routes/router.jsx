import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthRouter from './authRouter';
import RootLayout from '../layouts/root-layout';
import HomePage from '../pages/home/home';
import PostsPage from '../pages/posts/posts';
import PostsDetailPage from '../pages/posts/detail';
import PostsWritePage from '../pages/posts/write';
import PostsEditPage from '../pages/posts/edit';
import PlanetPage from '../pages/planet/planet';
import RankingPage from '../pages/ranking/ranking';
import CalenderPage from '../pages/calender/calender';
import MyPagePage from '../pages/auth/mypage/mypage';
import MyPageEditPage from '../pages/auth/mypage/edit';
import MyPagePostsPage from '../pages/auth/mypage/posts';
import MyPageFriendsPage from '../pages/auth/mypage/friends';
import NotFoundPage from '../pages/notFound/notFound';
import OthersPlanet from '../pages/planet/othersPlanet';
import SubscribePage from '../pages/subscribe/subscribe';
import Payment from '../components/subscribe/Payment';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },

      {
        path: 'posts',
        errorElement: <NotFoundPage />,
        children: [
          {
            index: 'true',
            element: <PostsPage />,
          },
          {
            path: ':id',
            element: <PostsDetailPage />,
          },
          {
            path: 'write',
            element: <PostsWritePage />,
          },
        ],
      },

      {
        path: 'edit',
        errorElement: <NotFoundPage />,
        children: [
          {
            path: ':id',
            element: <PostsEditPage />,
          },
        ]
      },

      {
        path: 'planet',
        errorElement: <NotFoundPage />,
        children: [
          {
            index: 'true',
            element: <PlanetPage />,
          },
          {
            path: ':id',
            element: <OthersPlanet />,
          },
        ],
      },
      {
        path: 'ranking',
        element: <RankingPage />,
      },
      {
        path: 'calender',
        element: <CalenderPage />,
      },

      {
        path: 'mypage',
        errorElement: <NotFoundPage />,
        children: [
          {
            index: 'true',
            element: <MyPagePage />,
          },
          {
            path: 'edit',
            element: <MyPageEditPage />,
          },
          {
            path: 'posts',
            element: <MyPagePostsPage />,
          },
          {
            path: 'friends',
            element: <MyPageFriendsPage />,
          },
        ],
      },
      {
        path: 'subscribe',
        element: <SubscribePage />,
      },
    ],
  },

  ...AuthRouter,
]);

export default router;
