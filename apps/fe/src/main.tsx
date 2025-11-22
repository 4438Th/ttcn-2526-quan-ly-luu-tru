import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from 'features/auth/hooks/useAuth.tsx';
import RoomPage from 'pages/RoomPage.tsx';
import AdminPage from 'pages/AdminPage.tsx';
import RegisterPage from 'pages/RegisterPage.tsx';
import LoginPage from 'pages/LoginPage.tsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Lỗi không tìm thấy trang</div>,
    children: [
      {
        path: '',
        element: <AdminPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
