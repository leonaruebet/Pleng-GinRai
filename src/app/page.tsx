'use client';

/**
 * Main page component for the Restaurant and Food Finder application
 */
import React, { useState } from 'react';
import Chatbot from './components/chat/Chatbot';
import CardGrid from './components/cards/CardGrid';
import { Restaurant, Food } from './types';

/**
 * Home component is the main page of the application
 * @returns JSX.Element - The rendered component
 */
export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  
  /**
   * Handle restaurants received from the chatbot
   * @param newRestaurants - Array of restaurant information
   */
  const handleRestaurantsReceived = (newRestaurants: Restaurant[]) => {
    console.log(`[Home] Received ${newRestaurants.length} restaurants`);
    setRestaurants(newRestaurants);
    setFoods([]); // Clear foods when new restaurants are received
  };
  
  /**
   * Handle foods received from the chatbot
   * @param newFoods - Array of food information
   */
  const handleFoodsReceived = (newFoods: Food[]) => {
    console.log(`[Home] Received ${newFoods.length} foods`);
    setFoods(newFoods);
    setRestaurants([]); // Clear restaurants when new foods are received
  };
  
  /**
   * Remove a restaurant from the list
   * @param id - The ID of the restaurant to remove
   */
  const handleRemoveRestaurant = (id: string) => {
    console.log(`[Home] Removing restaurant with ID: ${id}`);
    setRestaurants((prev) => prev.filter((restaurant) => restaurant.id !== id));
  };
  
  /**
   * Remove a food from the list
   * @param id - The ID of the food to remove
   */
  const handleRemoveFood = (id: string) => {
    console.log(`[Home] Removing food with ID: ${id}`);
    setFoods((prev) => prev.filter((food) => food.id !== id));
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">สรุปเพลงจะกินไร ?</h1>
          <p className="text-gray-600 text-lg">
            ลีโอไม่เลือกแล้ว ลีโอจะให้ AI เลือกให้
          </p>
        </header>
        
        {/* Search bar section */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white/30 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/50">
            <Chatbot
              onRestaurantsReceived={handleRestaurantsReceived}
              onFoodsReceived={handleFoodsReceived}
            />
          </div>
        </div>
        
        {/* Results section */}
        <div className="mt-8">
          {(restaurants.length > 0 || foods.length > 0) && (
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                {restaurants.length > 0
                  ? 'ร้านอาหารแนะนำ'
                  : 'เมนูอาหารแนะนำ'}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-300 to-indigo-300 mx-auto rounded-full"></div>
            </div>
          )}
          
          <CardGrid
            restaurants={restaurants}
            foods={foods}
            onRemoveRestaurant={handleRemoveRestaurant}
            onRemoveFood={handleRemoveFood}
          />
        </div>
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} สรุปเพลงจะกินไร. All rights reserved.</p>
          <p className="mt-1">Powered by Next.js and Gemini AI</p>
        </footer>
      </div>
    </main>
  );
}
