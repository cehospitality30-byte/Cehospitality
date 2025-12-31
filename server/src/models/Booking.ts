import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  guests: number;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
      max: 50,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.index({ date: 1, status: 1 });
BookingSchema.index({ email: 1 });
BookingSchema.index({ createdAt: -1 });

export default mongoose.model<IBooking>('Booking', BookingSchema);

