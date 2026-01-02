import express from 'express';
import type { Application as ExpressApplication, Request as ExpressRequest, Response as ExpressResponse, NextFunction as ExpressNextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config/env.js';
import { connectDB } from './config/database.js';

// Routes
import menuRoutes from './routes/menu.routes.js';
console.log('DEBUG: Imported menuRoutes');
import bookingRoutes from './routes/booking.routes.js';
import contactRoutes from './routes/contact.routes.js';
import serviceRoutes from './routes/service.routes.js';
import offerRoutes from './routes/offer.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import leaderRoutes from './routes/leader.routes.js';
import contentRoutes from './routes/content.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import setupRoutes from './routes/setup.routes.js';
import healthRoutes from './routes/health.routes.js';
import superadminRoutes from './routes/superadmin.routes.js';
import authRoutes from './routes/auth.routes.js';
console.log('DEBUG: Imported all routes');

const app: ExpressApplication = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : config.port;

console.log('DEBUG: Current NODE_ENV:', config.nodeEnv);
if (config.nodeEnv === 'production') {
  console.log('DEBUG: Running in PRODUCTION mode');
} else {
  console.log('DEBUG: Running in DEVELOPMENT mode');
}

// Security middleware
if (config.nodeEnv === 'production') {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://www.google.com", "https://maps.googleapis.com", "https://maps.gstatic.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://www.google.com", "https://maps.googleapis.com", "https://maps.gstatic.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https:", "https://www.google.com", "https://maps.googleapis.com", "https://maps.gstatic.com", "https://www.gstatic.com"],
        connectSrc: ["'self'", config.corsOrigin, 'https://www.google.com', 'https://www.gstatic.com', 'https://maps.googleapis.com', 'https://maps.gstatic.com'],
        frameSrc: ["'self'", "https://www.google.com", "https://www.google.com/maps/embed"],
        objectSrc: ["'none'"],
        childSrc: ["'self'", "https://www.google.com", "https://www.google.com/maps/embed"],
        workerSrc: ["'self'", "blob:"],
      },
    },
  }));
} else {
  // In development, use a more permissive CSP
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "http://localhost:8080", "http://localhost:5000"],
        scriptSrc: ["'self'", "'unsafe-inline'", "http://localhost:8080", "http://localhost:5000", "https://www.google.com", "https://maps.googleapis.com", "https://maps.gstatic.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "http://localhost:8080", "http://localhost:5000", "https://fonts.googleapis.com", "https://www.google.com", "https://maps.googleapis.com", "https://maps.gstatic.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https:", "http://localhost:8080", "http://localhost:5000", "https://www.google.com", "https://maps.googleapis.com", "https://maps.gstatic.com", "https://www.gstatic.com"],
        connectSrc: ["'self'", "http://localhost:8080", "http://localhost:5000", "https://www.google.com", "https://www.gstatic.com", "https://maps.googleapis.com", "https://maps.gstatic.com"],
        frameSrc: ["'self'", "https://www.google.com", "http://localhost:8080", "https://www.google.com/maps/embed"],
        objectSrc: ["'none'"],
        childSrc: ["'self'", "https://www.google.com", "https://www.google.com/maps/embed"],
        workerSrc: ["'self'", "blob:"],
      },
    },
  }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
  });
  app.use(limiter);
}

// CORS middleware
if (config.nodeEnv === 'production') {
  app.use(cors({
    origin: config.corsOrigin,
    credentials: true,
  }));
} else {
  // In development, allow requests from the frontend dev server
  app.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:5173', 'http://127.0.0.1:8080', 'http://127.0.0.1:5173'],
    credentials: true,
  }));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req: ExpressRequest, res: ExpressResponse) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Database connection middleware for serverless (production)
app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (config.nodeEnv === 'production') {
    try {
      await connectDB();
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  }
  next();
});

// API Routes
app.use('/api/menu', menuRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/leaders', leaderRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/setup', setupRoutes);
app.use('/api/health', healthRoutes);
app.use('/api', superadminRoutes);
app.use('/api/auth', authRoutes);


// Error handling middleware
app.use((err: any, req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Serve static files from the React app build directory (only in production)
if (config.nodeEnv === 'production') {
  // Determine the correct path for frontend files
  // If running from compiled build (server/dist), use __dirname
  // If running from source (server/src), use server/dist
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  // Check if we're in the source directory (contains index.ts) or build directory
  const isSrcDir = path.basename(__dirname) === 'src';
  const frontendBuildPath = isSrcDir ? path.join(__dirname, '../dist') : __dirname; // Use server/dist if running from src

  app.use(express.static(frontendBuildPath));

  // Handle React Router routes - serve index.html for non-API routes
  app.get('*', (req: ExpressRequest, res: ExpressResponse) => {
    if (!req.path.startsWith('/api/')) {
      res.sendFile(path.join(frontendBuildPath, 'index.html'));
    }
  });
}

// For Vercel serverless functions, export the app
// In development mode, start the server normally
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL_REGION === undefined) {
  // Start the server in development or when not running on Vercel
  const startServer = async () => {
    try {
      if (process.env.NODE_ENV !== 'production') {
        await connectDB();
      }
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
        if (config.nodeEnv === 'production') {
          console.log(`🌐 Frontend available at http://localhost:${PORT}`);
        }
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  };

  startServer();
} else {
  // In Vercel production, export the app for serverless functions
  console.log('Production server configured for Vercel');
}

export default app;