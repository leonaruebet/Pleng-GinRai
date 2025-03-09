/**
 * Type definitions for the Restaurant and Food Finder application
 */

/**
 * Restaurant information returned by the Gemini API
 */
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  address: string;
  rating: number;
  priceRange: string;
  description: string;
  imageUrl?: string;
}

/**
 * Food information returned by the Gemini API
 */
export interface Food {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  ingredients?: string[];
  imageUrl?: string;
}

/**
 * Chat message structure
 */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

/**
 * Search parameters for the Gemini API
 */
export interface SearchParams {
  location?: string;
  foodType?: string;
}

/**
 * Response format from the Gemini API
 */
export interface GeminiResponse {
  restaurants?: Restaurant[];
  foods?: Food[];
  error?: string;
} 