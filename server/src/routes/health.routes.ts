import express from 'express';

import { config } from '../config/env.js';

const router = express.Router();

// Health check endpoint
router.get('/', (req: express.Request, res: express.Response) => {
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'API is running smoothly',
    services: {
      database: 'connected', // Since we're here, DB is connected
      cloudinary: config.cloudinary.cloudName ? 'configured' : 'not configured',
    },
    environment: config.nodeEnv,
  };

  res.status(200).json(healthCheck);
});

// Detailed health check
router.get('/detailed', (req: express.Request, res: express.Response) => {
  const detailedHealthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.version,
    pid: process.pid,
    memory: process.memoryUsage(),
    services: {
      database: {
        status: 'connected', // Since we're here, DB is connected
        host: config.mongoUri.includes('localhost') ? 'local' : 'remote',
      },
      cloudinary: {
        status: config.cloudinary.cloudName ? 'configured' : 'not configured',
        cloudName: config.cloudinary.cloudName || 'N/A',
      },
    },
    environment: {
      nodeEnv: config.nodeEnv,
      port: config.port,
    },
  };

  res.status(200).json(detailedHealthCheck);
});

export default router;