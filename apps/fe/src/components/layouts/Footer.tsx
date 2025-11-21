const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Khách sạn. All rights reserved.
      </div>
    </footer>
  );
};
export default Footer;
