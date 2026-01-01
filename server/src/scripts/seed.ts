import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';
import Booking from '../models/Booking.js';
import Contact from '../models/Contact.js';
import Service from '../models/Service.js';
import Offer from '../models/Offer.js';
import GalleryImage from '../models/GalleryImage.js';
import Leader from '../models/Leader.js';
import Content from '../models/Content.js';

const mongoURI = 'mongodb+srv://babu789387_db_user:676F1gc3Ivb9hwXq@cluster0.64ute6w.mongodb.net/CAHospility?retryWrites=true&w=majority&tls=true&tlsInsecure=false&appName=Cluster0';

const connectionOptions = {
  serverApi: {
    version: '1' as const,
    strict: true,
    deprecationErrors: true,
  },
};

// Menu Items Data
const menuItemsData = [
  // Beverages - Classic Hot
  { name: 'Espresso', category: 'Beverages', subcategory: 'Classic Hot', type: 'beverage', isSignature: false },
  { name: 'Double Espresso', category: 'Beverages', subcategory: 'Classic Hot', type: 'beverage', isSignature: false },
  { name: 'Americano', category: 'Beverages', subcategory: 'Classic Hot', type: 'beverage', isSignature: false },
  { name: 'Cappuccino', category: 'Beverages', subcategory: 'Classic Hot', type: 'beverage', isSignature: true },
  { name: 'Latte', category: 'Beverages', subcategory: 'Classic Hot', type: 'beverage', isSignature: false },
  { name: 'Mocha', category: 'Beverages', subcategory: 'Classic Hot', type: 'beverage', isSignature: false },
  
  // Beverages - Café Special Hot
  { name: 'Hazelnut Latte', category: 'Beverages', subcategory: 'Café Special Hot', type: 'beverage', isSignature: true },
  { name: 'Caramel Latte', category: 'Beverages', subcategory: 'Café Special Hot', type: 'beverage', isSignature: false },
  { name: 'Lavender Mocha', category: 'Beverages', subcategory: 'Café Special Hot', type: 'beverage', isSignature: true },
  
  // Beverages - Iced Coffee
  { name: 'Iced Americano', category: 'Beverages', subcategory: 'Iced Coffee', type: 'beverage', isSignature: false },
  { name: 'Iced Latte', category: 'Beverages', subcategory: 'Iced Coffee', type: 'beverage', isSignature: false },
  { name: 'Vietnamese Shakerato', category: 'Beverages', subcategory: 'Iced Coffee', type: 'beverage', isSignature: true },
  
  // Beverages - Cold Coffee
  { name: 'Frappe', category: 'Beverages', subcategory: 'Cold Coffee', type: 'beverage', isSignature: false },
  { name: 'Choco Frappe', category: 'Beverages', subcategory: 'Cold Coffee', type: 'beverage', isSignature: false },
  { name: 'Nutella Cold Coffee', category: 'Beverages', subcategory: 'Cold Coffee', type: 'beverage', isSignature: true },
  
  // Beverages - Iced Teas
  { name: 'Lemon Iced Tea', category: 'Beverages', subcategory: 'Iced Teas', type: 'beverage', isSignature: false },
  { name: 'Passion Fruit Iced Tea', category: 'Beverages', subcategory: 'Iced Teas', type: 'beverage', isSignature: true },
  { name: 'Blueberry Iced Tea', category: 'Beverages', subcategory: 'Iced Teas', type: 'beverage', isSignature: false },
  
  // Beverages - Matcha
  { name: 'Iced Matcha', category: 'Beverages', subcategory: 'Matcha', type: 'beverage', isSignature: false },
  { name: 'Matcha Latte', category: 'Beverages', subcategory: 'Matcha', type: 'beverage', isSignature: true },
  { name: 'Coconut Matcha Cloud', category: 'Beverages', subcategory: 'Matcha', type: 'beverage', isSignature: true },
  
  // Beverages - Shakes
  { name: 'Vanilla Shake', category: 'Beverages', subcategory: 'Shakes', type: 'beverage', isSignature: false },
  { name: 'Chocolate Shake', category: 'Beverages', subcategory: 'Shakes', type: 'beverage', isSignature: false },
  { name: 'Ferrero Rocher Shake', category: 'Beverages', subcategory: 'Shakes', type: 'beverage', isSignature: true },
  
  // Beverages - Mojitos
  { name: 'Virgin Mojito', category: 'Beverages', subcategory: 'Mojitos & Refreshers', type: 'beverage', isSignature: false },
  { name: 'Spiced Jamun Refresher', category: 'Beverages', subcategory: 'Mojitos & Refreshers', type: 'beverage', isSignature: true },
  { name: 'Blue Mojito', category: 'Beverages', subcategory: 'Mojitos & Refreshers', type: 'beverage', isSignature: true },
  
  // Starters - Soups
  { name: 'Tomato Basil', category: 'Starters', subcategory: 'Soup', price: '₹199', type: 'mixed', isSignature: false },
  { name: 'Cream of Mushroom', category: 'Starters', subcategory: 'Soup', price: '₹229', type: 'mixed', isSignature: true },
  { name: 'Tom Yum Seafood', category: 'Starters', subcategory: 'Soup', price: '₹239', type: 'mixed', isSignature: true },
  
  // Starters - Salads
  { name: 'Millet & Root Vegetable', category: 'Starters', subcategory: 'Salad', price: '₹249', type: 'veg', isSignature: false },
  { name: 'Watermelon & Feta', category: 'Starters', subcategory: 'Salad', price: '₹279', type: 'veg', isSignature: true },
  { name: 'Caesar Salad', category: 'Starters', subcategory: 'Salad', price: '₹269', type: 'veg', isSignature: false },
  
  // Starters - Appetizers Veg
  { name: 'Nachos Veg', category: 'Starters', subcategory: 'Appetizers – Veg', price: '₹299', type: 'veg', isSignature: false },
  { name: 'Pesto Mushroom Toast', category: 'Starters', subcategory: 'Appetizers – Veg', price: '₹249', type: 'veg', isSignature: true },
  { name: 'Avocado Nigiri', category: 'Starters', subcategory: 'Appetizers – Veg', price: '₹299', type: 'veg', isSignature: true },
  
  // Starters - Appetizers Non Veg
  { name: 'Nachos Chicken', category: 'Starters', subcategory: 'Appetizers – Non Veg', price: '₹329', type: 'nonveg', isSignature: false },
  { name: 'Crispy Parmesan Chicken', category: 'Starters', subcategory: 'Appetizers – Non Veg', price: '₹329', type: 'nonveg', isSignature: true },
  { name: 'Salmon Nigiri', category: 'Starters', subcategory: 'Appetizers – Non Veg', price: '₹329', type: 'nonveg', isSignature: true },
  { name: 'California Roll', category: 'Starters', subcategory: 'Appetizers – Non Veg', price: '₹349', type: 'nonveg', isSignature: true },
  
  // Main Course - Sandwiches
  { name: 'Bombay Style Sandwich', category: 'Main Course', subcategory: 'Sando', price: '₹249', type: 'mixed', isSignature: false },
  { name: 'Red Roaster Home Cheese Sando', category: 'Main Course', subcategory: 'Sando', price: '₹279', type: 'mixed', isSignature: true },
  { name: 'Grilled Chicken & Avocado Sando', category: 'Main Course', subcategory: 'Sando', price: '₹299', type: 'mixed', isSignature: true },
  
  // Main Course - Burgers
  { name: 'Veggies Overloaded', category: 'Main Course', subcategory: 'Burgers', price: '₹249', type: 'mixed', isSignature: false },
  { name: 'Chicken Crunch', category: 'Main Course', subcategory: 'Burgers', price: '₹299', type: 'mixed', isSignature: true },
  { name: 'Korean Chicken Burger', category: 'Main Course', subcategory: 'Burgers', price: '₹299', type: 'mixed', isSignature: true },
  
  // Main Course - Pizzas
  { name: 'Classic Margherita', category: 'Main Course', subcategory: 'Pizza (9 inch)', price: '₹369', type: 'mixed', isSignature: false },
  { name: 'Pesto Al Fungi', category: 'Main Course', subcategory: 'Pizza (9 inch)', price: '₹399', type: 'mixed', isSignature: true },
  { name: 'Chicken Pepperoni', category: 'Main Course', subcategory: 'Pizza (9 inch)', price: '₹429', type: 'mixed', isSignature: true },
  
  // Main Course - Pasta
  { name: 'Alfredo (Veg / Non Veg)', category: 'Main Course', subcategory: 'Pasta', price: '₹319 / ₹349', type: 'mixed', isSignature: false },
  { name: 'Pesto (Veg / Non Veg)', category: 'Main Course', subcategory: 'Pasta', price: '₹329 / ₹359', type: 'mixed', isSignature: true },
  
  // Main Course - Rice & Noodles
  { name: 'Pad Thai Noodles', category: 'Main Course', subcategory: 'Rice & Noodles', price: '₹299', type: 'mixed', isSignature: true },
  { name: 'Chicken Fried Rice (Plain / Schezwan)', category: 'Main Course', subcategory: 'Rice & Noodles', price: '₹269 / ₹289', type: 'mixed', isSignature: false },
  
  // Desserts
  { name: 'Classic Tiramisu', category: 'Desserts', subcategory: 'Desserts', price: '₹249', type: 'veg', isSignature: true },
  { name: 'Tres Leches', category: 'Desserts', subcategory: 'Desserts', price: '₹199', type: 'veg', isSignature: true },
  { name: 'Triple Chocolate Brownie with Vanilla Ice Cream', category: 'Desserts', subcategory: 'Desserts', price: '₹199', type: 'veg', isSignature: true },
  { name: 'Red Velvet Cupcake', category: 'Desserts', subcategory: 'Desserts', price: '₹99', type: 'veg', isSignature: false },
  
  // Desserts - Cookies
  { name: 'Choco Chip Cookie', category: 'Desserts', subcategory: 'Cookies & Berliners', price: '₹69', type: 'veg', isSignature: false },
  { name: 'French Macaron (6 pcs)', category: 'Desserts', subcategory: 'Cookies & Berliners', price: '₹199', type: 'veg', isSignature: true },
  
  // Desserts - Cakes
  { name: 'Red Velvet (500g)', category: 'Desserts', subcategory: 'Cakes', price: '₹750', type: 'veg', isSignature: true },
  { name: 'Belgium Chocolate', category: 'Desserts', subcategory: 'Cakes', price: '₹700', type: 'veg', isSignature: true },
  
  // Chef Specials
  { name: 'Stuffed Chicken with Orange Capers Sauce', category: 'Chef Specials', subcategory: 'Chef Special', price: '₹349', type: 'mixed', isSignature: true },
  { name: 'Steam Pomfret with Creamy Garlic Sauce', category: 'Chef Specials', subcategory: 'Chef Special', price: '₹449', type: 'mixed', isSignature: true },
  { name: 'Pesto Rice with Creamy Paprika Vegetable', category: 'Chef Specials', subcategory: 'Chef Special', price: '₹329', type: 'mixed', isSignature: true },
  { name: 'Chicken Steak with Red Wine Sauce', category: 'Chef Specials', subcategory: 'Chef Special', price: '₹399', type: 'mixed', isSignature: true },
  { name: 'Gochujang Korean Wings', category: 'Chef Specials', subcategory: 'Chef Special', price: '₹229', type: 'mixed', isSignature: true },
];

// Services Data
const servicesData = [
  {
    title: 'Premium Dine-In',
    description: 'Experience our elegant cafe and lounge ambiance with attentive service, perfect for couples and families in Hyderabad.',
    icon: 'UtensilsCrossed',
    isActive: true,
  },
  {
    title: 'Takeaway & Delivery',
    description: 'Enjoy Cozmo Cafe\'s premium coffee and food delivered to your doorstep across Hyderabad.',
    icon: 'Truck',
    isActive: true,
  },
  {
    title: 'Party & Event Catering',
    description: 'Elevate your celebrations with our professional catering services for birthdays, anniversaries, and corporate events.',
    icon: 'PartyPopper',
    isActive: true,
  },
  {
    title: 'Private Dining',
    description: 'Exclusive private spaces for romantic dinners, intimate gatherings, and special celebrations in Hyderabad.',
    icon: 'Users',
    isActive: true,
  },
  {
    title: 'Live Entertainment',
    description: 'Weekend nights come alive with live music and curated entertainment at our lounge in Hyderabad.',
    icon: 'Sparkles',
    isActive: true,
  },
  {
    title: 'Corporate Events',
    description: 'Professional venue for business meetings, product launches, and corporate gatherings in Hyderabad.',
    icon: 'Building2',
    isActive: true,
  },
];

// Offers Data
const offersData = [
  {
    title: 'Weekend Special',
    description: '20% off on all beverages every weekend',
    discount: '20%',
    code: 'WEEKEND20',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: true,
  },
  {
    title: 'Happy Hour',
    description: 'Buy 2 Get 1 Free on mocktails (4 PM - 7 PM)',
    discount: '33%',
    code: 'HAPPYHOUR',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: true,
  },
  {
    title: 'Student Discount',
    description: '15% off for students with valid ID',
    discount: '15%',
    code: 'STUDENT15',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: true,
  },
];

// Bookings Data
const bookingsData = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    date: new Date('2024-02-15'),
    time: '19:00',
    guests: 4,
    message: 'Window seat preferred, celebrating anniversary',
    status: 'pending' as const,
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+91 9876543211',
    date: new Date('2024-02-16'),
    time: '20:30',
    guests: 2,
    status: 'confirmed' as const,
  },
  {
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+91 9876543212',
    date: new Date('2024-02-17'),
    time: '18:00',
    guests: 6,
    message: 'Birthday celebration for my daughter',
    status: 'pending' as const,
  },
  {
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    phone: '+91 9876543213',
    date: new Date('2024-02-18'),
    time: '19:30',
    guests: 3,
    status: 'confirmed' as const,
  },
];

// Contacts Data
const contactsData = [
  {
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '+91 9876543220',
    subject: 'Catering Inquiry',
    message: 'I would like to inquire about catering services for a corporate event on March 15th. We expect around 50 guests. Please let me know about your packages and availability.',
    status: 'unread' as const,
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    subject: 'Feedback',
    message: 'Great experience at your cafe! The food was excellent and the service was outstanding. Will definitely visit again.',
    status: 'read' as const,
  },
  {
    name: 'Robert Wilson',
    email: 'robert.wilson@example.com',
    phone: '+91 9876543221',
    subject: 'Private Dining',
    message: 'Interested in booking private dining space for our anniversary dinner on February 20th. Party of 4.',
    status: 'unread' as const,
  },
  {
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    subject: 'Menu Question',
    message: 'Do you have vegetarian options for the chef specials? Also, are your desserts eggless?',
    status: 'read' as const,
  },
];

// Leaders Data
const leadersData = [
  {
    name: 'Samuel Charles',
    role: 'Founder & CEO',
    description: 'With over 15 years in luxury hospitality, Samuel leads the group\'s strategic vision and expansion across Hyderabad and beyond.',
  },
  {
    name: 'Padma Vijaya',
    role: 'Director of Operations',
    description: 'Padma ensures seamless operations across all venues. Her expertise in hospitality management guarantees consistent quality and service excellence.',
  },
  {
    name: 'Sidhaartha',
    role: 'Culinary Director',
    description: 'An award-winning chef bringing innovative cuisine and exceptional dining experiences. Sidhaartha curates our menus with creativity and precision.',
  },
  {
    name: 'Vidya Sagar',
    role: 'Brand Director',
    description: 'Vidya shapes the visual identity and guest experience across all C E Hospitality brands, ensuring consistency and memorable impressions.',
  },
];

// Gallery Images Data
const galleryImagesData = [
  {
    url: '/src/assets/hero-lounge.jpg',
    title: 'Lounge Interior',
    category: 'Interior',
  },
  {
    url: '/src/assets/signature-coffee.jpg',
    title: 'Signature Coffee',
    category: 'Food & Beverages',
  },
  {
    url: '/src/assets/dessert.jpg',
    title: 'Dessert Collection',
    category: 'Food & Beverages',
  },
  {
    url: '/src/assets/mocktail.jpg',
    title: 'Artisan Mocktails',
    category: 'Food & Beverages',
  },
  {
    url: '/src/assets/chef-special.jpg',
    title: 'Chef Specials',
    category: 'Food & Beverages',
  },
  {
    url: '/src/assets/starters.jpg',
    title: 'Appetizers',
    category: 'Food & Beverages',
  },
];

// Content Data
const contentData = [
  { section: 'homepage', key: 'heroTitle', value: 'Welcome to Cozmo Cafe' },
  { section: 'homepage', key: 'heroSubtitle', value: 'Premium cafe & lounge experience' },
  { section: 'homepage', key: 'aboutTitle', value: 'About Cozmo Cafe' },
  { section: 'homepage', key: 'aboutDescription', value: 'Welcome to Cozmo Cafe Bistro Lounge – Hyderabad\'s premier destination for premium coffee, gourmet cuisine, refreshing beverages, and a sophisticated lounge experience.' },
  { section: 'about', key: 'companyName', value: 'C E Hospitality' },
  { section: 'about', key: 'companyDescription', value: 'C E Hospitality is a startup hospitality brand driven by a simple belief: great stays come from thoughtful details and authentic service.' },
  { section: 'about', key: 'vision', value: 'To become the most loved cafe and lounge brand in Hyderabad and beyond, setting the benchmark for premium hospitality, exceptional service, and unforgettable guest experiences.' },
  { section: 'about', key: 'mission', value: 'To deliver premium cafe and lounge experiences through exceptional coffee, delicious food, refreshing beverages, and warm hospitality that makes every guest feel special at our Hyderabad location.' },
  { section: 'contact', key: 'address', value: 'COZMO CAFE BISTRO AND LOUNGE, 2nd floor, KPHB 4th phase near LODHA BELLAZA ROAD, Hyderabad, Telangana. 500072' },
  { section: 'contact', key: 'phone', value: '+91 9703266969' },
  { section: 'contact', key: 'email', value: 'sam@cehospitalitygroup.com' },
  { section: 'contact', key: 'hours', value: 'Daily: 9:00 AM – 4:00 AM' },
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoURI, connectionOptions);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...');
    await MenuItem.deleteMany({});
    await Booking.deleteMany({});
    await Contact.deleteMany({});
    await Service.deleteMany({});
    await Offer.deleteMany({});
    await GalleryImage.deleteMany({});
    await Leader.deleteMany({});
    await Content.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Seed Menu Items
    console.log('📝 Seeding menu items...');
    const menuItems = await MenuItem.insertMany(menuItemsData);
    console.log(`✅ Inserted ${menuItems.length} menu items\n`);

    // Seed Services
    console.log('📝 Seeding services...');
    const services = await Service.insertMany(servicesData);
    console.log(`✅ Inserted ${services.length} services\n`);

    // Seed Offers
    console.log('📝 Seeding offers...');
    const offers = await Offer.insertMany(offersData);
    console.log(`✅ Inserted ${offers.length} offers\n`);

    // Seed Bookings
    console.log('📝 Seeding bookings...');
    const bookings = await Booking.insertMany(bookingsData);
    console.log(`✅ Inserted ${bookings.length} bookings\n`);

    // Seed Contacts
    console.log('📝 Seeding contacts...');
    const contacts = await Contact.insertMany(contactsData);
    console.log(`✅ Inserted ${contacts.length} contacts\n`);

    // Seed Leaders
    console.log('📝 Seeding leaders...');
    const leaders = await Leader.insertMany(leadersData);
    console.log(`✅ Inserted ${leaders.length} leaders\n`);

    // Seed Gallery Images
    console.log('📝 Seeding gallery images...');
    const galleryImages = await GalleryImage.insertMany(galleryImagesData);
    console.log(`✅ Inserted ${galleryImages.length} gallery images\n`);

    // Seed Content
    console.log('📝 Seeding content...');
    const contents = await Content.insertMany(contentData);
    console.log(`✅ Inserted ${contents.length} content entries\n`);

    // Summary
    console.log('📊 Seeding Summary:');
    console.log(`   - Menu Items: ${menuItems.length}`);
    console.log(`   - Services: ${services.length}`);
    console.log(`   - Offers: ${offers.length}`);
    console.log(`   - Bookings: ${bookings.length}`);
    console.log(`   - Contacts: ${contacts.length}`);
    console.log(`   - Leaders: ${leaders.length}`);
    console.log(`   - Gallery Images: ${galleryImages.length}`);
    console.log(`   - Content Entries: ${contents.length}`);
    console.log('\n🎉 Database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();

