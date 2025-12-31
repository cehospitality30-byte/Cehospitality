import express, { Request, Response } from 'express';
import Contact from '../models/Contact.js';
import { Router } from 'express';

const router: Router = express.Router();

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const query: any = {};
    
    if (status) {
      query.status = status;
    }
    
    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create contact
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Update contact
router.put('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

