import mongoose, { Schema, Document } from 'mongoose';

export interface IOffer extends Document {
  title: string;
  description: string;
  discount?: string;
  code?: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OfferSchema = new Schema<IOffer>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      trim: true,
    },
    code: {
      type: String,
      trim: true,
      uppercase: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

OfferSchema.index({ isActive: 1, startDate: 1, endDate: 1 });
OfferSchema.index({ code: 1 }, { unique: true, sparse: true });

export default mongoose.model<IOffer>('Offer', OfferSchema);

