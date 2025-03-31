import Header from "../header/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Header />
      <div className="px-12 p-2">{children}</div>
    </div>
  );
};

export default MainLayout;
