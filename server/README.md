# C E Hospitality Backend Server

Express.js backend server with MongoDB for C E Hospitality admin panel.

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/cehospitality
PORT=5000
```

4. Make sure MongoDB is running:
   - Local MongoDB: `mongod`
   - Or use MongoDB Atlas connection string

5. Start the server:
```bash
npm run dev
```

## API Endpoints

### Menu Items
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get single menu item
- `POST /api/menu` - Create menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Contacts
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get single contact
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

## Database Models

- MenuItem
- Booking
- Contact
- Service
- Offer
- GalleryImage
- Leader
- Content

