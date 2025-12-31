import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    // Use MongoDB Atlas connection string from environment or default
    const mongoURI = process.env.MONGODB_URI || 
      'mongodb+srv://cehospitality30_db_user:JLq7jmYHDW8d0XTc@cehospitality.nyod0or.mongodb.net/cehospitality?retryWrites=true&w=majority&appName=cehospitality';
    
    const options = {
      serverApi: {
        version: '1' as const,
        strict: true,
        deprecationErrors: true,
      },
    };
    
    await mongoose.connect(mongoURI, options);
    
    console.log('✅ MongoDB Connected Successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    
    // Send a ping to confirm successful connection
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('✅ Pinged deployment. Successfully connected to MongoDB Atlas!');
    
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
    process.exit(1);
  }
};

