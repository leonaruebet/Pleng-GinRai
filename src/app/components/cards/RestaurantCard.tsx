/**
 * RestaurantCard component for displaying restaurant information
 */
import React, { useEffect } from 'react';
import { Restaurant } from '../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onRemove: (id: string) => void;
}

/**
 * RestaurantCard component displays restaurant information in a card format
 * @param restaurant - The restaurant information to display
 * @param onRemove - Callback function to remove the restaurant card
 * @returns JSX.Element - The rendered component
 */
const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onRemove }) => {
  // Add detailed logging for debugging
  console.log(`[RestaurantCard] Rendering card for ${restaurant.name}`);
  console.log(`[RestaurantCard] Restaurant data:`, JSON.stringify(restaurant, null, 2));
  
  // Use useEffect to log when the component mounts
  useEffect(() => {
    console.log(`[RestaurantCard] Component mounted for ${restaurant.name}`);
    console.log(`[RestaurantCard] Address: ${restaurant.address}`);
    console.log(`[RestaurantCard] Rating: ${restaurant.rating}`);
    console.log(`[RestaurantCard] Cuisine: ${restaurant.cuisine}`);
  }, [restaurant]);
  
  // Get appropriate food emoji based on cuisine
  const getFoodEmoji = (cuisine: string): string => {
    const cuisineLower = cuisine.toLowerCase();
    
    if (cuisineLower.includes('thai')) return '🍲';
    if (cuisineLower.includes('japanese') || cuisineLower.includes('sushi')) return '🍣';
    if (cuisineLower.includes('italian') || cuisineLower.includes('pizza')) return '🍕';
    if (cuisineLower.includes('burger') || cuisineLower.includes('american')) return '🍔';
    if (cuisineLower.includes('seafood')) return '🦞';
    if (cuisineLower.includes('steak')) return '🥩';
    if (cuisineLower.includes('chinese')) return '🥡';
    if (cuisineLower.includes('indian')) return '🍛';
    if (cuisineLower.includes('mexican')) return '🌮';
    if (cuisineLower.includes('bakery') || cuisineLower.includes('bread')) return '🥐';
    if (cuisineLower.includes('coffee') || cuisineLower.includes('cafe')) return '☕';
    if (cuisineLower.includes('dessert') || cuisineLower.includes('cake')) return '🍰';
    if (cuisineLower.includes('noodle')) return '🍜';
    if (cuisineLower.includes('rice')) return '🍚';
    if (cuisineLower.includes('french')) return '🥖';
    if (cuisineLower.includes('bar') || cuisineLower.includes('cocktail')) return '🍸';
    if (cuisineLower.includes('vegetarian')) return '🥗';
    
    // Default emoji for other cuisines
    return '🍽️';
  };
  
  // Generate star rating display
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`star-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        
        {hasHalfStar && (
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="half-star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill="url(#half-star-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <svg key={`empty-star-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        
        <span className="ml-1 text-gray-600 font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  // Get gradient background based on cuisine
  const getGradientBackground = (cuisine: string): string => {
    const cuisineLower = cuisine.toLowerCase();
    
    if (cuisineLower.includes('thai')) 
      return 'bg-gradient-to-br from-purple-100 to-pink-100';
    if (cuisineLower.includes('japanese')) 
      return 'bg-gradient-to-br from-red-50 to-pink-100';
    if (cuisineLower.includes('italian')) 
      return 'bg-gradient-to-br from-green-50 to-blue-100';
    if (cuisineLower.includes('american')) 
      return 'bg-gradient-to-br from-blue-50 to-indigo-100';
    if (cuisineLower.includes('seafood')) 
      return 'bg-gradient-to-br from-blue-50 to-cyan-100';
    if (cuisineLower.includes('steak')) 
      return 'bg-gradient-to-br from-red-50 to-orange-100';
    if (cuisineLower.includes('chinese')) 
      return 'bg-gradient-to-br from-red-50 to-yellow-100';
    if (cuisineLower.includes('indian')) 
      return 'bg-gradient-to-br from-orange-50 to-yellow-100';
    if (cuisineLower.includes('french')) 
      return 'bg-gradient-to-br from-blue-50 to-purple-100';
    if (cuisineLower.includes('vegetarian')) 
      return 'bg-gradient-to-br from-green-50 to-emerald-100';
    
    // Default gradient
    return 'bg-gradient-to-br from-blue-50 to-purple-100';
  };
  
  return (
    <div className={`rounded-3xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${getGradientBackground(restaurant.cuisine || "")}`}>
      <div className="relative">
        {/* Food emoji based on cuisine instead of image */}
        <div className="w-full h-48 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm">
          <span className="text-8xl" role="img" aria-label={restaurant.cuisine || "Restaurant"}>
            {getFoodEmoji(restaurant.cuisine || "")}
          </span>
        </div>
        
        {/* Remove button */}
        <button 
          onClick={() => {
            console.log(`[RestaurantCard] Removing card for ${restaurant.name}`);
            onRemove(restaurant.id);
          }}
          className="absolute top-3 right-3 bg-white bg-opacity-70 text-red-500 p-1.5 rounded-full hover:bg-opacity-100 transition-colors shadow-md"
          aria-label="Remove restaurant"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="p-6">
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-3">{restaurant.name}</h3>
        
        {/* Cuisine */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500 mb-1">Cuisine</p>
          <p className="text-gray-700 text-sm bg-white bg-opacity-60 p-2 rounded-xl">{restaurant.cuisine || "Not specified"}</p>
        </div>
        
        {/* Rating - Made more prominent */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500 mb-1">Rating</p>
          <div className="bg-white bg-opacity-60 p-2 rounded-xl">
            {renderRating(restaurant.rating)}
          </div>
        </div>
        
        {/* Address - Made more prominent and improved visibility */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500 mb-1">ที่อยู่ (Address)</p>
          <div className="flex items-start bg-white bg-opacity-80 p-3 rounded-xl border border-blue-100 shadow-sm">
            <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-700 break-words">
              {restaurant.address ? restaurant.address : "Address not available"}
            </span>
          </div>
        </div>
        
        {/* Description */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
          <p className="text-gray-700 text-sm bg-white bg-opacity-60 p-2 rounded-xl">{restaurant.description || "No description available"}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard; 