import { Schema, model, Document } from 'mongoose';

export interface INSEMostActive extends Document {
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

const NSEMostActiveSchema = new Schema<INSEMostActive>({
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
  collection: 'nse_most_active'
});

// Indexes for better query performance
NSEMostActiveSchema.index({ fetched_at: -1 });
NSEMostActiveSchema.index({ status: 1, fetched_at: -1 });

export const NSEMostActiveModel = model<INSEMostActive>('NSEMostActive', NSEMostActiveSchema);
