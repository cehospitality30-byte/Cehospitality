import mongoose from 'mongoose';
import { config } from './env.js';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = config.mongoUri;

    const options = {
      serverApi: {
        version: '1' as const,
        strict: true,
        deprecationErrors: true,
      },
    };

    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(mongoURI, options);

    console.log('✅ MongoDB Connected Successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);

    // Send a ping to confirm successful connection
    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log('✅ Pinged deployment. Successfully connected to MongoDB Atlas!');
    } else {
      console.log('⚠️ Could not ping database, but connection established');
    }

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);

    // In development, we might want to continue running even if DB fails
    if (config.nodeEnv === 'development') {
      console.log('⚠️ Running in development mode without database connection');
      console.log('💡 Continuing server startup for development...');
    } else {
      process.exit(1);
    }
  }
};


