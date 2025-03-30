import UserMenu from "./UserMenu";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <div className="w-full h-13 p-2 bg-violet-900 text-white px-12">
      <div className="flex justify-between">
        <div>Logo</div>
        <div className="flex gap-5">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
