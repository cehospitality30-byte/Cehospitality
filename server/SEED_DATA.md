# Database Seeding Guide

## Quick Start

Seed the MongoDB database with mock data:

```bash
cd server
npm run seed
```

## What Gets Seeded

### Menu Items (~70 items)
- Beverages (Classic Hot, Café Special, Iced Coffee, Cold Coffee, Iced Teas, Matcha, Shakes, Mojitos)
- Starters (Soups, Salads, Appetizers - Veg & Non-Veg)
- Main Course (Sandwiches, Burgers, Pizzas, Pasta, Rice & Noodles)
- Desserts (Desserts, Cookies, Cakes)
- Chef Specials

### Services (6 items)
- Premium Dine-In
- Takeaway & Delivery
- Party & Event Catering
- Private Dining
- Live Entertainment
- Corporate Events

### Offers (3 items)
- Weekend Special (20% off)
- Happy Hour (Buy 2 Get 1 Free)
- Student Discount (15% off)

### Bookings (4 sample bookings)
- Mix of pending and confirmed bookings
- Various dates and guest counts

### Contacts (4 sample inquiries)
- Mix of unread and read messages
- Various inquiry types

### Leaders (4 team members)
- Samuel Charles - Founder & CEO
- Padma Vijaya - Director of Operations
- Sidhaartha - Culinary Director
- Vidya Sagar - Brand Director

### Gallery Images (6 images)
- Lounge interior
- Food & beverage photos
- Various categories

### Content (12 entries)
- Homepage content
- About page content
- Contact information

## Important Notes

⚠️ **The seed script will DELETE all existing data** before inserting new data.

To keep existing data, comment out the delete operations in `server/src/scripts/seed.ts`:

```typescript
// await MenuItem.deleteMany({});
// await Booking.deleteMany({});
// etc...
```

## After Seeding

1. Check your MongoDB Atlas dashboard to see the data
2. Visit admin panel to see the seeded data
3. Test the API endpoints to verify data

## Re-seeding

You can run the seed script multiple times. Each time it will:
1. Clear all existing data
2. Insert fresh mock data

This is useful for:
- Resetting to initial state
- Testing data operations
- Development and testing

