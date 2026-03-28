import { Schema, model, Document } from 'mongoose';

export interface IWeek52HighLowAlt extends Document {
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

const Week52HighLowAltSchema = new Schema<IWeek52HighLowAlt>({
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
  collection: 'week_52_high_low_alt'
});

// Indexes for better query performance
Week52HighLowAltSchema.index({ fetched_at: -1 });
Week52HighLowAltSchema.index({ status: 1, fetched_at: -1 });

export const Week52HighLowAltModel = model<IWeek52HighLowAlt>('Week52HighLowAlt', Week52HighLowAltSchema);
