import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Camera } from "lucide-react";

interface SearchBarProps {
  isMobile?: boolean;
  isExpanded?: boolean;
  onExpandToggle?: () => void;
}

const SearchBar = ({ isMobile = false, isExpanded = true, onExpandToggle }: SearchBarProps) => {
  const [category, setCategory] = useState("All Categories");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All Categories",
    "Electronics",
    "Accessories",
    "Home",
    "Kitchen",
    "Pet Supplies",
    "Clothing",
    "Shoes",
    "Jewelry",
    "Beauty",
    "Health",
    "Household",
    "Toys",
    "Games",
    "Baby Products",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mobile collapsed state - just show search icon
  if (isMobile && !isExpanded) {
    return (
      <button 
        onClick={onExpandToggle}
        className="flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-full transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>
    );
  }

  // Mobile expanded state - full width search
  if (isMobile && isExpanded) {
    return (
      <div className="absolute inset-x-0 top-0 h-full bg-nav-upper px-3 flex items-center gap-2 z-20">
        <button 
          onClick={onExpandToggle}
          className="flex-shrink-0 p-2 text-white"
        >
          <ChevronDown className="w-5 h-5 rotate-90" />
        </button>
        <div className="flex-1 flex items-center h-[36px] rounded-full overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Search Karimax"
            autoFocus
            className="flex-1 h-full px-4 text-[14px] text-foreground bg-white outline-none placeholder:text-muted-foreground"
          />
          <button className="flex items-center justify-center h-full px-4 bg-search-button">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    );
  }

  // Desktop state
  return (
    <div 
      className={`flex items-center h-[40px] w-full max-w-[800px] rounded-full overflow-hidden bg-white transition-all ${
        isFocused ? "ring-2 ring-search-border" : ""
      }`}
    >
      {/* Category Dropdown - Hidden on smaller screens */}
      <div className="relative h-full hidden md:block" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center h-full bg-white pl-[12px] lg:pl-[15px] pr-[6px] lg:pr-[8px] py-[11px] text-[12px] lg:text-[13px] hover:bg-muted/50 transition-colors group"
        >
          <span className="text-nav-upper font-medium whitespace-nowrap">{category}</span>
          <ChevronDown className="w-[12px] h-[12px] ml-[3px] text-nav-upper flex-shrink-0" />
        </button>
        
        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-[200px] bg-white border border-border shadow-lg z-50 max-h-[300px] overflow-y-auto mt-0.5 rounded-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-[13px] transition-colors ${
                  category === cat 
                    ? "bg-muted text-primary font-medium" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Separator - Hidden on smaller screens */}
      <div className="hidden md:block w-[1px] h-[24px] bg-border" />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Karimax"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="flex-1 h-full px-3 text-[14px] lg:text-[15px] text-foreground bg-white outline-none placeholder:text-muted-foreground"
      />

      {/* Image Search Icon - Hidden on mobile */}
      <button className="hidden sm:flex items-center justify-center w-[40px] lg:w-[44px] h-full bg-white hover:bg-muted transition-colors">
        <Camera className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] text-muted-foreground" />
      </button>

      {/* Search Button */}
      <button className="flex items-center justify-center gap-1 h-full px-3 sm:px-4 lg:px-5 bg-search-button hover:bg-search-button-hover transition-all rounded-r-full">
        <Search className="w-[18px] h-[18px] text-white" />
        <span className="hidden sm:inline text-white text-[14px] lg:text-[15px] font-medium">Search</span>
      </button>
    </div>
  );
};

export default SearchBar;
