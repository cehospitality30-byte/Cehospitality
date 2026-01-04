import express from 'express';
import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { config } from '../config/env.js';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

const router = express.Router();

// Create super admin (only first super admin can be created without authentication)
router.post('/superadmin', async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const { email, password, name } = req.body;

    // Check if there are any existing super admins
    const existingSuperAdmin = await Admin.findOne({ role: 'superadmin' });
    if (existingSuperAdmin) {
      return res.status(400).json({ error: 'A super admin already exists. Contact existing super admin for access.' });
    }

    // Check if admin with this email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin with this email already exists' });
    }

    // Create super admin
    const superAdmin = new Admin({
      email,
      password,
      name,
      role: 'superadmin'
    });

    await superAdmin.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: superAdmin._id, email: superAdmin.email, role: superAdmin.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Super admin created successfully',
      token,
      admin: {
        id: superAdmin._id,
        email: superAdmin.email,
        name: superAdmin.name,
        role: superAdmin.role
      }
    });
  } catch (error) {
    console.error('Error creating super admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create admin (only super admin can do this)
router.post('/admin', async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    // Check if user is super admin
    if (decoded.role !== 'superadmin') {
      return res.status(403).json({ error: 'Access denied. Super admin privileges required.' });
    }

    const { email, password, name } = req.body;

    // Check if admin with this email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin with this email already exists' });
    }

    // Create admin
    const admin = new Admin({
      email,
      password,
      name,
      role: 'admin'
    });

    await admin.save();

    res.status(201).json({
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all admins (only super admin can do this)
router.get('/admins', async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    // Check if user is super admin
    if (decoded.role !== 'superadmin') {
      return res.status(403).json({ error: 'Access denied. Super admin privileges required.' });
    }

    const admins = await Admin.find({}, { password: 0 }); // Exclude password from response
    res.json({ admins });
  } catch (error) {
    console.error('Error fetching admins:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete admin (only super admin can do this)
router.delete('/admin/:id', async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    // Check if user is super admin
    if (decoded.role !== 'superadmin') {
      return res.status(403).json({ error: 'Access denied. Super admin privileges required.' });
    }

    const { id } = req.params;

    // Check if trying to delete themselves
    if (decoded.id === id) {
      return res.status(400).json({ error: 'Cannot delete yourself' });
    }

    // Find and delete admin
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;