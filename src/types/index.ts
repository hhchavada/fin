import { Document, Types } from 'mongoose';

// Base interface for all documents
export interface BaseDocument extends Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Common types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// User related types (for future use)
export interface IUser extends BaseDocument {
  email: string;
  password: string;
  name: string;
  isActive: boolean;
}

// Generic error response
export interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
  stack?: string;
}
