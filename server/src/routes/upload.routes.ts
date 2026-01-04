import express, { Request, Response, Router } from 'express';
import cloudinary from '../config/cloudinary.js';

const router = Router();

// Upload image to Cloudinary
router.post('/', async (req: Request, res: Response) => {
  try {
    if (!req.body.image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Determine the folder based on the entity type
    const entityType = req.body.entityType || 'uploads';
    const validEntityTypes = ['menu', 'gallery', 'leaders', 'uploads'];

    if (!validEntityTypes.includes(entityType)) {
      return res.status(400).json({ error: 'Invalid entity type' });
    }

    const folder = `cehospitality/${entityType}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.body.image, {
      folder,
      use_filename: false,
      unique_filename: true,
    });

    res.json({
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;