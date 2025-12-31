import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import MenuItem from '../models/MenuItem.js';
import Booking from '../models/Booking.js';
import Contact from '../models/Contact.js';
import Service from '../models/Service.js';
import Offer from '../models/Offer.js';
import GalleryImage from '../models/GalleryImage.js';
import Leader from '../models/Leader.js';
import Content from '../models/Content.js';

// Load .env file from server directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

// Get connection string from environment
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('❌ MONGODB_URI not found in .env file!');
  console.error('📝 Please create a .env file in the server/ directory with:');
  console.error('   MONGODB_URI=your_connection_string_here');
  process.exit(1);
}

const connectionOptions = {
  serverApi: {
    version: '1' as const,
    strict: true,
    deprecationErrors: true,
  },
};

// Import data from seed.ts (same data)
// For now, we'll use a simplified version
const menuItemsData = [
  { name: 'Espresso', category: 'Beverages', subcategory: 'Classic Hot', type: 'beverage', isSignature: false },
  { name: 'Cappuccino', category: 'Beverages', subcategory: 'Classic Hot', type: 'beverage', isSignature: true },
  { name: 'Hazelnut Latte', category: 'Beverages', subcategory: 'Café Special Hot', type: 'beverage', isSignature: true },
  { name: 'Cream of Mushroom', category: 'Starters', subcategory: 'Soup', price: '₹229', type: 'mixed', isSignature: true },
  { name: 'Classic Tiramisu', category: 'Desserts', subcategory: 'Desserts', price: '₹249', type: 'veg', isSignature: true },
];

const servicesData = [
  {
    title: 'Premium Dine-In',
    description: 'Experience our elegant cafe and lounge ambiance with attentive service.',
    icon: 'UtensilsCrossed',
    isActive: true,
  },
  {
    title: 'Takeaway & Delivery',
    description: 'Enjoy Cozmo Cafe\'s premium coffee and food delivered to your doorstep.',
    icon: 'Truck',
    isActive: true,
  },
];

const bookingsData = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    date: new Date('2024-02-15'),
    time: '19:00',
    guests: 4,
    message: 'Window seat preferred',
    status: 'pending' as const,
  },
];

const contactsData = [
  {
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '+91 9876543220',
    subject: 'Catering Inquiry',
    message: 'I would like to inquire about catering services for a corporate event.',
    status: 'unread' as const,
  },
];

const leadersData = [
  {
    name: 'Samuel Charles',
    role: 'Founder & CEO',
    description: 'With over 15 years in luxury hospitality, Samuel leads the group\'s strategic vision.',
  },
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');
    console.log('🔌 Connecting to MongoDB...');

    await mongoose.connect(mongoURI!, connectionOptions);
    console.log('✅ Connected to MongoDB\n');

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

    console.log('📝 Seeding data...');
    const menuItems = await MenuItem.insertMany(menuItemsData);
    const services = await Service.insertMany(servicesData);
    const bookings = await Booking.insertMany(bookingsData);
    const contacts = await Contact.insertMany(contactsData);
    const leaders = await Leader.insertMany(leadersData);

    console.log('\n✅ Seeding completed!');
    console.log(`   - Menu Items: ${menuItems.length}`);
    console.log(`   - Services: ${services.length}`);
    console.log(`   - Bookings: ${bookings.length}`);
    console.log(`   - Contacts: ${contacts.length}`);
    console.log(`   - Leaders: ${leaders.length}`);

  } catch (error: any) {
    console.error('\n❌ Error seeding database:', error.message);
    if (error.message.includes('bad auth')) {
      console.error('\n💡 Authentication failed! Please check:');
      console.error('   1. Your MongoDB Atlas connection string in .env file');
      console.error('   2. Your IP address is whitelisted in MongoDB Atlas');
      console.error('   3. Your database user has correct permissions');
      console.error('\n   See TROUBLESHOOTING.md for detailed help');
    }
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed');
    process.exit(0);
  }
}

seedDatabase();

