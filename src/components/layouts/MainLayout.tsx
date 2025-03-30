import Header from "../header/Header";
import { Toaster } from "react-hot-toast";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="px-12 p-2">{children}</div>
      <Toaster />
    </div>
  );
};

export default MainLayout;
