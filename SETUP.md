# MongoDB Setup Guide

## Quick Start

### 1. Install MongoDB

**Option A: Local MongoDB**
- Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- Or use Homebrew: `brew install mongodb-community`
- Start MongoDB: `mongod`

**Option B: MongoDB Atlas (Cloud)**
- Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string

### 2. Setup Backend Server

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your MongoDB connection
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/cehospitality

# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cehospitality

# Start the server
npm run dev
```

### 3. Verify Connection

The server will start on `http://localhost:5000` and connect to MongoDB automatically.

Check health endpoint:
```bash
curl http://localhost:5000/health
```

## Database Structure

The following collections will be created automatically:

- **menuitems** - Menu items
- **bookings** - Table reservations
- **contacts** - Customer inquiries
- **services** - Cafe services
- **offers** - Promotional offers
- **galleryimages** - Gallery images
- **leaders** - Leadership team
- **contents** - Website content

## API Base URL

All API endpoints are available at: `http://localhost:5000/api`

Example:
- `GET http://localhost:5000/api/menu` - Get all menu items
- `POST http://localhost:5000/api/bookings` - Create booking

## Next Steps

1. Start MongoDB (local or Atlas)
2. Start backend server: `cd server && npm run dev`
3. Start frontend: `npm run dev`
4. Access admin panel: `http://localhost:8080/admin/login`

