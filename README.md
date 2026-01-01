# CE Hospitality Group

A comprehensive hospitality management platform built with React, TypeScript, and Node.js.

## Features

- Modern React frontend with TypeScript
- Express.js backend with MongoDB
- Admin dashboard for content management
- Booking system
- Gallery management
- Contact form handling
- Menu management with PDF generation
- SEO optimization
- Responsive design

## Unified Server Architecture

This application is configured to run both the backend server and frontend on the same port in production, while maintaining separate development servers for better development experience.

### Development Mode
- Frontend runs on port 8080 with hot-reloading
- Backend API runs on port 5000
- API requests are automatically proxied from frontend to backend
- Provides optimal development experience with hot-reloading

### Production Mode
- Both API and frontend served from the same port
- Single endpoint for both API and UI
- Eliminates CORS issues
- Simplified deployment

## Prerequisites

- Node.js 18+
- MongoDB
- npm or pnpm

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (see `.env.example`)

## Development

To run both servers simultaneously:

```bash
npm run dev
```

This will start:
- Frontend on http://localhost:8080
- Backend API on http://localhost:5000
- API requests are automatically proxied from frontend to backend

## Production Build

To build for production:

```bash
npm run build        # Builds the frontend
npm run build:server # Builds the backend
npm start           # Starts the unified server
```

## Scripts

- `npm run dev` - Start both frontend and backend servers for development
- `npm run build` - Build the frontend application
- `npm run build:server` - Build the backend server
- `npm start` - Start the production server that serves both API and frontend
- `npm run seed` - Seed the database with initial data
- `npm run test-connection` - Test database connection

## API Endpoints

All API endpoints are available under `/api/*`:
- `/api/menu` - Menu items management
- `/api/bookings` - Booking management
- `/api/contacts` - Contact form submissions
- `/api/services` - Services management
- `/api/offers` - Special offers management
- `/api/gallery` - Gallery images management
- `/api/leaders` - Leadership team management
- `/api/content` - Content management
- `/api/upload` - File upload
- `/api/setup` - Initial setup
- `/api/auth` - Authentication
- `/api` - Super admin routes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT
