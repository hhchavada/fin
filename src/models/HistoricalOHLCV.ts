import { Schema, model, Document } from 'mongoose';

export interface IHistoricalOHLCV extends Document {
  data: any; // Raw API response
  fetched_at: Date;
  status: 'success' | 'failed' | 'pending';
  meta?: {
    response_time_ms?: number;
    api_endpoint?: string;
    stock_name?: string;
    period?: string;
    error_message?: string;
    [key: string]: any;
  };
}

const HistoricalOHLCVSchema = new Schema<IHistoricalOHLCV>({
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
  collection: 'historical_ohlcv'
});

// Indexes for better query performance
HistoricalOHLCVSchema.index({ fetched_at: -1 });
HistoricalOHLCVSchema.index({ status: 1, fetched_at: -1 });
HistoricalOHLCVSchema.index({ 'meta.stock_name': 1, fetched_at: -1 });
HistoricalOHLCVSchema.index({ 'meta.period': 1, fetched_at: -1 });

export const HistoricalOHLCVModel = model<IHistoricalOHLCV>('HistoricalOHLCV', HistoricalOHLCVSchema);
