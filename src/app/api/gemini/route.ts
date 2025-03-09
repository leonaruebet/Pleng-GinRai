/**
 * API route for interacting with the Gemini API
 */
import { NextRequest, NextResponse } from 'next/server';
import { getRestaurantRecommendations, getFoodRecommendations } from '../../lib/gemini';
import { GeminiResponse, Restaurant, Food } from '../../types';

// Set a longer timeout for the API route
export const maxDuration = 60; // 60 seconds timeout

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
    
    // Create a promise with timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('API request timed out')), 55000); // 55 seconds timeout
    });
    
    // Get restaurant recommendations if location is provided
    if (location) {
      console.log(`[API] Getting restaurant recommendations for location: ${location}`);
      try {
        const restaurantsPromise = getRestaurantRecommendations(location);
        const restaurants = await Promise.race([restaurantsPromise, timeoutPromise]) as Restaurant[];
        response.restaurants = restaurants;
      } catch (error) {
        console.error(`[API] Error getting restaurant recommendations: ${error}`);
        response.error = 'Failed to get restaurant recommendations. Please try again.';
      }
    }
    
    // Get food recommendations if foodType is provided
    if (foodType) {
      console.log(`[API] Getting food recommendations for type: ${foodType}`);
      try {
        const foodsPromise = getFoodRecommendations(foodType);
        const foods = await Promise.race([foodsPromise, timeoutPromise]) as Food[];
        response.foods = foods;
      } catch (error) {
        console.error(`[API] Error getting food recommendations: ${error}`);
        response.error = 'Failed to get food recommendations. Please try again.';
      }
    }
    
    console.log('[API] Successfully processed request');
    return NextResponse.json(response);
  } catch (error) {
    console.error('[API] Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
} 