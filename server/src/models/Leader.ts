import mongoose, { Schema, Document } from 'mongoose';

export interface ILeader extends Document {
  name: string;
  role: string;
  description: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeaderSchema = new Schema<ILeader>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILeader>('Leader', LeaderSchema);

