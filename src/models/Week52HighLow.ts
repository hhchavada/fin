import { Schema, model, Document } from 'mongoose';

export interface IWeek52HighLow extends Document {
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

const Week52HighLowSchema = new Schema<IWeek52HighLow>({
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
  collection: 'week_52_high_low'
});

// Indexes for better query performance
Week52HighLowSchema.index({ fetched_at: -1 });
Week52HighLowSchema.index({ status: 1, fetched_at: -1 });

export const Week52HighLowModel = model<IWeek52HighLow>('Week52HighLow', Week52HighLowSchema);
