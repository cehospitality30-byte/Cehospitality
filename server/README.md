# CE Hospitality - Backend Server

The backend server for the CE Hospitality management platform, built with Node.js, Express, and MongoDB.

## 🚀 Features

- **RESTful API** with comprehensive endpoints
- **JWT Authentication** for secure access
- **MongoDB** with Mongoose ODM for data management
- **Role-based access control** (Admin/Super Admin)
- **Rate limiting** for API protection
- **Security headers** with Helmet
- **CORS support** for frontend integration
- **Image upload** with Cloudinary integration
- **Comprehensive admin management** system

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Security**: Helmet, express-rate-limit, CORS
- **Environment**: dotenv
- **TypeScript**: For type safety
- **Cloudinary**: For image management

## 📁 Project Structure

```
server/
├── src/
│   ├── config/           # Configuration files
│   │   ├── cloudinary.ts # Cloudinary configuration
│   │   ├── database.ts   # Database connection
│   │   └── env.ts        # Environment variables
│   ├── models/           # Database models
│   │   ├── Admin.ts
│   │   ├── Booking.ts
│   │   ├── Contact.ts
│   │   ├── Content.ts
│   │   ├── GalleryImage.ts
│   │   ├── Leader.ts
│   │   ├── MenuItem.ts
│   │   ├── Offer.ts
│   │   └── Service.ts
│   ├── routes/           # API routes
│   │   ├── auth.routes.ts
│   │   ├── booking.routes.ts
│   │   ├── contact.routes.ts
│   │   ├── content.routes.ts
│   │   ├── gallery.routes.ts
│   │   ├── health.routes.ts
│   │   ├── leader.routes.ts
│   │   ├── menu.routes.ts
│   │   ├── offer.routes.ts
│   │   ├── service.routes.ts
│   │   ├── setup.routes.ts
│   │   ├── superadmin.routes.ts
│   │   └── upload.routes.ts
│   ├── scripts/          # Utility scripts
│   │   ├── seed.ts       # Data seeding
│   │   ├── seed-with-env.ts
│   │   └── test-connection.ts
│   └── index.ts          # Server entry point
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- MongoDB (local instance or MongoDB Atlas)

## 📦 Installation

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key
   CORS_ORIGIN=http://localhost:8080
   CLOUDINARY_URL=your_cloudinary_url
   ```

4. **Run the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production build
   npm run build
   
   # Start production server
   npm start
   ```

## 🔐 Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `JWT_SECRET`: Secret key for JWT tokens
- `CORS_ORIGIN`: Allowed origin for CORS
- `CLOUDINARY_URL`: Cloudinary connection URL

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify authentication token

### Setup
- `GET /api/setup/admin-exists` - Check if admin exists
- `POST /api/setup/setup` - Create first super admin

### Super Admin
- `POST /api/superadmin` - Create super admin (first time only)
- `POST /api/admin` - Create admin (super admin only)
- `GET /api/admins` - Get all admins (super admin only)
- `DELETE /api/admin/:id` - Delete admin (super admin only)

### Menu Management
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

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### Offers
- `GET /api/offers` - Get all offers
- `GET /api/offers/:id` - Get offer by ID
- `POST /api/offers` - Create offer (admin only)
- `PUT /api/offers/:id` - Update offer (admin only)
- `DELETE /api/offers/:id` - Delete offer (admin only)

### Gallery
- `GET /api/gallery` - Get all gallery images
- `GET /api/gallery/:id` - Get gallery image by ID
- `POST /api/gallery` - Upload gallery image (admin only)
- `PUT /api/gallery/:id` - Update gallery image (admin only)
- `DELETE /api/gallery/:id` - Delete gallery image (admin only)

### Leadership
- `GET /api/leaders` - Get all leaders
- `GET /api/leaders/:id` - Get leader by ID
- `POST /api/leaders` - Create leader (admin only)
- `PUT /api/leaders/:id` - Update leader (admin only)
- `DELETE /api/leaders/:id` - Delete leader (admin only)

### Content Management
- `GET /api/content` - Get all content
- `GET /api/content/section/:section` - Get content by section
- `POST /api/content` - Update content (admin only)
- `PUT /api/content/bulk` - Bulk update content (admin only)

### File Upload
- `POST /api/upload` - Upload images to Cloudinary

## 🔐 Authentication

The API uses JWT-based authentication:
- Login endpoint returns a JWT token
- Protected routes require `Authorization: Bearer <token>` header
- Different endpoints have different access levels (public/admin/superadmin)

## 🗄️ Database Models

### Admin
- `email`: Admin email address
- `password`: Hashed password
- `name`: Admin name
- `role`: Role (admin/superadmin)
- `createdAt`: Creation timestamp

### MenuItem
- `name`: Menu item name
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
- `status`: Booking status

### Contact
- `name`: Contact name
- `email`: Contact email
- `phone`: Contact phone (optional)
- `subject`: Message subject
- `message`: Message content
- `status`: Message status (read/unread)

## 🚀 Deployment

### Environment Configuration
For production deployment:
1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure proper CORS origin
4. Use a production MongoDB instance

### Scripts
- `npm run dev`: Start development server with hot reload
- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Start production server from compiled code
- `npm run seed`: Seed database with sample data
- `npm run test-connection`: Test database connection

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Rate Limiting**: Protection against API abuse
- **Helmet**: Security headers with Content Security Policy for Express.js
- **CORS**: Configured for secure cross-origin requests
- **Input Validation**: Proper validation for all inputs

## 📊 Admin Management

The system includes a comprehensive admin management system:
- Super admin can create regular admins
- Role-based access control
- Secure password handling
- Token-based session management

## 📞 Support

For support with the backend server:
- Check the API documentation
- Review the route files for specific endpoint details
- Look at the models for data structure information
- Review the configuration files for setup details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make changes to the server code
4. Add tests if applicable
5. Update documentation if needed
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Express.js for the web framework
- Mongoose for MongoDB object modeling
- JWT for authentication
- All the open-source packages that made this backend possible