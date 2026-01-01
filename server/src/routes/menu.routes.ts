import express from 'express';

import MenuItem from '../models/MenuItem.js';
import cloudinary from '../config/cloudinary.js';
import { config } from '../config/env.js';

const router = express.Router();

// Get all menu items
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const { category, search } = req.query;
    const query: any = {};

    if (category) {
      query.category = category as string;
    }

    if (search) {
      query.$text = { $search: search as string };
    }

    const items = await MenuItem.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single menu item
router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(item);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create menu item
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    // If there's an image in the request, upload it to Cloudinary
    if (req.body.image && req.body.image.startsWith('data:')) {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.body.image, {
        folder: 'cehospitality/menu',
        use_filename: false,
        unique_filename: true,
      });

      // Replace the image data with the Cloudinary URL
      req.body.image = result.secure_url;
      req.body.publicId = result.public_id;
    }

    const item = new MenuItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Update menu item
router.put('/:id', async (req: express.Request, res: express.Response) => {
  try {
    // Handle image update if there's a new image
    if (req.body.image && typeof req.body.image === 'string' && req.body.image.startsWith('data:')) {
      // First, if there's an existing item with a publicId, delete it from Cloudinary
      const existingItem = await MenuItem.findById(req.params.id);
      if (existingItem && existingItem.publicId) {
        await cloudinary.uploader.destroy(existingItem.publicId);
      }

      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.body.image, {
        folder: 'cehospitality/menu',
        use_filename: false,
        unique_filename: true,
      });

      // Update the image URL and publicId in the request body
      req.body.image = result.secure_url;
      req.body.publicId = result.public_id;
    }

    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(item);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete menu item
router.delete('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    // If the item has a publicId, delete it from Cloudinary
    if (item.publicId) {
      await cloudinary.uploader.destroy(item.publicId);
    }

    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

