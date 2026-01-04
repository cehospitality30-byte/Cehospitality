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

const app: ExpressApplication = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : config.port;
const IS_PRODUCTION = config.nodeEnv === 'production';
const IS_DEVELOPMENT = !IS_PRODUCTION;

console.log(`🔧 Environment: ${config.nodeEnv}`);
console.log(`🌐 Port: ${PORT}`);

// ============================================================================
// SECURITY MIDDLEWARE
// ============================================================================

// Normalize CORS origins for CSP
const corsOrigins = Array.isArray(config.corsOrigin) ? config.corsOrigin : [config.corsOrigin];

// Helmet - Security headers
if (IS_PRODUCTION) {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://www.google.com", "https://maps.googleapis.com", "https://maps.gstatic.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://www.google.com", "https://maps.googleapis.com", "https://maps.gstatic.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https:", "https://www.google.com", "https://maps.googleapis.com", "https://maps.gstatic.com", "https://www.gstatic.com"],
        connectSrc: ["'self'", ...corsOrigins, "https://www.google.com", "https://www.gstatic.com", "https://maps.googleapis.com", "https://maps.gstatic.com"],
        frameSrc: ["'self'", "https://www.google.com", "https://www.google.com/maps/embed"],
        objectSrc: ["'none'"],
        childSrc: ["'self'", "https://www.google.com", "https://www.google.com/maps/embed"],
        workerSrc: ["'self'", "blob:"],
      },
    },
  }));
} else {
  // Development - More permissive CSP
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "http://localhost:8080", "http://localhost:5000"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "http://localhost:8080", "http://localhost:5000", "https://www.google.com", "https://maps.googleapis.com", "https://maps.gstatic.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "http://localhost:8080", "http://localhost:5000", "https://fonts.googleapis.com", "https://www.google.com", "https://maps.googleapis.com", "https://maps.gstatic.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https:", "http:", "blob:"],
        connectSrc: ["'self'", "http://localhost:8080", "http://localhost:5000", "ws://localhost:8080", "https://www.google.com", "https://www.gstatic.com", "https://maps.googleapis.com", "https://maps.gstatic.com"],
        frameSrc: ["'self'", "https://www.google.com", "http://localhost:8080", "https://www.google.com/maps/embed"],
        objectSrc: ["'none'"],
        childSrc: ["'self'", "https://www.google.com", "https://www.google.com/maps/embed"],
        workerSrc: ["'self'", "blob:"],
      },
    },
  }));
}

// Rate limiting (production only)
if (IS_PRODUCTION) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use('/api/', limiter);
}

// CORS configuration
app.use(cors({
  origin: IS_PRODUCTION ? config.corsOrigin : ['http://localhost:8080', 'http://localhost:5173', 'http://127.0.0.1:8080', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ============================================================================
// BODY PARSERS
// ============================================================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================================================
// DATABASE CONNECTION MIDDLEWARE (Serverless)
// ============================================================================

if (IS_PRODUCTION) {
  app.use(async (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
    try {
      await connectDB();
    } catch (error) {
      console.error('❌ Database connection failed:', error);
    }
    next();
  });
}

// ============================================================================
// API ROUTES
// ============================================================================

// Health check (before other routes)
app.get('/health', (req: ExpressRequest, res: ExpressResponse) => {
  res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
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
app.use('/api/auth', authRoutes);
app.use('/api', superadminRoutes); // Catch-all for admin routes

// ============================================================================
// STATIC FILE SERVING (Production Only)
// ============================================================================

if (IS_PRODUCTION) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // In production, frontend files are in the same directory as the compiled server
  const frontendBuildPath = __dirname;

  console.log(`📁 Serving static files from: ${frontendBuildPath}`);

  // Serve static assets with proper caching
  app.use(express.static(frontendBuildPath, {
    maxAge: '1y',
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      // Cache assets aggressively, but not HTML
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  }));

  // SPA fallback - serve index.html for all non-API, non-asset routes
  app.get('*', (req: ExpressRequest, res: ExpressResponse) => {
    // Don't serve index.html for API routes or static assets
    if (req.path.startsWith('/api/') ||
      req.path.startsWith('/assets/') ||
      req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json|xml|txt)$/)) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler for API routes
app.use('/api/*', (req: ExpressRequest, res: ExpressResponse) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Global error handler
app.use((err: any, req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
  console.error('❌ Error:', err.stack);

  const statusCode = err.statusCode || 500;
  const message = IS_PRODUCTION ? 'Internal server error' : err.message;

  res.status(statusCode).json({
    error: message,
    ...(IS_DEVELOPMENT && { stack: err.stack }),
  });
});

// ============================================================================
// SERVER STARTUP
// ============================================================================

// Only start server if not in Vercel serverless environment
if (IS_DEVELOPMENT || !process.env.VERCEL_REGION) {
  const startServer = async () => {
    try {
      // Connect to database in development
      if (IS_DEVELOPMENT) {
        await connectDB();
        console.log('✅ Database connected');
      }

      app.listen(PORT, () => {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📡 API available at http://localhost:${PORT}/api`);
        if (IS_PRODUCTION) {
          console.log(`🌐 Frontend available at http://localhost:${PORT}`);
        }
        console.log(`${'='.repeat(60)}\n`);
      });
    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  };

  startServer();
} else {
  console.log('✅ Serverless function configured for Vercel');
}

export default app;