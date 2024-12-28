import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginAuthenticationPage from '@/pages/login';
import DashBoardLayout from '@/components/layouts/DashBase';

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <DashBoardLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Home />,
  //     },
  //   ],
  // },
  {
    path: '/register',
    element: 
      <DashBoardLayout />,
    children: [
      {
        index: true,
        element: <LoginAuthenticationPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <DashBoardLayout/>,
    children: [
      {
        index: true,
        element: <LoginAuthenticationPage />,
      },
     
    ],
  }
]);

export const CustomRouter = () => {
  return <RouterProvider router={router} />;
};
