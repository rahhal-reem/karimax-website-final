import { useState, useRef, useEffect } from "react";
import { ChevronDown, User } from "lucide-react";

interface SignInButtonProps {
  compact?: boolean;
}

const SignInButton = ({ compact = false }: SignInButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compact mode for tablet
  if (compact) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <User className="w-6 h-6" />
        </button>
        
        {isOpen && (
          <div className="absolute top-full right-0 w-[200px] bg-white border border-[#ddd] shadow-lg z-50 rounded-md mt-1">
            <div className="py-2">
              <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#f0f0f0] transition-colors">
                Sign In
              </button>
              <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#f0f0f0] transition-colors">
                Create Account
              </button>
              <hr className="my-1 border-[#eee]" />
              <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#f0f0f0] transition-colors">
                Orders
              </button>
              <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#f0f0f0] transition-colors">
                Wishlist
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex items-center gap-2 px-[10px] py-[4px] hover:bg-white/10 rounded-full transition-colors"
      >
        <User className="w-[24px] h-[24px] text-white" />
        <div className="flex flex-col items-start">
          <span className="text-[11px] text-white leading-tight">Sign In</span>
          <div className="flex items-center gap-0.5">
            <span className="text-[13px] text-white font-bold leading-tight">Account</span>
            <ChevronDown className="w-[10px] h-[10px] text-white" />
          </div>
        </div>
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full right-0 w-[200px] bg-white border border-[#ddd] shadow-lg z-50 rounded-md"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="py-2">
            <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#f0f0f0] transition-colors">
              Sign In
            </button>
            <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#f0f0f0] transition-colors">
              Create Account
            </button>
            <hr className="my-1 border-[#eee]" />
            <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#f0f0f0] transition-colors">
              Orders
            </button>
            <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#f0f0f0] transition-colors">
              Wishlist
            </button>
            <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#f0f0f0] transition-colors">
              Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInButton;
