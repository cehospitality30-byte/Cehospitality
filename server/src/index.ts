import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
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

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : config.port;

// Security middleware
if (config.nodeEnv === 'production') {
  app.use(helmet());
  
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

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      if (config.nodeEnv === 'development') {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
      } else {
        console.log(`🚀 Server running in production mode on port ${PORT}`);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();


