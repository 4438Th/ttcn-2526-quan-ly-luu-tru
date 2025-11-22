import Header from 'components/layouts/Header.tsx';
import Footer from 'components/layouts/Footer.tsx';
const AdminPage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="w-full grow flex items-center justify-center p-5"></main>
        <Footer />
      </div>
    </>
  );
};
export default AdminPage;
