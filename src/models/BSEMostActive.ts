import { Schema, model, Document } from 'mongoose';

export interface IBSEMostActive extends Document {
  data: any; // Raw API response
  fetched_at: Date;
  status: 'success' | 'failed' | 'pending';
  meta?: {
    response_time_ms?: number;
    api_endpoint?: string;
    error_message?: string;
    [key: string]: any;
  };
}

const BSEMostActiveSchema = new Schema<IBSEMostActive>({
  data: {
    type: Schema.Types.Mixed,
    required: true
  },
  fetched_at: {
    type: Date,
    default: Date.now,
    index: true
  },
  status: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    default: 'success',
    index: true
  },
  meta: {
    type: Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true,
  collection: 'bse_most_active'
});

// Indexes for better query performance
BSEMostActiveSchema.index({ fetched_at: -1 });
BSEMostActiveSchema.index({ status: 1, fetched_at: -1 });

export const BSEMostActiveModel = model<IBSEMostActive>('BSEMostActive', BSEMostActiveSchema);
