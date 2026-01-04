import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Menu, Download, Store } from "lucide-react";
import MegaMenu, { categoriesData } from "./MegaMenu";

const CategoryBar = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  const handleMenuOpen = useCallback((categoryName: string | null = null) => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveCategory(categoryName);
    setMegaMenuOpen(true);
  }, []);

  const handleMenuClose = useCallback(() => {
    // Delay close to allow cursor to move to menu
    closeTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
      setActiveCategory(null);
    }, 150);
  }, []);

  const handleMenuEnter = useCallback(() => {
    // Clear close timeout when entering menu
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  return (
    <div 
      className="relative hidden sm:block bg-nav-lower" 
      ref={menuTriggerRef}
      style={{ position: "sticky", top: 0, zIndex: 40 }}
    >
      <div className="flex items-center h-[41px]">
        {/* All Button */}
        <div 
          className="relative flex-shrink-0 ml-3 md:ml-[25px]"
          onMouseEnter={() => handleMenuOpen(null)}
          onMouseLeave={handleMenuClose}
        >
          <button 
            className={`flex items-center gap-1 md:gap-1.5 h-full px-2 md:px-[10px] py-[5px] text-nav-upper transition-all ${
              megaMenuOpen ? "bg-white/40 rounded-full" : "hover:bg-white/30 hover:rounded-full"
            }`}
          >
            <Menu className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" />
            <span className="text-[13px] md:text-[14px] font-medium">All</span>
            <ChevronDown className="w-[10px] h-[10px]" />
          </button>
        </div>

        {/* Categories Container with Chevrons on the Right */}
        <div className="flex items-center flex-1 overflow-hidden relative">
          {/* Scrollable Categories */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex items-center overflow-x-auto scrollbar-hide flex-1 category-scroll"
          >
            {categoriesData.map((category, index) => (
              <div 
                key={`${category.name}-${index}`} 
                className="relative flex-shrink-0"
                onMouseEnter={() => handleMenuOpen(category.name)}
                onMouseLeave={handleMenuClose}
              >
                <button
                  className={`flex items-center gap-0.5 px-2 md:px-[10px] py-[5px] text-nav-upper transition-all whitespace-nowrap ${
                    activeCategory === category.name && megaMenuOpen
                      ? "bg-white/40 rounded-full" 
                      : "hover:bg-white/30 hover:rounded-full"
                  }`}
                >
                  <span className="text-[13px] md:text-[14px]">{category.name}</span>
                  <ChevronDown className="w-[10px] h-[10px] hidden md:block" />
                </button>
              </div>
            ))}
          </div>

          {/* Chevrons Container - Side by Side on Right with Shadow */}
          <div className="flex items-center flex-shrink-0 bg-nav-lower shadow-[-4px_0_8px_rgba(0,0,0,0.15)] z-10 ml-1">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`flex items-center justify-center w-6 md:w-7 h-[31px] transition-all ${
                canScrollLeft 
                  ? "hover:bg-white/30 cursor-pointer text-nav-upper" 
                  : "opacity-30 cursor-default text-nav-upper"
              }`}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`flex items-center justify-center w-6 md:w-7 h-[31px] transition-all ${
                canScrollRight 
                  ? "hover:bg-white/30 cursor-pointer text-nav-upper" 
                  : "opacity-30 cursor-default text-nav-upper"
              }`}
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Right Side Buttons - Hidden on tablet, shown on desktop */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0 mr-[25px]">
          <button className="flex items-center gap-1.5 px-[10px] py-[5px] text-nav-upper bg-nav-lower hover:bg-white/30 hover:rounded-full transition-all whitespace-nowrap">
            <Store className="w-4 h-4" />
            <span className="text-[13px] font-medium">Become a Seller</span>
          </button>
          
          <button className="flex items-center gap-1.5 px-[10px] py-[5px] text-nav-upper bg-nav-lower hover:bg-white/30 hover:rounded-full transition-all whitespace-nowrap">
            <Download className="w-4 h-4" />
            <span className="text-[13px] font-medium">Karimax App</span>
          </button>
        </div>
      </div>

      {/* Mega Menu */}
      <div onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuClose}>
        <MegaMenu
          isOpen={megaMenuOpen}
          activeCategory={activeCategory}
          onCategoryHover={setActiveCategory}
          onClose={handleMenuClose}
        />
      </div>
    </div>
  );
};

export default CategoryBar;
