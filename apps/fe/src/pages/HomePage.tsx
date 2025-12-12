import HomeHeader from 'components/layouts/HomeHeader';
import Footer from 'components/layouts/Footer';
const HomePage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <HomeHeader />
        <main className="w-full grow flex flex-col items-center justify-center p-8 text-center">
          <div className="max-w-3xl space-y-6 p-10 bg-white shadow-xl rounded-2xl border border-gray-100">
            <h1 className="text-4xl font-extrabold text-blue-600">QUẢN LÝ LƯU TRÚ</h1>
            <p className="text-xl text-gray-700">
              Nền tảng quản lý lưu trú, được thiết kế để đơn giản hóa mọi hoạt động của bạn.
            </p>
            <div className="mt-4 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 transition duration-300 shadow-md">
              <a href="/login">Khám phá ngay</a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};
export default HomePage;
