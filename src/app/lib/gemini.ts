/**
 * Utility functions for interacting with the Gemini API
 */
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Restaurant, Food } from '../types';

// Initialize the Gemini API client
// Note: API key should be stored in environment variables in production
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not defined in environment variables');
    throw new Error('GEMINI_API_KEY is not defined');
  }
  
  return new GoogleGenerativeAI(apiKey);
};

/**
 * Verify if restaurants are actually in the specified location
 * @param restaurants - List of restaurants to verify
 * @param location - The location to verify against
 * @returns Promise<Restaurant[]> - A list of verified restaurants
 */
async function verifyRestaurantLocations(restaurants: Restaurant[], location: string): Promise<Restaurant[]> {
  console.log(`[verifyRestaurantLocations] Verifying ${restaurants.length} restaurants in ${location}`);
  
  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    // Create a simplified list of restaurants for verification
    const restaurantList = restaurants.map(r => ({
      id: r.id,
      name: r.name,
      address: r.address
    }));
    
    const prompt = `
      You are a local expert with extensive knowledge of restaurants and locations in Thailand and around the world.
      
      I have a list of restaurants that are supposed to be in or near "${location}".
      Your task is to verify which of these restaurants actually exist in this location.
      
      For each restaurant, determine:
      1. If it's a real restaurant that exists in ${location}
      2. If the address is accurate for this location
      
      Here's the list of restaurants:
      ${JSON.stringify(restaurantList, null, 2)}
      
      Return a JSON array containing ONLY the IDs of restaurants that are verified to be real and actually in ${location}.
      Format your response as: ["rest-1", "rest-3", "rest-5"] (just the IDs in an array)
      
      Only return the JSON array, nothing else. No explanations, no markdown formatting, just the raw JSON array of verified restaurant IDs.
    `;
    
    console.log(`[verifyRestaurantLocations] Sending verification prompt to Gemini API`);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('[verifyRestaurantLocations] Raw verification response from Gemini API:');
    console.log(text);
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('[verifyRestaurantLocations] Failed to extract JSON from verification response');
      return restaurants; // Return original list if verification fails
    }
    
    const verifiedIds = JSON.parse(jsonMatch[0]) as string[];
    console.log(`[verifyRestaurantLocations] Verified ${verifiedIds.length} out of ${restaurants.length} restaurants`);
    
    // Filter the original restaurant list to only include verified restaurants
    const verifiedRestaurants = restaurants.filter(restaurant => 
      verifiedIds.includes(restaurant.id)
    );
    
    // If too few restaurants are verified, return the original list
    if (verifiedRestaurants.length < 5 && restaurants.length > 0) {
      console.log('[verifyRestaurantLocations] Too few verified restaurants, returning original list');
      return restaurants;
    }
    
    return verifiedRestaurants;
  } catch (error) {
    console.error('[verifyRestaurantLocations] Error during verification:', error);
    return restaurants; // Return original list if verification fails
  }
}

/**
 * Generate restaurant recommendations based on location
 * @param location - The location to search for restaurants
 * @returns Promise<Restaurant[]> - A list of restaurant recommendations
 */
export async function getRestaurantRecommendations(location: string): Promise<Restaurant[]> {
  console.log(`[getRestaurantRecommendations] Searching for restaurants in ${location}`);
  
  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    // Check if the location is in Thailand or query is in Thai language
    const isThaiQuery = /[ก-๙]/.test(location) || 
                        /thailand|thai|bangkok|phuket|chiang mai|pattaya/i.test(location);
    
    const prompt = `
      You are a knowledgeable food and restaurant expert with extensive knowledge of global cuisines and dining establishments, with special expertise in Thai cuisine and restaurants in Thailand.
      
      ${isThaiQuery ? 'คุณเป็นผู้เชี่ยวชาญด้านอาหารและร้านอาหารในประเทศไทย ให้คำแนะนำร้านอาหารที่ดีที่สุดในแต่ละพื้นที่' : ''}
      
      Generate a detailed list of exactly 15 authentic restaurant recommendations near ${location}.
      ${isThaiQuery ? 'เน้นร้านอาหารที่มีอยู่จริงและมีชื่อเสียงในพื้นที่นี้ ให้ข้อมูลที่ถูกต้องและเป็นประโยชน์สำหรับคนท้องถิ่นและนักท่องเที่ยว' : ''}
      
      IMPORTANT: Only include REAL restaurants that ACTUALLY EXIST in ${location}. Do not make up fictional restaurants.
      Use your knowledge to recommend well-known, popular, and authentic restaurants that are definitely located in ${location}.
      
      Include a diverse mix of cuisines, price ranges, and dining experiences.
      ${isThaiQuery ? 'รวมร้านอาหารไทยท้องถิ่น ร้านอาหารที่มีชื่อเสียง และร้านที่คนท้องถิ่นนิยม' : ''}
      
      For each restaurant, provide authentic and accurate information including realistic addresses, ratings, and descriptions.
      ${isThaiQuery ? 'ให้ที่อยู่ที่ถูกต้อง คะแนนที่สมจริง และคำอธิบายที่มีประโยชน์เกี่ยวกับอาหารเด่นและบรรยากาศของร้าน' : ''}
      
      Format the response as a valid JSON array of restaurant objects with the following properties:
      - id: a unique string identifier (use format "rest-1", "rest-2", etc.)
      - name: the restaurant name ${isThaiQuery ? 'in Thai with English translation if applicable' : ''} (be creative and authentic to the location's culture)
      - cuisine: the specific type of cuisine ${isThaiQuery ? 'in Thai and English' : ''} (be precise, e.g., "อาหารไทยภาคเหนือ (Northern Thai)" instead of just "Thai")
      - address: a realistic and detailed address in ${location} ${isThaiQuery ? 'using Thai address format with district and sub-district' : ''}
      - rating: a number between 1 and 5 (can include one decimal place for precision)
      - priceRange: a string like "$", "$$", "$$$", or "$$$$" indicating affordability
      - description: a detailed 2-3 sentence description ${isThaiQuery ? 'in Thai and English' : ''} highlighting unique aspects, signature dishes, ambiance, or history
      - imageUrl: leave this empty or null as we'll use default images
      
      Ensure each restaurant has all required properties and the data is well-formatted as a valid JSON array.
      Only return the JSON array, nothing else. No explanations, no markdown formatting, just the raw JSON array.
    `;
    
    console.log(`[getRestaurantRecommendations] Sending prompt to Gemini API: ${prompt}`);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('[getRestaurantRecommendations] Raw response from Gemini API:');
    console.log(text);
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('[getRestaurantRecommendations] Failed to extract JSON from response');
      return [];
    }
    
    const jsonText = jsonMatch[0];
    console.log('[getRestaurantRecommendations] Extracted JSON:');
    console.log(jsonText);
    
    const restaurants = JSON.parse(jsonText) as Restaurant[];
    console.log(`[getRestaurantRecommendations] Found ${restaurants.length} restaurants`);
    
    // Log the first restaurant as an example
    if (restaurants.length > 0) {
      console.log('[getRestaurantRecommendations] Example restaurant:');
      console.log(JSON.stringify(restaurants[0], null, 2));
    }
    
    // Verify restaurant locations
    console.log('[getRestaurantRecommendations] Verifying restaurant locations...');
    const verifiedRestaurants = await verifyRestaurantLocations(restaurants, location);
    console.log(`[getRestaurantRecommendations] After verification: ${verifiedRestaurants.length} restaurants`);
    
    return verifiedRestaurants;
  } catch (error) {
    console.error('[getRestaurantRecommendations] Error:', error);
    return [];
  }
}

/**
 * Generate food recommendations based on food type
 * @param foodType - The type of food to search for
 * @returns Promise<Food[]> - A list of food recommendations
 */
export async function getFoodRecommendations(foodType: string): Promise<Food[]> {
  console.log(`[getFoodRecommendations] Searching for ${foodType} foods`);
  
  // Check if the query contains restaurant-related keywords
  const isRestaurantQuery = /ร้าน|restaurant|place|eatery|dining|cafe|bistro/i.test(foodType);
  
  // If it's a restaurant query, redirect to restaurant recommendations
  if (isRestaurantQuery) {
    console.log(`[getFoodRecommendations] Detected restaurant query, redirecting to restaurant recommendations`);
    // Extract location from the query by removing restaurant keywords
    const location = foodType.replace(/ร้าน|restaurant|place|eatery|dining|cafe|bistro/gi, '').trim();
    return getRestaurantRecommendations(location);
  }
  
  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    // Check if the query is in Thai language
    const isThaiQuery = /[ก-๙]/.test(foodType);
    
    const prompt = `
      You are a culinary expert with deep knowledge of global cuisines, cooking techniques, and food history, with special expertise in Thai cuisine.
      
      ${isThaiQuery ? 'คุณเป็นผู้เชี่ยวชาญด้านอาหารไทยและอาหารนานาชาติ ให้ข้อมูลที่ถูกต้องและละเอียดเกี่ยวกับอาหารแต่ละชนิด' : ''}
      
      Generate a detailed list of exactly 15 ${foodType} food recommendations.
      ${isThaiQuery ? 'เน้นอาหารที่เป็นที่นิยมและมีความสำคัญทางวัฒนธรรม ให้ข้อมูลที่ถูกต้องและเป็นประโยชน์' : ''}
      
      Include a diverse mix of dishes, from traditional classics to modern interpretations.
      ${isThaiQuery ? 'รวมทั้งอาหารดั้งเดิมและอาหารประยุกต์ร่วมสมัย แสดงให้เห็นความหลากหลายของอาหารประเภทนี้' : ''}
      
      For each food item, provide authentic and accurate information including cultural context and key ingredients.
      ${isThaiQuery ? 'ให้ข้อมูลที่ถูกต้องเกี่ยวกับประวัติความเป็นมา วิธีการทำ และวัตถุดิบสำคัญของอาหารแต่ละชนิด' : ''}
      
      Format the response as a valid JSON array of food objects with the following properties:
      - id: a unique string identifier (use format "food-1", "food-2", etc.)
      - name: the food name ${isThaiQuery ? 'in Thai with English translation' : 'in both local language (if applicable) and English'}
      - cuisine: the specific regional cuisine this food belongs to ${isThaiQuery ? 'in Thai and English' : ''}
      - description: a detailed 2-3 sentence description ${isThaiQuery ? 'in Thai and English' : ''} explaining what the dish is, its origin, how it's prepared, and what makes it special
      - ingredients: an array of 5-8 main ingredients used in the dish ${isThaiQuery ? 'in Thai and English' : ''}
      - imageUrl: leave this empty or null as we'll use default images
      
      Ensure each food item has all required properties and the data is well-formatted as a valid JSON array.
      Only return the JSON array, nothing else. No explanations, no markdown formatting, just the raw JSON array.
    `;
    
    console.log(`[getFoodRecommendations] Sending prompt to Gemini API: ${prompt}`);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('[getFoodRecommendations] Raw response from Gemini API:');
    console.log(text);
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('[getFoodRecommendations] Failed to extract JSON from response');
      return [];
    }
    
    const jsonText = jsonMatch[0];
    console.log('[getFoodRecommendations] Extracted JSON:');
    console.log(jsonText);
    
    const foods = JSON.parse(jsonText) as Food[];
    console.log(`[getFoodRecommendations] Found ${foods.length} foods`);
    
    // Log the first food as an example
    if (foods.length > 0) {
      console.log('[getFoodRecommendations] Example food:');
      console.log(JSON.stringify(foods[0], null, 2));
    }
    
    return foods;
  } catch (error) {
    console.error('[getFoodRecommendations] Error:', error);
    return [];
  }
} 