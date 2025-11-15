import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RoomPage from 'RoomPage.tsx';
import HomePage from 'Homepage.tsx';
import './index.css';
import App from './App.tsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Oops! Lỗi không tìm thấy trang</div>,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'rooms',
        element: <RoomPage />,
      },
    ],
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
