import { Schema, model, Document } from 'mongoose';

export interface IHistoricalData extends Document {
  data: any; // Raw API response
  fetched_at: Date;
  status: 'success' | 'failed' | 'pending';
  meta?: {
    response_time_ms?: number;
    api_endpoint?: string;
    stock_name?: string;
    period?: string;
    filter?: string;
    error_message?: string;
    [key: string]: any;
  };
}

const HistoricalDataSchema = new Schema<IHistoricalData>({
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
  collection: 'historical_data'
});

// Indexes for better query performance
HistoricalDataSchema.index({ fetched_at: -1 });
HistoricalDataSchema.index({ status: 1, fetched_at: -1 });
HistoricalDataSchema.index({ 'meta.stock_name': 1, fetched_at: -1 });
HistoricalDataSchema.index({ 'meta.period': 1, fetched_at: -1 });

export const HistoricalDataModel = model<IHistoricalData>('HistoricalData', HistoricalDataSchema);
