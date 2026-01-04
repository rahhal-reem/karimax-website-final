import { useState } from "react";
import { X, ChevronRight, ChevronDown, User, ShoppingCart, Store, Download, Grid } from "lucide-react";
import { categoriesData } from "./MegaMenu";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentCategory = categoriesData.find((c) => c.name === expandedCategory);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed inset-y-0 left-0 w-[85%] max-w-[360px] bg-white z-50 lg:hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-nav-upper text-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6" />
            <div>
              <p className="text-[14px] font-medium">Hello, Sign In</p>
              <p className="text-[12px] opacity-80">Account & Lists</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Categories */}
          <div className="py-2">
            <p className="px-4 py-2 text-[13px] font-bold text-muted-foreground uppercase tracking-wide">
              Shop By Category
            </p>
            
            {/* All Categories option */}
            <button
              className="w-full flex items-center gap-3 px-4 py-3 text-[15px] text-foreground hover:bg-muted transition-colors"
            >
              <Grid className="w-5 h-5 text-muted-foreground" />
              <span>All Categories</span>
            </button>

            {categoriesData.map((category) => (
              <div key={category.name}>
                <button
                  onClick={() => {
                    setExpandedCategory(
                      expandedCategory === category.name ? null : category.name
                    );
                    setExpandedSubcategory(null);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 text-[15px] text-foreground hover:bg-muted transition-colors"
                >
                  <span>{category.name}</span>
                  {expandedCategory === category.name ? (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                
                {expandedCategory === category.name && (
                  <div className="bg-muted/50 py-1">
                    {/* View All for this category */}
                    <button className="w-full flex items-center gap-3 px-6 py-2 text-[14px] text-primary hover:bg-muted transition-colors">
                      <Grid className="w-4 h-4" />
                      <span>View All {category.name}</span>
                    </button>
                    
                    {category.subcategories.map((sub, index) => (
                      <button
                        key={`${sub.name}-${index}`}
                        className="w-full flex items-center gap-3 px-6 py-2 text-[14px] text-foreground hover:bg-muted transition-colors"
                      >
                        {sub.image && (
                          <img 
                            src={sub.image} 
                            alt={sub.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <span>{sub.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-border my-2" />

          {/* Account Links */}
          <div className="py-2">
            <p className="px-4 py-2 text-[13px] font-bold text-muted-foreground uppercase tracking-wide">
              Your Account
            </p>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-[15px] text-foreground hover:bg-muted">
              <User className="w-5 h-5 text-muted-foreground" />
              <span>Sign In / Register</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-[15px] text-foreground hover:bg-muted">
              <ShoppingCart className="w-5 h-5 text-muted-foreground" />
              <span>Your Orders</span>
            </button>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-border my-2" />

          {/* Additional Links */}
          <div className="py-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-[15px] text-foreground hover:bg-muted">
              <Store className="w-5 h-5 text-muted-foreground" />
              <span>Become a Seller</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-[15px] text-foreground hover:bg-muted">
              <Download className="w-5 h-5 text-muted-foreground" />
              <span>Download Karimax App</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
