import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import RoomPage from 'pages/RoomPage.tsx';
import HomePage from 'pages/HomePage.tsx';
import RegisterPage from 'pages/RegisterPage.tsx';
import LoginPage from 'pages/LoginPage.tsx';
import { AuthProvider } from 'features/auth/hooks/useAuth.tsx';
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
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
