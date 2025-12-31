import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
  section: string;
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>(
  {
    section: {
      type: String,
      required: true,
      enum: ['homepage', 'about', 'contact'],
    },
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ContentSchema.index({ section: 1, key: 1 }, { unique: true });

export default mongoose.model<IContent>('Content', ContentSchema);

