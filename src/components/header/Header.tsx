import User from "./User";

const Header = () => {
  return (
    <div className="w-full h-12 p-2 bg-violet-900 text-white px-12">
      <div className="flex justify-between">
        <div>Logo</div>
        <User />
      </div>
    </div>
  );
};

export default Header;
