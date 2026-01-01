import express from 'express';
import { Request, Response, Router } from 'express';
import Service from '../models/Service.js';

const router: Router = express.Router();

// Get all services
router.get('/', async (req: Request, res: Response) => {
  try {
    const { active } = req.query;
    const query: any = {};
    
    if (active !== undefined) {
      query.isActive = active === 'true';
    }
    
    const services = await Service.find(query).sort({ createdAt: -1 });
    res.json(services);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single service
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create service
router.post('/', async (req: Request, res: Response) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Update service
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete service
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

