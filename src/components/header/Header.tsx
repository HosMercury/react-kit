import { useState } from "react";
import UserMenu from "./UserMenu";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react"; // Icons for hamburger & close
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full h-13 p-2 bg-violet-900 text-white px-12">
      <div className="flex justify-between items-center">
        {/* Left Section */}
        <div className="flex gap-6 items-center ">
          <div className="cursor-pointer mr-8">Awfarlak</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4 ">
            <Link to="/m" className="cursor-pointer">
              Models
            </Link>
            <Link to="/b" className="cursor-pointer">
              Brands
            </Link>
            <Link to="/c" className="cursor-pointer">
              Components
            </Link>

            <div className="cursor-pointer">About</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex gap-5 items-center">
          <ThemeToggle />
          <UserMenu />

          {/* Hamburger Button (visible on small screens) */}
          <button className="md:hidden " onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X size={24} className="cursor-pointer" />
            ) : (
              <Menu size={24} className="cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (shown when menuOpen is true) */}
      {menuOpen && (
        <div className="md:hidden absolute top-12 left-0 w-full bg-violet-800 p-4 gap-2 flex flex-col z-50 shadow-lg">
          <div className="flex flex-col gap-6">
            <div className="cursor-pointer">Home</div>
            <div className="cursor-pointer">About</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
