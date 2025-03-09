/**
 * CardGrid component for displaying a grid of cards
 */
import React from 'react';
import RestaurantCard from './RestaurantCard';
import FoodCard from './FoodCard';
import { Restaurant, Food } from '../../types';

interface CardGridProps {
  restaurants?: Restaurant[];
  foods?: Food[];
  onRemoveRestaurant: (id: string) => void;
  onRemoveFood: (id: string) => void;
}

/**
 * CardGrid component displays a grid of restaurant and food cards
 * @param restaurants - Array of restaurant information to display
 * @param foods - Array of food information to display
 * @param onRemoveRestaurant - Callback function to remove a restaurant card
 * @param onRemoveFood - Callback function to remove a food card
 * @returns JSX.Element - The rendered component
 */
const CardGrid: React.FC<CardGridProps> = ({ 
  restaurants = [], 
  foods = [], 
  onRemoveRestaurant, 
  onRemoveFood 
}) => {
  console.log(`[CardGrid] Rendering grid with ${restaurants.length} restaurants and ${foods.length} foods`);
  
  // If there are no restaurants or foods, display a message
  if (restaurants.length === 0 && foods.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-6xl mb-4">🍽️</div>
        <p className="text-gray-600 text-lg font-medium text-center max-w-md">
          No results to display. Try searching for restaurants or foods.
        </p>
        <div className="mt-6 w-32 h-1 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full"></div>
      </div>
    );
  }
  
  // Separate restaurants and foods sections if both are present
  const hasRestaurants = restaurants.length > 0;
  const hasFoods = foods.length > 0;
  const showBothSections = hasRestaurants && hasFoods;
  
  return (
    <div className="py-8 px-4">
      {/* Restaurants section */}
      {hasRestaurants && (
        <div className="mb-10">
          {showBothSections && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Restaurants</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full"></div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onRemove={onRemoveRestaurant}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Foods section */}
      {hasFoods && (
        <div>
          {showBothSections && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Foods</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full"></div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onRemove={onRemoveFood}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardGrid; 