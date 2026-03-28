import { Schema, model, Document } from 'mongoose';

export interface IIndustrySearch extends Document {
  data: any; // Raw API response
  fetched_at: Date;
  status: 'success' | 'failed' | 'pending';
  meta?: {
    response_time_ms?: number;
    api_endpoint?: string;
    query?: string;
    error_message?: string;
    [key: string]: any;
  };
}

const IndustrySearchSchema = new Schema<IIndustrySearch>({
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
  collection: 'industry_search'
});

// Indexes for better query performance
IndustrySearchSchema.index({ fetched_at: -1 });
IndustrySearchSchema.index({ status: 1, fetched_at: -1 });
IndustrySearchSchema.index({ 'meta.query': 1, fetched_at: -1 });

export const IndustrySearchModel = model<IIndustrySearch>('IndustrySearch', IndustrySearchSchema);
