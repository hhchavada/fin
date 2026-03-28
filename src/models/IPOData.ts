import { Schema, model, Document } from 'mongoose';

export interface IIPOData extends Document {
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

const IPODataSchema = new Schema<IIPOData>({
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
  collection: 'ipo_data'
});

// Indexes for better query performance
IPODataSchema.index({ fetched_at: -1 });
IPODataSchema.index({ status: 1, fetched_at: -1 });

export const IPODataModel = model<IIPOData>('IPOData', IPODataSchema);
