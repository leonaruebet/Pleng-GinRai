/**
 * FoodCard component for displaying food information
 */
import React, { useEffect } from 'react';
import { Food } from '../../types';

interface FoodCardProps {
  food: Food;
  onRemove: (id: string) => void;
}

/**
 * FoodCard component displays food information in a card format
 * @param food - The food information to display
 * @param onRemove - Callback function to remove the food card
 * @returns JSX.Element - The rendered component
 */
const FoodCard: React.FC<FoodCardProps> = ({ food, onRemove }) => {
  // Add detailed logging for debugging
  console.log(`[FoodCard] Rendering card for ${food.name}`);
  console.log(`[FoodCard] Food data:`, JSON.stringify(food, null, 2));
  
  // Use useEffect to log when the component mounts
  useEffect(() => {
    console.log(`[FoodCard] Component mounted for ${food.name}`);
    console.log(`[FoodCard] Cuisine: ${food.cuisine}`);
  }, [food]);
  
  // Get appropriate food emoji based on cuisine and name
  const getFoodEmoji = (cuisine: string, name: string): string => {
    const cuisineLower = cuisine.toLowerCase();
    const nameLower = name.toLowerCase();
    
    // Check cuisine first
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
    
    // Then check food name for more specific matches
    if (nameLower.includes('pizza')) return '🍕';
    if (nameLower.includes('burger')) return '🍔';
    if (nameLower.includes('sushi')) return '🍣';
    if (nameLower.includes('pasta') || nameLower.includes('spaghetti')) return '🍝';
    if (nameLower.includes('taco')) return '🌮';
    if (nameLower.includes('curry')) return '🍛';
    if (nameLower.includes('soup')) return '🍲';
    if (nameLower.includes('salad')) return '🥗';
    if (nameLower.includes('sandwich')) return '🥪';
    if (nameLower.includes('bread') || nameLower.includes('toast')) return '🍞';
    if (nameLower.includes('cake')) return '🍰';
    if (nameLower.includes('ice cream')) return '🍦';
    if (nameLower.includes('cookie')) return '🍪';
    if (nameLower.includes('donut')) return '🍩';
    if (nameLower.includes('pancake')) return '🥞';
    if (nameLower.includes('meat') || nameLower.includes('steak')) return '🥩';
    if (nameLower.includes('chicken')) return '🍗';
    if (nameLower.includes('fish') || nameLower.includes('seafood')) return '🐟';
    if (nameLower.includes('shrimp') || nameLower.includes('prawn')) return '🦐';
    if (nameLower.includes('lobster') || nameLower.includes('crab')) return '🦞';
    
    // Default emoji for other foods
    return '🍴';
  };
  
  // Get gradient background based on cuisine
  const getGradientBackground = (cuisine: string, name: string): string => {
    const cuisineLower = cuisine.toLowerCase();
    const nameLower = name.toLowerCase();
    
    // Check cuisine first
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
    
    // Then check food name for more specific matches
    if (nameLower.includes('dessert') || nameLower.includes('cake') || nameLower.includes('sweet'))
      return 'bg-gradient-to-br from-pink-50 to-purple-100';
    if (nameLower.includes('spicy') || nameLower.includes('hot'))
      return 'bg-gradient-to-br from-red-50 to-orange-100';
    if (nameLower.includes('salad') || nameLower.includes('vegetable'))
      return 'bg-gradient-to-br from-green-50 to-emerald-100';
    if (nameLower.includes('seafood') || nameLower.includes('fish'))
      return 'bg-gradient-to-br from-blue-50 to-cyan-100';
    
    // Default gradient
    return 'bg-gradient-to-br from-indigo-50 to-purple-100';
  };
  
  return (
    <div className={`rounded-3xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${getGradientBackground(food.cuisine || "", food.name)}`}>
      <div className="relative">
        {/* Food emoji based on cuisine instead of image */}
        <div className="w-full h-48 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm">
          <span className="text-8xl" role="img" aria-label={food.name}>
            {getFoodEmoji(food.cuisine || "", food.name)}
          </span>
        </div>
        
        {/* Remove button */}
        <button 
          onClick={() => {
            console.log(`[FoodCard] Removing card for ${food.name}`);
            onRemove(food.id);
          }}
          className="absolute top-3 right-3 bg-white bg-opacity-70 text-red-500 p-1.5 rounded-full hover:bg-opacity-100 transition-colors shadow-md"
          aria-label="Remove food"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="p-6">
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-3">{food.name}</h3>
        
        {/* Cuisine */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500 mb-1">Cuisine</p>
          <p className="text-gray-700 text-sm bg-white bg-opacity-60 p-2 rounded-xl">{food.cuisine || "Not specified"}</p>
        </div>
        
        {/* Description */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
          <p className="text-gray-700 text-sm bg-white bg-opacity-60 p-2 rounded-xl">{food.description || "No description available"}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodCard; 