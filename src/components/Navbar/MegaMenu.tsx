import { useState } from "react";
import { ChevronRight } from "lucide-react";

// Placeholder images for categories - using reliable placeholder service
const getPlaceholderImage = (seed: string) => 
  `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop&q=80`;

// Category images mapping
const categoryImages: Record<string, string> = {
  "View All": "",
  "Essentials": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=80&h=80&fit=crop",
  "Fitness": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&h=80&fit=crop",
  "Kids": "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=80&h=80&fit=crop",
  "Smart": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=80&h=80&fit=crop",
  "Outdoor": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=80&h=80&fit=crop",
  "Crafts": "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=80&h=80&fit=crop",
  "Grooming": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=80&h=80&fit=crop",
  "Supplies": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&h=80&fit=crop",
  "Drones": "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=80&h=80&fit=crop",
  "Espresso": "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=80&h=80&fit=crop",
  "Fashion": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop",
  "textiles": "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=80&h=80&fit=crop",
  "Women": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop",
  "Dresses": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=80&h=80&fit=crop",
  "Home": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&h=80&fit=crop",
  "Coffee": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&fit=crop",
  "Kitchen": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop",
  "Sustainable": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=80&h=80&fit=crop",
};

// Default image for items without specific mapping
const getItemImage = (name: string) => {
  return categoryImages[name] || `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop&q=80`;
};

// Category data structure with subcategories and sub-subcategories with images
export const categoriesData = [
  {
    name: "Electronics",
    subcategories: [
      { name: "Essentials", image: categoryImages["Essentials"] },
      { name: "Fitness", image: categoryImages["Fitness"] },
      { name: "Kids", image: categoryImages["Kids"] },
      { name: "Smart", image: categoryImages["Smart"] },
      { name: "Outdoor", image: categoryImages["Outdoor"] },
      { name: "Crafts", image: categoryImages["Crafts"] },
      { name: "Grooming", image: categoryImages["Grooming"] },
      { name: "Supplies", image: categoryImages["Supplies"] },
    ],
  },
  {
    name: "Accessories",
    subcategories: [
      { name: "Essentials", image: categoryImages["Essentials"] },
      { name: "Fitness", image: categoryImages["Fitness"] },
      { name: "Kids", image: categoryImages["Kids"] },
      { name: "Smart", image: categoryImages["Smart"] },
      { name: "Outdoor", image: categoryImages["Outdoor"] },
      { name: "Crafts", image: categoryImages["Crafts"] },
      { name: "Grooming", image: categoryImages["Grooming"] },
      { name: "Supplies", image: categoryImages["Supplies"] },
    ],
  },
  {
    name: "Home",
    subcategories: [
      { name: "Essentials", image: categoryImages["Essentials"] },
      { name: "Fitness", image: categoryImages["Fitness"] },
      { name: "Kids", image: categoryImages["Kids"] },
      { name: "Smart", image: categoryImages["Smart"] },
      { name: "Outdoor", image: categoryImages["Outdoor"] },
      { name: "Crafts", image: categoryImages["Crafts"] },
      { name: "Grooming", image: categoryImages["Grooming"] },
      { name: "Supplies", image: categoryImages["Supplies"] },
    ],
  },
  {
    name: "Kitchen",
    subcategories: [
      { name: "Essentials", image: categoryImages["Essentials"] },
      { name: "Drones", image: categoryImages["Drones"] },
      { name: "Espresso", image: categoryImages["Espresso"] },
      { name: "Fashion", image: categoryImages["Fashion"] },
      { name: "textiles", image: categoryImages["textiles"] },
      { name: "Women", image: categoryImages["Women"] },
      { name: "Dresses", image: categoryImages["Dresses"] },
      { name: "Home", image: categoryImages["Home"] },
      { name: "Coffee", image: categoryImages["Coffee"] },
      { name: "Kitchen", image: categoryImages["Kitchen"] },
    ],
  },
  {
    name: "Pet Supplies",
    subcategories: [
      { name: "Grooming", image: categoryImages["Grooming"] },
      { name: "Essentials", image: categoryImages["Essentials"] },
      { name: "Fitness", image: categoryImages["Fitness"] },
      { name: "Kids", image: categoryImages["Kids"] },
      { name: "Smart", image: categoryImages["Smart"] },
      { name: "Outdoor", image: categoryImages["Outdoor"] },
      { name: "Crafts", image: categoryImages["Crafts"] },
      { name: "Grooming", image: categoryImages["Grooming"] },
    ],
  },
  {
    name: "Clothing",
    subcategories: [
      { name: "Women", image: categoryImages["Women"] },
      { name: "Dresses", image: categoryImages["Dresses"] },
      { name: "Fashion", image: categoryImages["Fashion"] },
      { name: "Kids", image: categoryImages["Kids"] },
      { name: "Smart", image: categoryImages["Smart"] },
      { name: "Outdoor", image: categoryImages["Outdoor"] },
      { name: "Crafts", image: categoryImages["Crafts"] },
      { name: "Sustainable", image: categoryImages["Sustainable"] },
    ],
  },
  {
    name: "Shoes",
    subcategories: [
      { name: "Essentials", image: categoryImages["Essentials"] },
      { name: "Fitness", image: categoryImages["Fitness"] },
      { name: "Kids", image: categoryImages["Kids"] },
      { name: "Smart", image: categoryImages["Smart"] },
      { name: "Outdoor", image: categoryImages["Outdoor"] },
      { name: "Crafts", image: categoryImages["Crafts"] },
      { name: "Grooming", image: categoryImages["Grooming"] },
      { name: "Supplies", image: categoryImages["Supplies"] },
      { name: "Sustainable", image: categoryImages["Sustainable"] },
    ],
  },
  {
    name: "Jewelry",
    subcategories: [
      { name: "Essentials", image: categoryImages["Essentials"] },
      { name: "Fashion", image: categoryImages["Fashion"] },
      { name: "Women", image: categoryImages["Women"] },
      { name: "Crafts", image: categoryImages["Crafts"] },
    ],
  },
  {
    name: "Beauty",
    subcategories: [
      { name: "Grooming", image: categoryImages["Grooming"] },
      { name: "Essentials", image: categoryImages["Essentials"] },
      { name: "Women", image: categoryImages["Women"] },
      { name: "Smart", image: categoryImages["Smart"] },
    ],
  },
  {
    name: "Household",
    subcategories: [
      { name: "Essentials", image: categoryImages["Essentials"] },
      { name: "Kitchen", image: categoryImages["Kitchen"] },
      { name: "Home", image: categoryImages["Home"] },
      { name: "Supplies", image: categoryImages["Supplies"] },
    ],
  },
  {
    name: "Health",
    subcategories: [
      { name: "Fitness", image: categoryImages["Fitness"] },
      { name: "Essentials", image: categoryImages["Essentials"] },
      { name: "Smart", image: categoryImages["Smart"] },
      { name: "Grooming", image: categoryImages["Grooming"] },
    ],
  },
  {
    name: "Toys",
    subcategories: [
      { name: "Kids", image: categoryImages["Kids"] },
      { name: "Outdoor", image: categoryImages["Outdoor"] },
      { name: "Crafts", image: categoryImages["Crafts"] },
      { name: "Smart", image: categoryImages["Smart"] },
    ],
  },
  {
    name: "Tools",
    subcategories: [
      { name: "Essentials", image: categoryImages["Essentials"] },
      { name: "Outdoor", image: categoryImages["Outdoor"] },
      { name: "Smart", image: categoryImages["Smart"] },
      { name: "Supplies", image: categoryImages["Supplies"] },
    ],
  },
  {
    name: "Games",
    subcategories: [
      { name: "Kids", image: categoryImages["Kids"] },
      { name: "Smart", image: categoryImages["Smart"] },
      { name: "Outdoor", image: categoryImages["Outdoor"] },
      { name: "Fitness", image: categoryImages["Fitness"] },
    ],
  },
  {
    name: "Baby Products",
    subcategories: [
      { name: "Kids", image: categoryImages["Kids"] },
      { name: "Essentials", image: categoryImages["Essentials"] },
      { name: "Clothing", image: categoryImages["Fashion"] },
      { name: "Toys", image: categoryImages["Kids"] },
    ],
  },
  {
    name: "Outdoors Sports",
    subcategories: [
      { name: "Fitness", image: categoryImages["Fitness"] },
      { name: "Outdoor", image: categoryImages["Outdoor"] },
      { name: "Camping", image: categoryImages["Outdoor"] },
      { name: "Cycling", image: categoryImages["Fitness"] },
    ],
  },
  {
    name: "Pet Supplies",
    subcategories: [
      { name: "Grooming", image: categoryImages["Grooming"] },
      { name: "Essentials", image: categoryImages["Essentials"] },
      { name: "Supplies", image: categoryImages["Supplies"] },
      { name: "Outdoor", image: categoryImages["Outdoor"] },
    ],
  },
  {
    name: "Clothing",
    subcategories: [
      { name: "Women", image: categoryImages["Women"] },
      { name: "Fashion", image: categoryImages["Fashion"] },
      { name: "Dresses", image: categoryImages["Dresses"] },
      { name: "Kids", image: categoryImages["Kids"] },
    ],
  },
];

// Sub-subcategories with images for the right column
const subSubcategories = [
  { name: "View All", image: "" },
  { name: "Essentials", image: categoryImages["Essentials"] },
  { name: "Fitness", image: categoryImages["Fitness"] },
  { name: "Kids", image: categoryImages["Kids"] },
  { name: "Smart", image: categoryImages["Smart"] },
  { name: "Outdoor", image: categoryImages["Outdoor"] },
  { name: "Crafts", image: categoryImages["Crafts"] },
  { name: "Grooming", image: categoryImages["Grooming"] },
  { name: "Supplies", image: categoryImages["Supplies"] },
  { name: "Drones", image: categoryImages["Drones"] },
  { name: "Espresso", image: categoryImages["Espresso"] },
  { name: "Fashion", image: categoryImages["Fashion"] },
  { name: "textiles", image: categoryImages["textiles"] },
  { name: "Women", image: categoryImages["Women"] },
  { name: "Dresses", image: categoryImages["Dresses"] },
  { name: "Home", image: categoryImages["Home"] },
  { name: "Coffee", image: categoryImages["Coffee"] },
  { name: "Kitchen", image: categoryImages["Kitchen"] },
  { name: "Sustainable", image: categoryImages["Sustainable"] },
];

interface MegaMenuProps {
  isOpen: boolean;
  activeCategory: string | null;
  onCategoryHover: (category: string) => void;
  onClose: () => void;
}

// Grid icon component for View All
const GridIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const MegaMenu = ({ isOpen, activeCategory, onCategoryHover, onClose }: MegaMenuProps) => {
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentCategory = categoriesData.find((c) => c.name === activeCategory);

  // Get items for right column based on selection
  const getRightColumnItems = () => {
    if (hoveredSubcategory) {
      // Show related sub-subcategories for the selected subcategory
      return subSubcategories.slice(0, 12);
    }
    if (currentCategory) {
      // Show all subcategories with images
      return currentCategory.subcategories;
    }
    // Show general categories
    return subSubcategories.slice(0, 12);
  };

  const rightColumnItems = getRightColumnItems();

  return (
    <div
      className="absolute top-full left-0 w-full bg-white shadow-lg z-50 border-t border-border"
      onMouseEnter={() => {}}
      onMouseLeave={onClose}
      style={{ maxHeight: "calc(100vh - 120px)" }}
    >
      <div className="flex h-full max-h-[500px]">
        {/* Section 1: Main Categories List (Left Column) */}
        <div className="w-[200px] flex-shrink-0 bg-[#f8f9fa] border-r border-border overflow-y-auto mega-menu-scroll">
          {categoriesData.map((category, index) => (
            <button
              key={`${category.name}-${index}`}
              onMouseEnter={() => {
                onCategoryHover(category.name);
                setHoveredSubcategory(null);
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-[14px] transition-colors ${
                activeCategory === category.name
                  ? "bg-white text-foreground font-medium"
                  : "text-foreground hover:bg-white"
              }`}
            >
              <span>{category.name}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Section 2: Subcategories with Images (Middle Column) */}
        <div className="w-[380px] flex-shrink-0 border-r border-border overflow-y-auto mega-menu-scroll bg-white p-4">
          <h3 className="text-[15px] font-semibold text-foreground mb-4">Shop by Category</h3>
          <div className="flex flex-wrap gap-3">
            {/* View All option */}
            <button className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors w-[70px]">
              <div className="w-[60px] h-[60px] rounded-full bg-muted flex items-center justify-center">
                <GridIcon />
              </div>
              <span className="text-[11px] text-foreground text-center">View All</span>
            </button>
            {currentCategory ? (
              currentCategory.subcategories.map((sub, index) => (
                <button
                  key={`${sub.name}-${index}`}
                  onMouseEnter={() => setHoveredSubcategory(sub.name)}
                  className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-colors w-[70px] ${
                    hoveredSubcategory === sub.name ? "bg-muted" : "hover:bg-muted"
                  }`}
                >
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-muted">
                    {sub.image ? (
                      <img 
                        src={sub.image} 
                        alt={sub.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <GridIcon />
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] text-foreground text-center leading-tight">{sub.name}</span>
                </button>
              ))
            ) : (
              // Show all main categories when no category selected
              categoriesData.slice(0, 11).map((cat, index) => (
                <button
                  key={`${cat.name}-${index}`}
                  onMouseEnter={() => onCategoryHover(cat.name)}
                  className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors w-[70px]"
                >
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-muted">
                    {cat.subcategories[0]?.image ? (
                      <img 
                        src={cat.subcategories[0].image} 
                        alt={cat.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <GridIcon />
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] text-foreground text-center leading-tight">{cat.name}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Section 3: Sub-subcategories with Images (Right Column) */}
        <div className="flex-1 overflow-y-auto mega-menu-scroll bg-white p-4">
          <h3 className="text-[15px] font-semibold text-foreground mb-4">Shop by Category</h3>
          <div className="flex flex-wrap gap-3">
            {/* View All option */}
            <button className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors w-[70px]">
              <div className="w-[60px] h-[60px] rounded-full bg-muted flex items-center justify-center">
                <GridIcon />
              </div>
              <span className="text-[11px] text-foreground text-center">View All</span>
            </button>
            {rightColumnItems.map((item, index) => (
              <button
                key={`right-${item.name}-${index}`}
                className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors w-[70px]"
              >
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-muted">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <GridIcon />
                    </div>
                  )}
                </div>
                <span className="text-[11px] text-foreground text-center leading-tight">{item.name}</span>
              </button>
            ))}
          </div>
          
          {/* Additional rows to match reference */}
          <h3 className="text-[15px] font-semibold text-foreground mb-4 mt-6">Shop by Category</h3>
          <div className="flex flex-wrap gap-3">
            <button className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors w-[70px]">
              <div className="w-[60px] h-[60px] rounded-full bg-muted flex items-center justify-center">
                <GridIcon />
              </div>
              <span className="text-[11px] text-foreground text-center">View All</span>
            </button>
            {subSubcategories.slice(1, 9).map((item, index) => (
              <button
                key={`row2-${item.name}-${index}`}
                className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors w-[70px]"
              >
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-muted">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <GridIcon />
                    </div>
                  )}
                </div>
                <span className="text-[11px] text-foreground text-center leading-tight">{item.name}</span>
              </button>
            ))}
          </div>

          <h3 className="text-[15px] font-semibold text-foreground mb-4 mt-6">Shop by Category</h3>
          <div className="flex flex-wrap gap-3">
            <button className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors w-[70px]">
              <div className="w-[60px] h-[60px] rounded-full bg-muted flex items-center justify-center">
                <GridIcon />
              </div>
              <span className="text-[11px] text-foreground text-center">View All</span>
            </button>
            {subSubcategories.slice(3, 12).map((item, index) => (
              <button
                key={`row3-${item.name}-${index}`}
                className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors w-[70px]"
              >
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-muted">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <GridIcon />
                    </div>
                  )}
                </div>
                <span className="text-[11px] text-foreground text-center leading-tight">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;