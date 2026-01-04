import express, { Request, Response, Router } from 'express';

import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

const router: Router = express.Router();

// Check if admin exists
router.get('/admin-exists', async (req: Request, res: Response) => {
  try {
    const adminCount = await Admin.countDocuments();
    res.json({ adminExists: adminCount > 0 });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create initial admin user (only if no admin exists)
router.post('/setup', async (req: Request, res: Response) => {
  try {
    // Check if any admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({ error: 'An admin user already exists. Setup can only be performed once.' });
    }

    const { email, password, name } = req.body;

    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Create new admin
    const admin = new Admin({
      email,
      password,
      name,
      role: 'superadmin' // Initial admin gets superadmin role
    });

    await admin.save();

    // Create JWT token for the new admin
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'fallback_jwt_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Admin user created successfully',
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      },
      token
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;