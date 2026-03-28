import { Schema, model, Document } from 'mongoose';

export interface IStockFundamentals extends Document {
  data: any; // Raw API response
  fetched_at: Date;
  status: 'success' | 'failed' | 'pending';
  meta?: {
    response_time_ms?: number;
    api_endpoint?: string;
    stock_name?: string;
    error_message?: string;
    [key: string]: any;
  };
}

const StockFundamentalsSchema = new Schema<IStockFundamentals>({
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
  collection: 'stock_fundamentals'
});

// Indexes for better query performance
StockFundamentalsSchema.index({ fetched_at: -1 });
StockFundamentalsSchema.index({ status: 1, fetched_at: -1 });
StockFundamentalsSchema.index({ 'meta.stock_name': 1, fetched_at: -1 });

export const StockFundamentalsModel = model<IStockFundamentals>('StockFundamentals', StockFundamentalsSchema);
