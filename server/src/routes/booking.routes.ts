import express, { Request, Response } from 'express';
import Booking from '../models/Booking.js';
import { Router } from 'express';

const router: Router = express.Router();

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const { status, date } = req.query;
    const query: any = {};
    
    if (status) {
      query.status = status;
    }
    
    if (date) {
      query.date = new Date(date as string);
    }
    
    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Update booking
router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

