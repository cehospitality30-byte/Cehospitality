import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 
  'mongodb+srv://cehospitality30_db_user:JLq7jmYHDW8d0XTc@cehospitality.nyod0or.mongodb.net/cehospitality?retryWrites=true&w=majority&appName=cehospitality';

const connectionOptions = {
  serverApi: {
    version: '1' as const,
    strict: true,
    deprecationErrors: true,
  },
};

async function testConnection() {
  try {
    console.log('🔌 Testing MongoDB Atlas connection...');
    console.log('📝 Connection string:', mongoURI.replace(/:[^:@]+@/, ':****@')); // Hide password
    
    await mongoose.connect(mongoURI, connectionOptions);
    console.log('✅ Successfully connected to MongoDB!');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    
    // Test ping
    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().command({ ping: 1 });
    } else {
      throw new Error('Database connection not established');
    }
    console.log('✅ Ping successful!');
    
    // List collections
    let collections;
    if (mongoose.connection.db) {
      collections = await mongoose.connection.db.listCollections().toArray();
    } else {
      throw new Error('Database connection not established');
    }
    console.log(`\n📁 Collections (${collections.length}):`);
    collections.forEach((col: any) => {
      console.log(`   - ${col.name}`);
    });
    
  } catch (error: any) {
    console.error('\n❌ Connection failed!');
    console.error('Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('1. Verify your MongoDB Atlas connection string');
    console.error('2. Check if your IP address is whitelisted in MongoDB Atlas');
    console.error('3. Verify the database user credentials');
    console.error('4. Make sure the database user has read/write permissions');
    console.error('\n📝 To get your connection string:');
    console.error('   - Go to MongoDB Atlas');
    console.error('   - Click "Connect" on your cluster');
    console.error('   - Choose "Connect your application"');
    console.error('   - Copy the connection string');
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed');
    process.exit(0);
  }
}

testConnection();

