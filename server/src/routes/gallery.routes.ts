import express from 'express';
import GalleryImage from '../models/GalleryImage.js';

const router = express.Router();

// Get all gallery images
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    const images = await GalleryImage.find(query).sort({ createdAt: -1 });
    res.json(images);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single image
router.get('/:id', async (req, res) => {
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
router.post('/', async (req, res) => {
  try {
    const image = new GalleryImage(req.body);
    await image.save();
    res.status(201).json(image);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Update image
router.put('/:id', async (req, res) => {
  try {
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
router.delete('/:id', async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.json({ message: 'Image deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

