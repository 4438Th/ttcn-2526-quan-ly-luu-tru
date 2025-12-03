import { CheckCircle } from 'lucide-react';
import { type ToastConfig } from '../types';
const ToastNotification: React.FC<{ config: ToastConfig }> = ({ config }) => {
  const { message, isVisible } = config;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
      }`}
    >
      <div className="flex items-center p-3 bg-green-500 text-white rounded-xl shadow-lg ring-1 ring-green-600/50">
        <CheckCircle size={20} className="mr-2" />
        <span className="font-medium text-sm sm:text-base">{message}</span>
      </div>
    </div>
  );
};
export default ToastNotification;
