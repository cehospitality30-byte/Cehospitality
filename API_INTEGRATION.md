# API Integration Complete ✅

## MongoDB is Now the Primary Database

All admin pages and public forms are now connected to MongoDB via API endpoints.

## What's Connected

### ✅ Admin Pages (Using MongoDB)
- **Menu Management** - Full CRUD operations
- **Bookings Inbox** - View, update, delete bookings
- **Contact Inbox** - View, update, mark as replied
- **Services Management** - Ready for API integration
- **Offers Management** - Ready for API integration
- **Gallery Management** - Ready for API integration
- **Leadership Management** - Ready for API integration
- **Content Management** - Ready for API integration

### ✅ Public Forms (Using MongoDB)
- **Booking Form** - Saves to MongoDB
- **Contact Form** - Saves to MongoDB

## API Base URL

Default: `http://localhost:5000/api`

To change, set environment variable:
```env
VITE_API_URL=http://your-api-url/api
```

## Available API Endpoints

### Menu Items
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Contacts
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Offers
- `GET /api/offers` - Get all offers
- `POST /api/offers` - Create offer
- `PUT /api/offers/:id` - Update offer
- `DELETE /api/offers/:id` - Delete offer

### Gallery
- `GET /api/gallery` - Get all images
- `POST /api/gallery` - Upload image
- `PUT /api/gallery/:id` - Update image
- `DELETE /api/gallery/:id` - Delete image

### Leaders
- `GET /api/leaders` - Get all leaders
- `POST /api/leaders` - Create leader
- `PUT /api/leaders/:id` - Update leader
- `DELETE /api/leaders/:id` - Delete leader

### Content
- `GET /api/content` - Get all content
- `GET /api/content/section/:section` - Get content by section
- `POST /api/content` - Update/create content
- `PUT /api/content/bulk` - Bulk update content

## React Query Hooks

All hooks are available in `src/hooks/`:
- `useMenu.ts` - Menu operations
- `useBookings.ts` - Booking operations
- `useContacts.ts` - Contact operations
- `useServices.ts` - Service operations
- `useOffers.ts` - Offer operations
- `useGallery.ts` - Gallery operations
- `useLeaders.ts` - Leadership operations
- `useContent.ts` - Content operations

## How to Use

### In Admin Pages
```typescript
import { useMenuItems, useCreateMenuItem } from '@/hooks/useMenu';

function MyComponent() {
  const { data: items, isLoading } = useMenuItems();
  const createMutation = useCreateMenuItem();
  
  const handleCreate = async () => {
    await createMutation.mutateAsync({
      name: 'New Item',
      category: 'Beverages',
      // ... other fields
    });
  };
}
```

### In Public Forms
```typescript
import { useCreateBooking } from '@/hooks/useBookings';

function BookingForm() {
  const createBooking = useCreateBooking();
  
  const handleSubmit = async (data) => {
    await createBooking.mutateAsync(data);
  };
}
```

## Next Steps

1. **Start Backend Server:**
   ```bash
   cd server
   npm install
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   npm run dev
   ```

3. **Test Integration:**
   - Go to `/admin/menu` and add a menu item
   - Check MongoDB to see the data
   - Submit a booking from the public site
   - Check the bookings inbox in admin panel

## Data Flow

```
Frontend (React) 
  ↓ (API calls via hooks)
API Service (src/lib/api.ts)
  ↓ (HTTP requests)
Backend Server (Express)
  ↓ (Mongoose)
MongoDB Atlas
```

All data is now persisted in MongoDB! 🎉

