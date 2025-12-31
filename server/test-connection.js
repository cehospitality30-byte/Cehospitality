// Quick test script to verify MongoDB Atlas connection
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const uri = process.env.MONGODB_URI || 
  "mongodb+srv://cehospitality30_db_user:JLq7jmYHDW8d0XTc@cehospitality.nyod0or.mongodb.net/cehospitality?retryWrites=true&w=majority&appName=cehospitality";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. You successfully connected to MongoDB Atlas!");
    
    // Test database operations
    const db = client.db("cehospitality");
    const collections = await db.listCollections().toArray();
    console.log(`📊 Database: cehospitality`);
    console.log(`📁 Collections: ${collections.length > 0 ? collections.map(c => c.name).join(', ') : 'None (database will be created on first insert)'}`);
    
  } catch (error) {
    console.error("❌ Connection error:", error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("🔌 Connection closed");
  }
}

run().catch(console.dir);

