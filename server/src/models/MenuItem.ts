import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  category: string;
  subcategory?: string;
  price?: string;
  description?: string;
  isSignature: boolean;
  type: 'beverage' | 'veg' | 'nonveg' | 'mixed';
  image?: string;
  publicId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Beverages', 'Starters', 'Main Course', 'Desserts', 'Chef Specials'],
    },
    subcategory: {
      type: String,
      trim: true,
    },
    price: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isSignature: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
      enum: ['beverage', 'veg', 'nonveg', 'mixed'],
    },
    image: {
      type: String,
      trim: true,
    },
    publicId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

MenuItemSchema.index({ name: 'text', description: 'text' });
MenuItemSchema.index({ category: 1, subcategory: 1 });

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);

