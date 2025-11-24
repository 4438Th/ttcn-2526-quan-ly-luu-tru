import HomeHeader from 'components/layouts/HomeHeader';
import Footer from 'components/layouts/Footer';
const HomePage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <HomeHeader />
        <main className="w-full grow flex items-center justify-center p-5">
          <h1>HomePage</h1>
        </main>
        <Footer />
      </div>
    </>
  );
};
export default HomePage;
