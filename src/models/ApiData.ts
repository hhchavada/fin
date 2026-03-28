import { Schema, model, Document } from 'mongoose';

export interface IApiData extends Document {
  api_name: string;
  data: any; // Mixed type to store dynamic JSON responses
  fetched_at: Date;
  status: 'success' | 'failed' | 'pending';
  meta?: {
    stock_name?: string;
    stock_id?: string;
    period?: string;
    filter?: string;
    query?: string;
    error_message?: string;
    response_time_ms?: number;
    [key: string]: any;
  };
}

const ApiDataSchema = new Schema<IApiData>({
  api_name: {
    type: String,
    required: true,
    index: true
  },
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
  collection: 'api_data'
});

// Compound indexes for better query performance
ApiDataSchema.index({ api_name: 1, fetched_at: -1 });
ApiDataSchema.index({ status: 1, fetched_at: -1 });
ApiDataSchema.index({ 'meta.stock_name': 1, fetched_at: -1 });

export const ApiDataModel = model<IApiData>('ApiData', ApiDataSchema);
