import express, { Router } from 'express';
import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';

import Content from '../models/Content.js';

const router: Router = express.Router();

// Get all content
router.get('/', async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const { section } = req.query;
    const query: any = {};

    if (section) {
      query.section = section;
    }

    const contents = await Content.find(query).sort({ section: 1, key: 1 });
    res.json(contents);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get content by section
router.get('/section/:section', async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const contents = await Content.find({ section: req.params.section });
    const contentMap: Record<string, string> = {};
    contents.forEach((item) => {
      contentMap[item.key] = item.value;
    });
    res.json(contentMap);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update or create content
router.post('/', async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const { section, key, value } = req.body;

    const content = await Content.findOneAndUpdate(
      { section, key },
      { value },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(content);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Bulk update content
router.put('/bulk', async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const { section, data } = req.body;

    const updates = Object.entries(data).map(([key, value]) => ({
      updateOne: {
        filter: { section, key },
        update: { $set: { value: value as string } },
        upsert: true,
      },
    }));

    await Content.bulkWrite(updates);

    const contents = await Content.find({ section });
    const contentMap: Record<string, string> = {};
    contents.forEach((item) => {
      contentMap[item.key] = item.value;
    });

    res.json(contentMap);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

