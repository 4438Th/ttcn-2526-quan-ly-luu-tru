import { BookOpen, User } from 'lucide-react';
const DarkBlue = 'bg-blue-700';
const TextWhite = 'text-gray-200';
const Footer: React.FC = () => {
  return (
    // Footer chiếm toàn bộ chiều rộng, nền xanh đậm
    <footer className={`w-full py-6 px-8 ${DarkBlue} ${TextWhite}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 text-sm">
        {/* Khu vực 1: Thông tin Đồ án & Giảng viên */}
        <div className="space-y-1">
          <h3 className="font-bold text-base text-white flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-yellow-300" />
            Thông tin Đồ án
          </h3>
          <p>Đồ án: Thực tập chuyên ngành 2025-2026</p>
          <p>Giảng viên hướng dẫn: Hồ Đình Khả</p>
        </div>

        {/* Khu vực 2: Sinh viên thực hiện */}
        <div className="md:text-right space-y-1">
          <h3 className="font-bold text-base text-white flex items-center md:justify-end">
            <User className="w-5 h-5 mr-2 text-yellow-300" />
            Sinh viên thực hiện:
          </h3>
          <ul className="list-disc list-inside md:list-none md:pl-0 space-y-0.5">
            <li className="list-none">1. Huỳnh Trung Hiếu - DH52200677 - D22_TH11</li>
            <li className="list-none">2. Bùi Nhật Lâm - DH52200676 - D22_TH11</li>
          </ul>
        </div>
      </div>

      {/* Copyright/Năm */}
      <div className="border-t border-blue-600 mt-4 pt-4 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Quản lý lưu trú. Thực hiện bởi Huỳnh Trung Hiếu & Bùi Nhật
        Lâm.
      </div>
    </footer>
  );
};
export default Footer;
