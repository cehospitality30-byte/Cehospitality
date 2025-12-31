import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
const envPath = path.join(process.cwd(), '.env');
console.log(`Loading env from: ${envPath}`);
const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error('Error loading .env file:', result.error);
}

console.log('Environment Debug:', {
  hasCloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
  hasApiKey: !!process.env.CLOUDINARY_API_KEY,
  hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
  cwd: process.cwd()
});

interface Config {
  port: number;
  nodeEnv: string;
  mongoUri: string;
  corsOrigin: string;
  jwtSecret: string;
  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };
}

const getEnv = (key: string, required = true): string => {
  const value = process.env[key];
  if (required && !value) {
    throw new Error(`Example Environment Variable ${key} is missing`);
  }
  return value || '';
};

// Parse CLOUDINARY_URL if provided
const parseCloudinaryUrl = (): { cloudName: string; apiKey: string; apiSecret: string } | null => {
  const url = process.env.CLOUDINARY_URL;
  console.log('CLOUDINARY_URL value:', url);
  if (!url) return null;
  
  try {
    // Parse URL format: cloudinary://apiKey:apiSecret@cloudName
    const match = url.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
    console.log('Regex match result:', match);
    if (match) {
      const result = {
        cloudName: match[3],
        apiKey: match[1],
        apiSecret: match[2]
      };
      console.log('Parsed Cloudinary config:', result);
      return result;
    }
  } catch (error) {
    console.error('Error parsing CLOUDINARY_URL:', error);
  }
  
  return null;
};

// Validate required environment variables
const validateEnv = (): Config => {
  // Try to get Cloudinary config from CLOUDINARY_URL first, fallback to individual variables
  const cloudinaryUrlConfig = parseCloudinaryUrl();
  
  const config: Config = {
    port: parseInt(getEnv('PORT', false) || '5000', 10),
    nodeEnv: getEnv('NODE_ENV', false) || 'development',
    mongoUri: getEnv('MONGODB_URI'),
    corsOrigin: getEnv('CORS_ORIGIN', false) || 'http://localhost:8080',
    jwtSecret: getEnv('JWT_SECRET'),
    cloudinary: {
      cloudName: cloudinaryUrlConfig?.cloudName || getEnv('CLOUDINARY_CLOUD_NAME'),
      apiKey: cloudinaryUrlConfig?.apiKey || getEnv('CLOUDINARY_API_KEY'),
      apiSecret: cloudinaryUrlConfig?.apiSecret || getEnv('CLOUDINARY_API_SECRET'),
    },
  };

  return config;
};

export const config = validateEnv();
