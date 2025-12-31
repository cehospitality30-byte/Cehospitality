import { useState, useMemo } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Search, X, Coffee, UtensilsCrossed, Cake, ChefHat, Salad, ChevronDown, Star, Sparkles } from 'lucide-react';
import SEO from '@/components/SEO';
import { generateMenuPdf } from '@/lib/generateMenuPdf';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Import beverage category images
import classicHotImg from '@/assets/menu/classic-hot.jpg';
import cafeSpecialHotImg from '@/assets/menu/cafe-special-hot.jpg';
import icedCoffeeImg from '@/assets/menu/iced-coffee.jpg';
import coldCoffeeImg from '@/assets/menu/cold-coffee.jpg';
import icedTeasImg from '@/assets/menu/iced-teas.jpg';
import espressoInfusionImg from '@/assets/menu/espresso-infusion.jpg';
import hotTeasImg from '@/assets/menu/hot-teas.jpg';
import matchaImg from '@/assets/menu/matcha.jpg';
import chocolateImg from '@/assets/menu/chocolate.jpg';
import shakesImg from '@/assets/menu/shakes.jpg';
import mojitosImg from '@/assets/menu/mojitos.jpg';
import slashesImg from '@/assets/menu/slashes.jpg';

// Import food category images
import soupsImg from '@/assets/menu/soups.jpg';
import saladsImg from '@/assets/menu/salads.jpg';
import easyBitesImg from '@/assets/menu/easy-bites.jpg';
import appetizersVegImg from '@/assets/menu/appetizers-veg.jpg';
import appetizersNonvegImg from '@/assets/menu/appetizers-nonveg.jpg';
import sandwichesImg from '@/assets/menu/sandwiches.jpg';
import burgersImg from '@/assets/menu/burgers.jpg';
import pizzasImg from '@/assets/menu/pizzas.jpg';
import healthyBowlsImg from '@/assets/menu/healthy-bowls.jpg';
import pastaImg from '@/assets/menu/pasta.jpg';
import riceNoodlesImg from '@/assets/menu/rice-noodles.jpg';
import chefSpecialImg from '@/assets/menu/chef-special.jpg';
import breadsImg from '@/assets/menu/breads.jpg';
import dessertsImg from '@/assets/menu/desserts.jpg';
import cookiesImg from '@/assets/menu/cookies.jpg';
import cakesImg from '@/assets/menu/cakes.jpg';

interface MenuItem {
  name: string;
  price?: string;
  isSignature?: boolean;
}

interface MenuSubCategory {
  id: string;
  name: string;
  emoji: string;
  image: string;
  items: MenuItem[];
  note?: string;
  type: 'beverage' | 'veg' | 'nonveg' | 'mixed';
}

interface MainCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  subcategories: MenuSubCategory[];
}

// Original menu data organized into main categories
const menuData: MainCategory[] = [
  {
    id: 'beverages',
    name: 'Beverages',
    icon: Coffee,
    description: 'Crafted coffees, teas & refreshing drinks',
    subcategories: [
      {
        id: 'classic-hot',
        name: 'Classic Hot',
        emoji: '☕',
        image: classicHotImg,
        type: 'beverage',
        items: [
          { name: 'Espresso' },
          { name: 'Double Espresso' },
          { name: 'Espresso Cubano' },
          { name: 'Americano' },
          { name: 'Cortado' },
          { name: 'Cappuccino', isSignature: true },
          { name: 'Latte' },
          { name: 'Mocha' },
        ]
      },
      {
        id: 'cafe-special-hot',
        name: 'Café Special Hot',
        emoji: '☕',
        image: cafeSpecialHotImg,
        type: 'beverage',
        items: [
          { name: 'Hazelnut Latte', isSignature: true },
          { name: 'Caramel Latte' },
          { name: 'Popcorn Latte' },
          { name: 'Irish Latte' },
          { name: 'Lavender Mocha', isSignature: true },
        ]
      },
      {
        id: 'iced-coffee',
        name: 'Iced Coffee',
        emoji: '🧊',
        image: icedCoffeeImg,
        type: 'beverage',
        items: [
          { name: 'Iced Americano' },
          { name: 'Iced Latte' },
          { name: 'Vietnamese Shakerato', isSignature: true },
          { name: 'French Vanilla Iced Latte' },
        ]
      },
      {
        id: 'cold-coffee',
        name: 'Cold Coffee',
        emoji: '❄️',
        image: coldCoffeeImg,
        type: 'beverage',
        items: [
          { name: 'Frappe' },
          { name: 'Choco Frappe' },
          { name: 'Hazelnut Cold Coffee' },
          { name: 'Caramel Cold Coffee' },
          { name: 'Nutella Cold Coffee', isSignature: true },
          { name: 'Brownie Cold Coffee' },
        ]
      },
      {
        id: 'iced-teas',
        name: 'Iced Teas',
        emoji: '🍹',
        image: icedTeasImg,
        type: 'beverage',
        items: [
          { name: 'Lemon Iced Tea' },
          { name: 'Passion Fruit Iced Tea', isSignature: true },
          { name: 'Blueberry Iced Tea' },
          { name: 'Peach Iced Tea' },
        ]
      },
      {
        id: 'espresso-infusion',
        name: 'Espresso Cold Infusion',
        emoji: '🍊',
        image: espressoInfusionImg,
        type: 'beverage',
        items: [
          { name: 'Espresso Cranberry' },
          { name: 'Espresso Orange', isSignature: true },
          { name: 'Espresso Fruit Mix' },
          { name: 'Espresso Dust' },
          { name: 'Espresso Refresher' },
        ]
      },
      {
        id: 'hot-teas',
        name: 'Hot Teas',
        emoji: '🍵',
        image: hotTeasImg,
        type: 'beverage',
        items: [
          { name: 'Green Tea' },
          { name: 'White Ginger Tea' },
          { name: 'Ayurvedic Khada Tea' },
          { name: 'Hibiscus Honey Tea', isSignature: true },
        ]
      },
      {
        id: 'matcha',
        name: 'Matcha',
        emoji: '🍃',
        image: matchaImg,
        type: 'beverage',
        items: [
          { name: 'Iced Matcha' },
          { name: 'Oat Milk Iced Matcha' },
          { name: 'Matcha Latte', isSignature: true },
          { name: 'Hazelnut Iced Matcha' },
          { name: 'Strawberry Iced Matcha' },
          { name: 'Coconut Matcha Cloud', isSignature: true },
        ]
      },
      {
        id: 'chocolate',
        name: 'Signature Chocolate',
        emoji: '🍫',
        image: chocolateImg,
        type: 'beverage',
        items: [
          { name: 'Hot Chocolate', isSignature: true },
          { name: 'Spiced Hot Chocolate' },
          { name: 'Iced Chocolate' },
        ]
      },
      {
        id: 'shakes',
        name: 'Shakes',
        emoji: '🥤',
        image: shakesImg,
        type: 'beverage',
        items: [
          { name: 'Vanilla Shake' },
          { name: 'Chocolate Shake' },
          { name: 'Blueberry Shake' },
          { name: 'Ferrero Rocher Shake', isSignature: true },
          { name: 'Mango Shake' },
          { name: 'Strawberry Shake' },
          { name: 'Mix Fruit Shake' },
          { name: 'Pina Colada' },
        ]
      },
      {
        id: 'mojitos',
        name: 'Mojitos & Refreshers',
        emoji: '🌿',
        image: mojitosImg,
        type: 'beverage',
        items: [
          { name: 'Virgin Mojito' },
          { name: 'Fresh Lime Soda (Sweet / Salt)' },
          { name: 'Melon Refresher' },
          { name: 'Orange Refresher' },
          { name: 'Spiced Jamun Refresher', isSignature: true },
          { name: 'Blue Lagoon' },
          { name: 'Cosmopolitan' },
          { name: 'Ginger Ale' },
          { name: 'Aampanna Mojito' },
          { name: 'Kiwi Mojito' },
          { name: 'Blue Mojito', isSignature: true },
          { name: 'Men at Work' },
          { name: 'Blueberry Mojito' },
          { name: 'Black Currant Mojito' },
          { name: 'Big Billion' },
          { name: 'Raspberry Mojito' },
        ]
      },
      {
        id: 'slashes',
        name: 'Slashes',
        emoji: '❄️',
        image: slashesImg,
        type: 'beverage',
        items: [
          { name: 'Kiwi Slashes' },
          { name: 'Mango Slashes' },
          { name: 'Strawberry Slashes' },
          { name: 'Blueberry Slashes' },
        ]
      },
    ]
  },
  {
    id: 'starters',
    name: 'Starters',
    icon: Salad,
    description: 'Soups, salads & appetizing bites',
    subcategories: [
      {
        id: 'soups',
        name: 'Soup',
        emoji: '🍲',
        image: soupsImg,
        type: 'mixed',
        items: [
          { name: 'Tomato Basil', price: '₹199' },
          { name: 'Spinach & Broccoli', price: '₹229' },
          { name: 'Cream of Mushroom', price: '₹229', isSignature: true },
          { name: 'Tom Kha', price: '₹219' },
          { name: 'Chicken Chowder', price: '₹239' },
          { name: 'Hot & Sour Chicken', price: '₹219' },
          { name: 'Man Chow Chicken', price: '₹219' },
          { name: 'Tom Yum Seafood', price: '₹239', isSignature: true },
        ]
      },
      {
        id: 'salads',
        name: 'Salad',
        emoji: '🥗',
        image: saladsImg,
        type: 'veg',
        items: [
          { name: 'Millet & Root Vegetable', price: '₹249' },
          { name: 'Watermelon & Feta', price: '₹279', isSignature: true },
          { name: 'Caesar Salad', price: '₹269' },
        ],
        note: 'Add-ons: Chicken – ₹99 | Seafood – ₹129 | Multi Seed – ₹79'
      },
      {
        id: 'easy-bites',
        name: 'Easy Bites',
        emoji: '🍟',
        image: easyBitesImg,
        type: 'mixed',
        items: [
          { name: 'Fries (Salted / Peri Peri / Cheesy / Karam Podi)', price: '₹199 / ₹229 / ₹249 / ₹229' },
          { name: 'Lotus Stem Chips', price: '₹229', isSignature: true },
          { name: 'Fish Fingers', price: '₹299' },
        ]
      },
      {
        id: 'appetizers-veg',
        name: 'Appetizers – Veg',
        emoji: '🌱',
        image: appetizersVegImg,
        type: 'veg',
        items: [
          { name: 'Nachos Veg', price: '₹299' },
          { name: 'Pesto Mushroom Toast', price: '₹249', isSignature: true },
          { name: 'Pepper Toast', price: '₹219' },
          { name: 'Cheese Jalapeno Poppers', price: '₹289' },
          { name: 'Avocado Nigiri', price: '₹299', isSignature: true },
          { name: 'Kung Pao Paneer', price: '₹279' },
          { name: 'Mushroom Salt & Pepper', price: '₹279' },
        ]
      },
      {
        id: 'appetizers-nonveg',
        name: 'Appetizers – Non Veg',
        emoji: '🍗',
        image: appetizersNonvegImg,
        type: 'nonveg',
        items: [
          { name: 'Nachos Chicken', price: '₹329' },
          { name: 'Crispy Parmesan Chicken', price: '₹329', isSignature: true },
          { name: 'Salmon Nigiri', price: '₹329', isSignature: true },
          { name: 'Kung Pao Chicken', price: '₹299' },
          { name: 'Chicken Chilli', price: '₹279' },
          { name: 'Crispy Pepper Chicken', price: '₹269' },
          { name: 'Chicken Takrai', price: '₹319' },
          { name: 'California Roll', price: '₹349', isSignature: true },
        ]
      },
    ]
  },
  {
    id: 'main-course',
    name: 'Main Course',
    icon: UtensilsCrossed,
    description: 'Hearty sandos, burgers, pasta & more',
    subcategories: [
      {
        id: 'sandwiches',
        name: 'Sando',
        emoji: '🥪',
        image: sandwichesImg,
        type: 'mixed',
        items: [
          { name: 'Bombay Style Sandwich', price: '₹249' },
          { name: 'American Spinach Ricotta', price: '₹299' },
          { name: 'Red Roaster Home Cheese Sando', price: '₹279', isSignature: true },
          { name: 'Grilled Chicken & Avocado Sando', price: '₹299', isSignature: true },
          { name: 'Cuban Sando', price: '₹279' },
          { name: 'Red Roaster Chicken Sando', price: '₹299' },
        ],
        note: 'All sandwiches served with fries'
      },
      {
        id: 'burgers',
        name: 'Burgers',
        emoji: '🍔',
        image: burgersImg,
        type: 'mixed',
        items: [
          { name: 'Veggies Overloaded', price: '₹249' },
          { name: 'Paneer Chilli Burger', price: '₹249' },
          { name: 'Chicken Crunch', price: '₹299', isSignature: true },
          { name: 'Korean Chicken Burger', price: '₹299', isSignature: true },
        ],
        note: 'All burgers served with fries'
      },
      {
        id: 'pizzas',
        name: 'Pizza (9 inch)',
        emoji: '🍕',
        image: pizzasImg,
        type: 'mixed',
        items: [
          { name: 'Classic Margherita', price: '₹369' },
          { name: 'Farm House', price: '₹399' },
          { name: 'Pesto Al Fungi', price: '₹399', isSignature: true },
          { name: 'Pesto Polo', price: '₹429' },
          { name: 'Polo Mexican', price: '₹429' },
          { name: 'Chicken Pepperoni', price: '₹429', isSignature: true },
        ]
      },
      {
        id: 'healthy-bowls',
        name: 'Healthy Bowls',
        emoji: '🥗',
        image: healthyBowlsImg,
        type: 'veg',
        items: [
          { name: 'Quinoa Bowl', price: '₹299', isSignature: true },
          { name: 'Millet Bowl', price: '₹299' },
        ],
        note: 'Add-ons: Chicken – ₹99 | Seafood – ₹109'
      },
      {
        id: 'pasta',
        name: 'Pasta',
        emoji: '🍝',
        image: pastaImg,
        type: 'mixed',
        items: [
          { name: 'Alfredo (Veg / Non Veg)', price: '₹319 / ₹349' },
          { name: 'Arrabbiata (Veg / Non Veg)', price: '₹309 / ₹339' },
          { name: 'Pesto (Veg / Non Veg)', price: '₹329 / ₹359', isSignature: true },
          { name: 'Aglio e Olio (Veg / Non Veg)', price: '₹299 / ₹329' },
        ],
        note: 'Available in Penne / Spaghetti'
      },
      {
        id: 'rice-noodles',
        name: 'Rice & Noodles',
        emoji: '🍜',
        image: riceNoodlesImg,
        type: 'mixed',
        items: [
          { name: 'Pad Thai Noodles', price: '₹299', isSignature: true },
          { name: 'Vegan Ramen', price: '₹299' },
          { name: 'Hakka Noodles', price: '₹249' },
          { name: 'Veg Fried Rice (Plain / Schezwan)', price: '₹229 / ₹249' },
          { name: 'Egg Fried Rice (Plain / Schezwan)', price: '₹249 / ₹269' },
          { name: 'Chicken Fried Rice (Plain / Schezwan)', price: '₹269 / ₹289' },
        ]
      },
      {
        id: 'breads',
        name: 'Breads & Croissants',
        emoji: '🍞',
        image: breadsImg,
        type: 'veg',
        items: [
          { name: 'Focaccia', price: '₹150' },
          { name: 'Brioche Loaf (500g)', price: '₹240' },
          { name: 'Sandwich Loaf (1500g)', price: '₹120' },
          { name: 'Multigrain Loaf (1500g)', price: '₹150' },
          { name: 'Butter Croissant', price: '₹85' },
          { name: 'Chocolate Croissant', price: '₹129', isSignature: true },
        ]
      },
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: Cake,
    description: 'Sweet endings & baked delights',
    subcategories: [
      {
        id: 'desserts',
        name: 'Desserts',
        emoji: '🍰',
        image: dessertsImg,
        type: 'veg',
        items: [
          { name: 'Classic Tiramisu', price: '₹249', isSignature: true },
          { name: 'Opera Cake', price: '₹249' },
          { name: 'Tres Leches', price: '₹199', isSignature: true },
          { name: 'Classic New York Cheesecake', price: '₹199' },
          { name: 'Russian Medovik', price: '₹119' },
          { name: 'Red Velvet Cupcake', price: '₹99' },
          { name: 'Triple Chocolate Brownie with Vanilla Ice Cream', price: '₹199', isSignature: true },
          { name: 'Apricot Delight', price: '₹249' },
          { name: 'Coconut Mousse', price: '₹249' },
          { name: 'Panna Cotta (Seasonal Fruit / Chocolate)', price: '₹219 / ₹209' },
        ]
      },
      {
        id: 'cookies',
        name: 'Cookies & Berliners',
        emoji: '🍪',
        image: cookiesImg,
        type: 'veg',
        items: [
          { name: 'Choco Chip Cookie', price: '₹69' },
          { name: 'Oatmeal Raisin Cookie', price: '₹59' },
          { name: 'French Macaron (6 pcs)', price: '₹199', isSignature: true },
          { name: 'Chocolate Berliner', price: '₹149' },
          { name: 'Blueberry Berliner', price: '₹149' },
          { name: 'Chocolate Doughnut', price: '₹119' },
        ]
      },
      {
        id: 'cakes',
        name: 'Cakes',
        emoji: '🎂',
        image: cakesImg,
        type: 'veg',
        items: [
          { name: 'Red Velvet (500g)', price: '₹750', isSignature: true },
          { name: 'Black Forest', price: '₹650' },
          { name: 'Belgium Chocolate', price: '₹700', isSignature: true },
        ]
      },
    ]
  },
  {
    id: 'chef-specials',
    name: 'Chef Specials',
    icon: ChefHat,
    description: 'Signature creations by our culinary masters',
    subcategories: [
      {
        id: 'chef-special',
        name: 'Chef Special',
        emoji: '👨‍🍳',
        image: chefSpecialImg,
        type: 'mixed',
        items: [
          { name: 'Stuffed Chicken with Orange Capers Sauce', price: '₹349', isSignature: true },
          { name: 'Steam Pomfret with Creamy Garlic Sauce', price: '₹449', isSignature: true },
          { name: 'Pesto Rice with Creamy Paprika Vegetable', price: '₹329', isSignature: true },
          { name: 'Spicy Thai Basil Tofu with Jasmine Rice', price: '₹349', isSignature: true },
          { name: 'Chicken Steak with Red Wine Sauce', price: '₹399', isSignature: true },
          { name: 'Triple Schezwan Fried Rice', price: '₹249' },
          { name: 'Stir Fried Tofu', price: '₹249' },
          { name: 'Gochujang Korean Wings', price: '₹229', isSignature: true },
        ]
      },
    ]
  },
];

// Featured items for showcase section - curated selection
const featuredItems = [
  {
    id: 'featured-cappuccino',
    name: 'Cappuccino',
    category: 'Classic Hot',
    image: classicHotImg,
    description: 'Rich espresso with velvety steamed milk foam',
    tag: 'Bestseller',
  },
  {
    id: 'featured-hazelnut-latte',
    name: 'Hazelnut Latte',
    category: 'Café Special',
    image: cafeSpecialHotImg,
    description: 'Aromatic hazelnut infused with creamy espresso',
    tag: 'Signature',
  },
  {
    id: 'featured-matcha-latte',
    name: 'Matcha Latte',
    category: 'Matcha',
    image: matchaImg,
    description: 'Premium Japanese matcha with smooth oat milk',
    tag: 'Must Try',
  },
  {
    id: 'featured-tiramisu',
    name: 'Classic Tiramisu',
    category: 'Desserts',
    image: dessertsImg,
    description: 'Authentic Italian layered coffee dessert',
    price: '₹249',
    tag: 'Chef\'s Pick',
  },
  {
    id: 'featured-chicken-steak',
    name: 'Chicken Steak',
    category: 'Chef Special',
    image: chefSpecialImg,
    description: 'Tender chicken with red wine reduction sauce',
    price: '₹399',
    tag: 'Premium',
  },
  {
    id: 'featured-pizza',
    name: 'Chicken Pepperoni',
    category: 'Pizza',
    image: pizzasImg,
    description: 'Wood-fired pizza with premium pepperoni',
    price: '₹429',
    tag: 'Popular',
  },
];

// Flatten for PDF generation (keep original format)
const flatMenuData = menuData.flatMap(main => 
  main.subcategories.map(sub => ({
    id: sub.id,
    name: sub.name,
    emoji: sub.emoji,
    image: sub.image,
    items: sub.items,
    note: sub.note,
    type: sub.type,
  }))
);

// Menu Schema for SEO
const menuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "name": "Cozmo Cafe Bistro Lounge Menu",
  "description": "Complete café menu featuring coffee, teas, food, desserts and more at Cozmo Cafe Hyderabad",
  "hasMenuSection": flatMenuData.map(category => ({
    "@type": "MenuSection",
    "name": category.name,
    "hasMenuItem": category.items.map(item => ({
      "@type": "MenuItem",
      "name": item.name,
      ...(item.price && {
        "offers": {
          "@type": "Offer",
          "price": item.price.replace('₹', '').split(' ')[0],
          "priceCurrency": "INR"
        }
      })
    }))
  }))
};

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Get all subcategories for the full menu
  const allSubcategories = useMemo(() => {
    return menuData.flatMap(main => 
      main.subcategories.map(sub => ({
        ...sub,
        mainCategory: main.name,
        mainCategoryId: main.id,
        mainIcon: main.icon,
      }))
    );
  }, []);

  // Filter subcategories based on search
  const filteredSubcategories = useMemo(() => {
    if (!searchQuery.trim()) return allSubcategories;
    
    const query = searchQuery.toLowerCase();
    return allSubcategories
      .map(sub => ({
        ...sub,
        items: sub.items.filter(item => 
          item.name.toLowerCase().includes(query) || 
          sub.name.toLowerCase().includes(query)
        )
      }))
      .filter(sub => sub.items.length > 0);
  }, [allSubcategories, searchQuery]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedCategories(new Set(allSubcategories.map(sub => sub.id)));
  };

  const collapseAll = () => {
    setExpandedCategories(new Set());
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Menu | Cozmo Cafe Bistro Lounge Hyderabad - Coffee, Food, Desserts & More"
        description="Explore our complete café menu at Cozmo Cafe Hyderabad. Classic coffee, specialty lattes, matcha, pizzas, pasta, burgers, desserts and more. Best café menu in KPHB."
        keywords="cafe menu Hyderabad, coffee menu KPHB, pizza, pasta, burgers, desserts, shakes, mojitos, iced tea, café food"
        canonicalUrl="https://cozmocafe.com/menu"
        structuredData={menuSchema}
      />
      
      <Navigation />
      
      {/* Hero Section - Minimal & Elegant */}
      <section className="relative pt-24 pb-6 bg-gradient-to-b from-card to-background overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 opacity-0 animate-fade-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            Our <span className="text-gradient-gold">Menu</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-5 opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            A curated selection of artisanal beverages and culinary delights
          </p>
          
          {/* Search & Download */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search our menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 py-2.5 h-10 bg-card/50 backdrop-blur-sm border-border/50 text-foreground placeholder:text-muted-foreground rounded-full text-sm focus:border-primary/50 focus:ring-primary/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                generateMenuPdf(flatMenuData);
                toast.success('Menu PDF downloaded!');
              }}
              className="h-10 px-4 rounded-full border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 whitespace-nowrap text-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 1: Featured Showcase */}
      {!searchQuery && (
        <section className="py-8 bg-gradient-to-b from-background to-card/30">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="font-display text-2xl md:text-3xl text-foreground">
                Featured <span className="text-primary">Selections</span>
              </h2>
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            
            {/* Featured Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {featuredItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="group relative rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 opacity-0 animate-fade-up"
                  style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    
                    {/* Tag */}
                    <div className="absolute top-2 right-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-semibold backdrop-blur-sm">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        {item.tag}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-3">
                    <p className="text-[10px] text-primary/80 font-medium uppercase tracking-wider mb-0.5">
                      {item.category}
                    </p>
                    <h3 className="font-display text-sm text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    {item.price && (
                      <p className="mt-2 text-sm font-semibold text-primary">{item.price}</p>
                    )}
                  </div>
                  
                  {/* Gold border glow on hover */}
                  <div className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      {!searchQuery && (
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Full Menu</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>
      )}

      {/* SECTION 2: Full Detailed Menu - Accordion Style */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          {/* Expand/Collapse Controls */}
          <div className="flex items-center justify-between mb-4 max-w-4xl mx-auto">
            <p className="text-sm text-muted-foreground">
              {filteredSubcategories.length} categories • {filteredSubcategories.reduce((acc, sub) => acc + sub.items.length, 0)} items
            </p>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={expandAll}
                className="text-xs h-8 text-muted-foreground hover:text-foreground"
              >
                Expand All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={collapseAll}
                className="text-xs h-8 text-muted-foreground hover:text-foreground"
              >
                Collapse All
              </Button>
            </div>
          </div>

          {/* No Results */}
          {filteredSubcategories.length === 0 ? (
            <div className="text-center py-16 max-w-md mx-auto">
              <p className="text-lg text-muted-foreground mb-4">No items found for "{searchQuery}"</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSearchQuery('')}
                className="rounded-full"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            /* Accordion Menu */
            <div className="space-y-2 max-w-4xl mx-auto">
              {filteredSubcategories.map((sub, idx) => {
                const isOpen = expandedCategories.has(sub.id);
                const isChefSpecial = sub.mainCategoryId === 'chef-specials';
                
                return (
                  <div 
                    key={sub.id}
                    className={cn(
                      "rounded-xl overflow-hidden border transition-all duration-300",
                      isChefSpecial 
                        ? "border-primary/40 bg-gradient-to-r from-primary/5 via-card/50 to-primary/5" 
                        : "border-border/30 bg-card/30 backdrop-blur-sm hover:border-border/50"
                    )}
                    style={{ animationDelay: `${idx * 30}ms` }}
                  >
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(sub.id)}
                      className="w-full flex items-center gap-3 p-3 md:p-4 text-left transition-colors hover:bg-card/50"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-border/30">
                        <img 
                          src={sub.image} 
                          alt={sub.name}
                          className="w-full h-full object-cover"
                        />
                        {isChefSpecial && (
                          <div className="absolute inset-0 bg-primary/20" />
                        )}
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-base">{sub.emoji}</span>
                          <h3 className={cn(
                            "font-display text-base md:text-lg truncate",
                            isChefSpecial ? "text-primary" : "text-foreground"
                          )}>
                            {sub.name}
                          </h3>
                          {isChefSpecial && (
                            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
                              <Star className="w-2.5 h-2.5 fill-current" />
                              Must Try
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          {sub.mainCategory} • {sub.items.length} item{sub.items.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      
                      {/* Chevron */}
                      <ChevronDown 
                        className={cn(
                          "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0",
                          isOpen && "rotate-180 text-primary"
                        )} 
                      />
                    </button>

                    {/* Expandable Content */}
                    <div 
                      className={cn(
                        "grid transition-all duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="px-3 pb-4 md:px-4 md:pb-5 pt-1 border-t border-border/20">
                          {/* Items Grid */}
                          <div className={cn(
                            "grid gap-2",
                            isChefSpecial 
                              ? "grid-cols-1 md:grid-cols-2" 
                              : "grid-cols-1 sm:grid-cols-2"
                          )}>
                            {sub.items.map((item, itemIdx) => (
                              <div 
                                key={itemIdx}
                                className={cn(
                                  "flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg transition-all duration-200 group/item",
                                  item.isSignature 
                                    ? "bg-primary/8 hover:bg-primary/15 border border-primary/20" 
                                    : "hover:bg-muted/30"
                                )}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  {item.isSignature ? (
                                    <Star className="w-3.5 h-3.5 text-primary fill-primary/30 flex-shrink-0" />
                                  ) : (
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary transition-colors flex-shrink-0" />
                                  )}
                                  <span className={cn(
                                    "text-sm text-foreground group-hover/item:text-primary transition-colors",
                                    item.isSignature && "font-medium"
                                  )}>
                                    {item.name}
                                  </span>
                                </div>
                                {item.price && (
                                  <span className="text-sm font-medium text-primary whitespace-nowrap">
                                    {item.price}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {/* Note */}
                          {sub.note && (
                            <p className="mt-3 text-xs text-muted-foreground italic px-3 py-2 bg-muted/20 rounded-lg">
                              {sub.note}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
