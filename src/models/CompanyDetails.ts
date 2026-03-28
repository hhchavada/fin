import { Schema, model, Document } from 'mongoose';

export interface ICompanyDetails extends Document {
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

const CompanyDetailsSchema = new Schema<ICompanyDetails>({
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
  collection: 'company_details'
});

// Indexes for better query performance
CompanyDetailsSchema.index({ fetched_at: -1 });
CompanyDetailsSchema.index({ status: 1, fetched_at: -1 });
CompanyDetailsSchema.index({ 'meta.stock_name': 1, fetched_at: -1 });

export const CompanyDetailsModel = model<ICompanyDetails>('CompanyDetails', CompanyDetailsSchema);
