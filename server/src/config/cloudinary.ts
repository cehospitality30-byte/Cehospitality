import { config } from './env.js';

// Create a require function for ESM environment
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Cloudinary wrapper module
let cloudinary: any;
let cloudinaryInitialized = false;

// Try to initialize Cloudinary with the new ESM-compatible approach
try {
  // Use dynamic import in a way that's compatible with ESM in tsx
  const cloudinaryModule = require('cloudinary');
  cloudinary = cloudinaryModule.v2;

  console.log('Attempting to configure Cloudinary with:', {
    cloudName: config.cloudinary.cloudName,
    hasApiKey: !!config.cloudinary.apiKey,
    hasApiSecret: !!config.cloudinary.apiSecret,
  });

  // Configure Cloudinary
  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
  });

  // Simple test to ensure configuration is valid (local check only)
  if (!config.cloudinary.cloudName || !config.cloudinary.apiKey || !config.cloudinary.apiSecret) {
    throw new Error("Missing Cloudinary credentials");
  }

  console.log('✅ Cloudinary configured successfully');
  cloudinaryInitialized = true;

} catch (error) {
  console.error('❌ Cloudinary setup failed - credentials missing or invalid');
  console.error('Error details:', error instanceof Error ? error.message : error);
  throw error; // Re-throw to fail fast in production
}

export default {
  get instance() {
    return cloudinary;
  },
  isInitialized() {
    return cloudinaryInitialized;
  },
  config: cloudinary?.config || (() => {}),
  uploader: cloudinary?.uploader
};
