# Quick Start Guide - MongoDB Atlas Setup

## ✅ Your MongoDB Atlas Connection is Configured!

Your MongoDB Atlas connection string has been set up and is ready to use.

## 🚀 Start the Backend Server

```bash
# Navigate to server directory
cd server

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

The server will:
- ✅ Connect to MongoDB Atlas automatically
- ✅ Create the database `cehospitality` on first use
- ✅ Start on `http://localhost:5000`

## 🧪 Test Connection (Optional)

```bash
cd server
npm run test-connection
```

This will verify your MongoDB Atlas connection is working.

## 📡 API Endpoints

Once the server is running, all API endpoints are available at:

- `http://localhost:5000/api/menu` - Menu items
- `http://localhost:5000/api/bookings` - Bookings
- `http://localhost:5000/api/contacts` - Contacts
- `http://localhost:5000/api/services` - Services
- `http://localhost:5000/api/offers` - Offers
- `http://localhost:5000/api/gallery` - Gallery
- `http://localhost:5000/api/leaders` - Leadership
- `http://localhost:5000/api/content` - Content

## 🔒 Security Note

Your MongoDB connection string is stored in:
- `server/.env` (local - not committed to git)
- `server/env.example` (template - safe to commit)

**Important:** Never commit your actual `.env` file with credentials to git!

## 🎯 Next Steps

1. **Start Backend:** `cd server && npm run dev`
2. **Start Frontend:** `npm run dev` (in root directory)
3. **Access Admin Panel:** `http://localhost:8080/admin/login`

The database will automatically create collections when you start adding data through the admin panel!

