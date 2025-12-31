// Hardcoded configuration values


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

// Hardcoded values instead of environment variables
const getHardcodedValue = (key: string): string => {
  const hardcodedValues: Record<string, string> = {
    'PORT': '5000',
    'NODE_ENV': 'production',
    'MONGODB_URI': 'mongodb+srv://babu789387_db_user:676F1gc3Ivb9hwXq@cluster0.64ute6w.mongodb.net/CAHospility?retryWrites=true&w=majority&tls=true&tlsInsecure=false&appName=Cluster0',
    'CORS_ORIGIN': 'https://cehospitalitygroup.com',
    'JWT_SECRET': 'very-long-and-secure-jwt-secret-key-that-should-be-at-least-32-characters-long-and-complex',
    'CLOUDINARY_URL': 'cloudinary://916839593194141:5z6mCB5AZ_TBIkQevRMGCojZPE4@djieycmly',
  };
  return hardcodedValues[key] || '';
};

// Parse hardcoded CLOUDINARY_URL
const parseCloudinaryUrl = (): { cloudName: string; apiKey: string; apiSecret: string } | null => {
  const url = getHardcodedValue('CLOUDINARY_URL');
  if (!url) return null;
  
  try {
    // Parse URL format: cloudinary://apiKey:apiSecret@cloudName
    const match = url.match(new RegExp('^cloudinary://([^:]+):([^@]+)@(.+)$'));
    if (match) {
      const result = {
        cloudName: match[3],
        apiKey: match[1],
        apiSecret: match[2]
      };
      return result;
    }
  } catch (error) {
    console.error('Error parsing CLOUDINARY_URL:', error);
  }
  
  return null;
};

// Create configuration with hardcoded values
const createConfig = (): Config => {
  // Try to get Cloudinary config from hardcoded CLOUDINARY_URL first
  const cloudinaryUrlConfig = parseCloudinaryUrl();
  
  const config: Config = {
    port: parseInt(getHardcodedValue('PORT') || '5000', 10),
    nodeEnv: getHardcodedValue('NODE_ENV'),
    mongoUri: getHardcodedValue('MONGODB_URI'),
    corsOrigin: getHardcodedValue('CORS_ORIGIN'),
    jwtSecret: getHardcodedValue('JWT_SECRET'),
    cloudinary: {
      cloudName: cloudinaryUrlConfig?.cloudName || '',
      apiKey: cloudinaryUrlConfig?.apiKey || '',
      apiSecret: cloudinaryUrlConfig?.apiSecret || '',
    },
  };

  return config;
};

export const config = createConfig();
