import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './assets/css/index.css';
import { AuthProvider } from 'providers/AuthProvider';
import { ToastProvider } from 'lib/toast';
import HomePage from 'pages/HomePage.tsx';
import AdminPage from 'pages/AdminPage.tsx';
import RegisterPage from 'pages/RegisterPage.tsx';
import LoginPage from 'pages/LoginPage.tsx';
import ReceptionistPage from 'pages/ReceptionistPage.tsx';
import RoomView from 'features/rooms/components/RoomView.tsx';
import { CustomerView } from 'features/customer';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App là Layout ngoài cùng (chứa Outlet)
    errorElement: <div>Lỗi không tìm thấy trang</div>,
    children: [
      {
        // Route Home
        index: true,
        element: <HomePage />,
      },

      // Route Admin
      {
        path: 'admin',
        element: <AdminPage />,
        children: [
          {
            index: true, // Index của AdminPage: /admin
            element: <RoomView />,
          },
          {
            path: 'customers',
            element: <CustomerView />,
          },
        ],
      },
      // Route Register
      { path: 'register', element: <RegisterPage /> },
      // Route Login
      { path: 'login', element: <LoginPage /> },
      // Route Receptionist
      { path: 'receptionist', element: <ReceptionistPage /> },
    ],
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  </StrictMode>,
);
