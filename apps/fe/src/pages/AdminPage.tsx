import AdminHeader from 'components/layouts/AdminHeader';
import Footer from 'components/layouts/Footer.tsx';
import { Outlet } from 'react-router-dom';
const AdminPage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <AdminHeader />
        <main className="w-full grow flex items-center justify-center p-5">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};
export default AdminPage;
