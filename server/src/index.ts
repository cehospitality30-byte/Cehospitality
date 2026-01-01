import express from 'express';
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

const app = express();
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
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", config.corsOrigin, 'https://www.google.com', 'https://www.gstatic.com'],
        frameSrc: ["'self'", "https://www.google.com"],
        objectSrc: ["'none'"],
      },
    },
  }));
} else {
  // In development, use a more permissive CSP
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "http://localhost:8080", "http://localhost:5000"],
        scriptSrc: ["'self'", "'unsafe-inline'", "http://localhost:8080", "http://localhost:5000"],
        styleSrc: ["'self'", "'unsafe-inline'", "http://localhost:8080", "http://localhost:5000"],
        imgSrc: ["'self'", "data:", "https:", "http://localhost:8080", "http://localhost:5000"],
        connectSrc: ["'self'", "http://localhost:8080", "http://localhost:5000", "https://www.google.com", "https://www.gstatic.com"],
        frameSrc: ["'self'", "https://www.google.com", "http://localhost:8080"],
        objectSrc: ["'none'"],
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
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Database connection middleware for serverless (production)
app.use(async (req, res, next) => {
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
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Serve static files from the React app build directory (only in production)
if (config.nodeEnv === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const frontendBuildPath = path.join(__dirname, '../../dist');

  app.use(express.static(frontendBuildPath));

  // Handle React Router routes - serve index.html for non-API routes
  app.get('*', (req, res) => {
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