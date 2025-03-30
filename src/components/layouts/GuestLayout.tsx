import { ThemeToggle } from "../header/ThemeToggle";

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="overflow-hidden relative bg-gradient-to-r
         from-indigo-400 via-purple-400 to-pink-400 dark:bg-gradient-to-r
          dark:from-slate-700 dark:via-gray-800 dark:to-slate-600"
    >
      <div className="absolute top-4 left-4 text-white">
        <ThemeToggle />
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center mb-3">
        <div className="text-4xl font-bold p-12 py-2 my-3">
          <h3>Logo</h3>
        </div>
        {children}
      </div>
    </div>
  );
};

export default GuestLayout;
