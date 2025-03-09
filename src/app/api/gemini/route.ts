/**
 * API route for interacting with the Gemini API
 */
import { NextRequest, NextResponse } from 'next/server';
import { getRestaurantRecommendations, getFoodRecommendations } from '../../lib/gemini';
import { GeminiResponse } from '../../types';

/**
 * Handle POST requests to the Gemini API route
 * @param request - The incoming request
 * @returns NextResponse - The API response
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  console.log('[API] Received request to /api/gemini');
  
  try {
    // Parse the request body
    const body = await request.json();
    const { location, foodType } = body;
    
    // Validate the request
    if (!location && !foodType) {
      console.error('[API] Missing required parameters: location or foodType');
      return NextResponse.json(
        { error: 'Missing required parameters: location or foodType' },
        { status: 400 }
      );
    }
    
    const response: GeminiResponse = {};
    
    // Get restaurant recommendations if location is provided
    if (location) {
      console.log(`[API] Getting restaurant recommendations for location: ${location}`);
      const restaurants = await getRestaurantRecommendations(location);
      response.restaurants = restaurants;
    }
    
    // Get food recommendations if foodType is provided
    if (foodType) {
      console.log(`[API] Getting food recommendations for type: ${foodType}`);
      const foods = await getFoodRecommendations(foodType);
      response.foods = foods;
    }
    
    console.log('[API] Successfully processed request');
    return NextResponse.json(response);
  } catch (error) {
    console.error('[API] Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 