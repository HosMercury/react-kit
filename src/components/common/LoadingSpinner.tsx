import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center">
        <FaSpinner className="animate-spin text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
