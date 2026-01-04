import express, { Request, Response, Router } from 'express';
import GalleryImage from '../models/GalleryImage.js';
import cloudinary from '../config/cloudinary.js';

const router: Router = Router();

// Get all gallery images
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const query: any = {};

    if (category) {
      query.category = category as string;
    }

    const images = await GalleryImage.find(query).sort({ createdAt: -1 });
    res.json(images);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single image
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.json(image);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create image
router.post('/', async (req: Request, res: Response) => {
  try {
    // If there's a file in the request, upload it to Cloudinary
    if (req.body.image && req.body.image.startsWith('data:')) {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.body.image, {
        folder: 'cehospitality/gallery',
        use_filename: false,
        unique_filename: true,
      });

      // Replace the image data with the Cloudinary URL
      req.body.image = result.secure_url;
      req.body.publicId = result.public_id;
    }

    const image = new GalleryImage(req.body);
    await image.save();
    res.status(201).json(image);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Update image
router.put('/:id', async (req: Request, res: Response) => {
  try {
    // Handle image update if there's a new image
    if (req.body.image && typeof req.body.image === 'string' && req.body.image.startsWith('data:')) {
      // First, if there's an existing image with a publicId, delete it from Cloudinary
      const existingImage = await GalleryImage.findById(req.params.id);
      if (existingImage && existingImage.publicId) {
        await cloudinary.uploader.destroy(existingImage.publicId);
      }

      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.body.image, {
        folder: 'cehospitality/gallery',
        use_filename: false,
        unique_filename: true,
      });

      // Update the image URL and publicId in the request body
      req.body.image = result.secure_url;
      req.body.publicId = result.public_id;
    }

    const image = await GalleryImage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.json(image);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete image
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // If the image has a publicId, delete it from Cloudinary
    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    await GalleryImage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

