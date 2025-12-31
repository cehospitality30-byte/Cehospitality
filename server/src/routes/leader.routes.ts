import express from 'express';
import Leader from '../models/Leader.js';

const router = express.Router();

// Get all leaders
router.get('/', async (req, res) => {
  try {
    const leaders = await Leader.find().sort({ createdAt: -1 });
    res.json(leaders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single leader
router.get('/:id', async (req, res) => {
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
router.post('/', async (req, res) => {
  try {
    const leader = new Leader(req.body);
    await leader.save();
    res.status(201).json(leader);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Update leader
router.put('/:id', async (req, res) => {
  try {
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
router.delete('/:id', async (req, res) => {
  try {
    const leader = await Leader.findByIdAndDelete(req.params.id);
    if (!leader) {
      return res.status(404).json({ error: 'Leader not found' });
    }
    res.json({ message: 'Leader deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

