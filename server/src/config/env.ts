// Environment configuration with proper fallbacks

export interface Config {
  port: number;
  nodeEnv: string;
  mongoUri: string;
  corsOrigin: string | string[];
  jwtSecret: string;
  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };
}

// Helper to get environment variable with fallback
const getEnvVar = (key: string, fallback: string = ''): string => {
  return process.env[key] || fallback;
};

// Helper to parse CORS origins (can be comma-separated string or array)
const parseCorsOrigin = (): string | string[] => {
  const envValue = getEnvVar('CORS_ORIGIN');

  if (envValue) {
    // If contains comma, split into array
    if (envValue.includes(',')) {
      return envValue.split(',').map(origin => origin.trim());
    }
    return envValue;
  }

  // Fallback for production
  return ['https://cehospitalitygroup.com', 'https://www.cehospitalitygroup.com'];
};

// Parse Cloudinary URL (format: cloudinary://apiKey:apiSecret@cloudName)
const parseCloudinaryUrl = (url: string): { cloudName: string; apiKey: string; apiSecret: string } | null => {
  if (!url) return null;

  try {
    const match = url.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
    if (match) {
      return {
        apiKey: match[1],
        apiSecret: match[2],
        cloudName: match[3],
      };
    }
  } catch (error) {
    console.error('Error parsing CLOUDINARY_URL:', error);
  }

  return null;
};

// Create configuration
const createConfig = (): Config => {
  // Parse Cloudinary config
  const cloudinaryUrl = getEnvVar(
    'CLOUDINARY_URL',
    'cloudinary://916839593194141:5z6mCB5AZ_TBIkQevRMGCojZPE4@djieycmly'
  );
  const cloudinaryConfig = parseCloudinaryUrl(cloudinaryUrl);

  const config: Config = {
    port: parseInt(getEnvVar('PORT', '5000'), 10),
    nodeEnv: getEnvVar('NODE_ENV', 'development'),
    mongoUri: getEnvVar(
      'MONGODB_URI',
      'mongodb+srv://babu789387_db_user:676F1gc3Ivb9hwXq@cluster0.64ute6w.mongodb.net/CAHospility?retryWrites=true&w=majority&tls=true&tlsInsecure=false&appName=Cluster0'
    ),
    corsOrigin: parseCorsOrigin(),
    jwtSecret: getEnvVar(
      'JWT_SECRET',
      'very-long-and-secure-jwt-secret-key-that-should-be-at-least-32-characters-long-and-complex'
    ),
    cloudinary: {
      cloudName: cloudinaryConfig?.cloudName || '',
      apiKey: cloudinaryConfig?.apiKey || '',
      apiSecret: cloudinaryConfig?.apiSecret || '',
    },
  };

  return config;
};

export const config = createConfig();
