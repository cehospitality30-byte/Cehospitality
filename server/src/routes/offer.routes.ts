import express from 'express';
import Offer from '../models/Offer.js';

const router = express.Router();

// Get all offers
router.get('/', async (req, res) => {
  try {
    const { active } = req.query;
    const query: any = {};
    
    if (active !== undefined) {
      query.isActive = active === 'true';
    }
    
    const offers = await Offer.find(query).sort({ createdAt: -1 });
    res.json(offers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single offer
router.get('/:id', async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }
    res.json(offer);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create offer
router.post('/', async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.status(201).json(offer);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Update offer
router.put('/:id', async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }
    res.json(offer);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete offer
router.delete('/:id', async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }
    res.json({ message: 'Offer deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

