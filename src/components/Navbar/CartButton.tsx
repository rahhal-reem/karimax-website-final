import { useState, useRef, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

interface CartButtonProps {
  itemCount?: number;
  total?: string;
  compact?: boolean;
}

const CartButton = ({ itemCount = 0, total = "$0.00", compact = false }: CartButtonProps) => {
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

  // Compact mode for mobile/tablet
  if (compact) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-cart-bubble text-nav-upper text-[10px] font-bold rounded-full px-1">
            {itemCount}
          </span>
        </button>
        
        {isOpen && (
          <div className="absolute top-full right-0 w-[280px] bg-white border border-[#ddd] shadow-lg z-50 rounded-md mt-1">
            <div className="p-4">
              <p className="text-[14px] text-[#333] text-center">Your cart is empty</p>
              <button className="w-full mt-3 py-2 bg-search-button text-white text-[14px] font-medium rounded-md hover:bg-search-button-hover transition-colors">
                View Cart
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
        className="flex flex-col items-center px-[10px] py-[4px] hover:bg-white/10 rounded-full transition-colors"
      >
        {/* Cart Icon Row */}
        <div className="relative">
          <ShoppingCart className="w-[26px] h-[26px] text-white" />
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-cart-bubble text-nav-upper text-[11px] font-bold rounded-full px-1">
            {itemCount}
          </span>
        </div>
        {/* Price Row */}
        <span className="text-[12px] text-white font-medium leading-tight mt-0.5">{total}</span>
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full right-0 w-[280px] bg-white border border-[#ddd] shadow-lg z-50 rounded-md"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="p-4">
            <p className="text-[14px] text-[#333] text-center">Your cart is empty</p>
            <button className="w-full mt-3 py-2 bg-search-button text-white text-[14px] font-medium rounded-md hover:bg-search-button-hover transition-colors">
              View Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartButton;
