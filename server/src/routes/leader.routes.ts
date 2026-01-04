import express, { Request, Response, Router } from 'express';

import Leader from '../models/Leader.js';
import cloudinary from '../config/cloudinary.js';

const router = Router();

// Get all leaders
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaders = await Leader.find().sort({ createdAt: -1 });
    res.json(leaders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single leader
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const leader = await Leader.findById(req.params.id);
    if (!leader) {
      return res.status(404).json({ error: 'Leader not found' });
    }
    res.json(leader);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create leader
router.post('/', async (req: Request, res: Response) => {
  try {
    // If there's an image in the request, upload it to Cloudinary
    if (req.body.image && req.body.image.startsWith('data:')) {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.body.image, {
        folder: 'cehospitality/leaders',
        use_filename: false,
        unique_filename: true,
      });

      // Replace the image data with the Cloudinary URL
      req.body.image = result.secure_url;
      req.body.publicId = result.public_id;
    }

    const leader = new Leader(req.body);
    await leader.save();
    res.status(201).json(leader);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Update leader
router.put('/:id', async (req: Request, res: Response) => {
  try {
    // Handle image update if there's a new image
    if (req.body.image && typeof req.body.image === 'string' && req.body.image.startsWith('data:')) {
      // First, if there's an existing leader with a publicId, delete it from Cloudinary
      const existingLeader = await Leader.findById(req.params.id);
      if (existingLeader && existingLeader.publicId) {
        await cloudinary.uploader.destroy(existingLeader.publicId);
      }

      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.body.image, {
        folder: 'cehospitality/leaders',
        use_filename: false,
        unique_filename: true,
      });

      // Update the image URL and publicId in the request body
      req.body.image = result.secure_url;
      req.body.publicId = result.public_id;
    }

    const leader = await Leader.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!leader) {
      return res.status(404).json({ error: 'Leader not found' });
    }
    res.json(leader);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete leader
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const leader = await Leader.findById(req.params.id);
    if (!leader) {
      return res.status(404).json({ error: 'Leader not found' });
    }

    // If the leader has a publicId, delete it from Cloudinary
    if (leader.publicId) {
      await cloudinary.uploader.destroy(leader.publicId);
    }

    await Leader.findByIdAndDelete(req.params.id);
    res.json({ message: 'Leader deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

