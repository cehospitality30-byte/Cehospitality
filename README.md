# CE Hospitality - Cafe Management System

A comprehensive hospitality management platform built with modern technologies, featuring a React frontend with TypeScript and shadcn/ui components, and a Node.js/Express backend with MongoDB database.

## 🌟 Features

### Frontend
- **React 18** with TypeScript
- **Vite** for fast builds
- **shadcn/ui** components for consistent UI
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Helmet Async** for SEO
- **Responsive design** for all devices
- **Admin dashboard** with comprehensive management tools
- **Open Graph** support for social media previews

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** authentication
- **bcryptjs** for password hashing
- **Cloudinary** integration for image management
- **CORS** support
- **Rate limiting** for security
- **Helmet** for security headers

### Management Features
- **Menu management** with categories and subcategories
- **Booking system** for reservations
- **Contact management** for inquiries
- **Gallery management** for images
- **Service management** for offerings
- **Offer management** for promotions
- **Admin management** with super admin capabilities
- **Content management** for site content

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Routing**: React Router DOM

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT
- **Security**: bcryptjs, helmet, rate limiting

## 📁 Project Structure

```
├── public/                 # Static assets
│   ├── og.png             # Open graph image
│   ├── favicon.ico        # Favicon
│   └── ...
├── server/                # Backend server
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── scripts/       # Utility scripts
│   │   └── index.ts       # Server entry point
│   └── ...
├── src/                   # Frontend source
│   ├── components/        # React components
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   └── ...
├── .env                  # Environment variables
└── package.json          # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cehospitality30-byte/server.git
   cd CE Hospitality
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Set up environment variables**

   Create `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

   Create `.env` file in the `server` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret
   CORS_ORIGIN=http://localhost:8080
   CLOUDINARY_URL=your_cloudinary_url
   ```

4. **Run the application**

   Terminal 1 - Start the backend:
   ```bash
   cd server
   npm run dev
   ```

   Terminal 2 - Start the frontend:
   ```bash
   npm run dev
   ```

## 🔐 Admin Setup

1. Navigate to `/admin/setup` to create the first super admin
2. After the first admin is created, subsequent admin creation must be done by a super admin
3. Use the admin panel at `/admin` for management tasks

## 🗄️ Database Models

### MenuItem
- `name`: Item name
- `category`: Main category
- `subcategory`: Subcategory
- `type`: Food type (veg/nonveg/mixed)
- `price`: Price (optional)
- `isSignature`: Signature item flag
- `image`: Image URL (optional)

### Booking
- `name`: Customer name
- `email`: Customer email
- `phone`: Customer phone
- `date`: Booking date
- `time`: Booking time
- `guests`: Number of guests
- `message`: Additional message
- `status`: Booking status (pending/confirmed/cancelled)

### Contact
- `name`: Contact name
- `email`: Contact email
- `phone`: Contact phone (optional)
- `subject`: Message subject
- `message`: Message content
- `status`: Message status (read/unread)
- `createdAt`: Creation timestamp

### Admin
- `email`: Admin email
- `password`: Hashed password
- `name`: Admin name
- `role`: Admin role (admin/superadmin)
- `createdAt`: Creation timestamp

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token

### Setup
- `GET /api/setup/admin-exists` - Check if admin exists
- `POST /api/setup/setup` - Create first admin

### Super Admin
- `POST /api/superadmin` - Create super admin (first time only)
- `POST /api/admin` - Create admin (super admin only)
- `GET /api/admins` - Get all admins (super admin only)
- `DELETE /api/admin/:id` - Delete admin (super admin only)

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get menu item by ID
- `POST /api/menu` - Create menu item (admin only)
- `PUT /api/menu/:id` - Update menu item (admin only)
- `DELETE /api/menu/:id` - Delete menu item (admin only)

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking (admin only)
- `DELETE /api/bookings/:id` - Delete booking (admin only)

### Contacts
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get contact by ID
- `POST /api/contacts` - Create contact
- `PUT /api/contacts/:id` - Update contact (admin only)
- `DELETE /api/contacts/:id` - Delete contact (admin only)

## 📊 Admin Dashboard

The admin dashboard includes:

- **Dashboard**: Overview with statistics and quick actions
- **Menu Management**: Add, edit, and manage menu items
- **Bookings**: View and manage reservations
- **Contacts**: View and manage customer inquiries
- **Services**: Manage service offerings
- **Offers**: Create and manage promotions
- **Gallery**: Upload and manage images
- **Leadership**: Manage leadership team
- **Content**: Edit site content
- **Super Admin**: Manage admin users

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Build command: `npm run build`
4. Output directory: `dist`

### Backend (Railway/Render/AWS)
1. Deploy the server directory separately
2. Configure environment variables
3. Set up MongoDB connection
4. Use appropriate domain for API

## 📱 Domain Configuration

- **Frontend**: `cehospitalitygroup.com`
- **Backend**: `server.cehospitalitygroup.com`
- **API Proxy**: Frontend routes `/api/*` to backend server

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Rate limiting to prevent abuse
- Helmet security headers
- CORS configuration
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please open an issue in the GitHub repository.

## 🙏 Acknowledgments

- React and Vite for the amazing development experience
- shadcn/ui for the beautiful component library
- MongoDB for the reliable database solution
- All the open-source packages that made this project possible