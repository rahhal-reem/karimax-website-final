import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import karimaxLogo from "@/assets/karimax-logo.svg";
import SearchBar from "./SearchBar";
import SignInButton from "./SignInButton";
import CartButton from "./CartButton";
import CategoryBar from "./CategoryBar";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <>
      <nav className="w-full">
        {/* Upper Section */}
        <div className="relative flex items-center justify-between h-[56px] sm:h-[60px] bg-nav-upper px-3 sm:px-4 md:px-[25px] py-[10px]">
          {/* Left Side - Menu (mobile) + Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center py-[5px] px-2 sm:px-[20px] rounded-full hover:bg-white/10 transition-colors"
            >
              <img
                src={karimaxLogo}
                alt="Karimax"
                className="h-[32px] sm:h-[36px] md:h-[40px] w-auto"
              />
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 justify-center px-4 min-w-0">
            <SearchBar />
          </div>

          {/* Search Bar - Mobile/Tablet */}
          <div className="md:hidden flex-1 flex justify-end">
            <SearchBar 
              isMobile 
              isExpanded={mobileSearchOpen} 
              onExpandToggle={() => setMobileSearchOpen(!mobileSearchOpen)} 
            />
          </div>

          {/* Right Side - Sign In & Cart */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Desktop Sign In */}
            <div className="hidden lg:block">
              <SignInButton />
            </div>
            {/* Tablet Sign In */}
            <div className="hidden sm:block lg:hidden">
              <SignInButton compact />
            </div>

            {/* Desktop Cart */}
            <div className="hidden sm:block lg:block">
              <CartButton itemCount={0} total="$0.00" compact={false} />
            </div>
            {/* Tablet Cart */}
            <div className="hidden sm:hidden">
              <CartButton itemCount={0} compact />
            </div>
            {/* Mobile Cart */}
            <div className="sm:hidden">
              <CartButton itemCount={0} compact />
            </div>
          </div>
        </div>

        {/* Lower Section - Categories (hidden on mobile) */}
        <CategoryBar />
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;
