import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryImage extends Document {
  url: string;
  title?: string;
  category?: string;
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

GalleryImageSchema.index({ category: 1, createdAt: -1 });

export default mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);

