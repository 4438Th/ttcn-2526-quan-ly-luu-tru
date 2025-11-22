import AdminHeader from 'components/layouts/AdminHeader';
import Footer from 'components/layouts/Footer.tsx';
const ReceptionistPage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <AdminHeader />
        <main className="w-full grow flex items-center justify-center p-5">
          <h1>ReceptionistPage</h1>
        </main>
        <Footer />
      </div>
    </>
  );
};
export default ReceptionistPage;
