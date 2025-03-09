/**
 * Chatbot component that combines all chat components
 */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import { ChatMessage, Restaurant, Food } from '../../types';

interface ChatbotProps {
  onRestaurantsReceived: (restaurants: Restaurant[]) => void;
  onFoodsReceived: (foods: Food[]) => void;
}

/**
 * Chatbot component combines chat history and input components
 * @param onRestaurantsReceived - Callback function when restaurants are received
 * @param onFoodsReceived - Callback function when foods are received
 * @returns JSX.Element - The rendered component
 */
const Chatbot: React.FC<ChatbotProps> = ({ onRestaurantsReceived, onFoodsReceived }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  /**
   * Handle user message submission
   * @param content - The message content
   */
  const handleSubmit = async (content: string) => {
    console.log(`[Chatbot] Handling user message: ${content}`);
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Determine if the message is about location or food type
      const isLocationQuery = /restaurants?|places?|eat|dining|food near|in\s+[a-z\s]+/i.test(content);
      const isFoodTypeQuery = /food$|foods?|cuisine|dish|meal|recipe|menu|eat/i.test(content);
      
      let location = '';
      let foodType = '';
      
      if (isLocationQuery) {
        // Extract location from the message
        const locationMatch = content.match(/(?:in|near|at)\s+([a-z\s,]+)(?:\s|$)/i);
        if (locationMatch && locationMatch[1]) {
          location = locationMatch[1].trim();
        } else {
          // If no location is found, use the whole message as location
          location = content;
        }
        console.log(`[Chatbot] Detected location query: ${location}`);
      } else if (isFoodTypeQuery) {
        // Use the whole message as food type
        foodType = content;
        console.log(`[Chatbot] Detected food type query: ${foodType}`);
      } else {
        // If the message doesn't match any pattern, try to determine if it's a location or food type
        const words = content.split(/\s+/);
        if (words.length <= 3) {
          // If the message is short, assume it's a food type
          foodType = content;
          console.log(`[Chatbot] Assuming short query is food type: ${foodType}`);
        } else {
          // Otherwise, assume it's a location
          location = content;
          console.log(`[Chatbot] Assuming longer query is location: ${location}`);
        }
      }
      
      // Make API request
      console.log(`[Chatbot] Making API request with location: ${location || 'none'}, foodType: ${foodType || 'none'}`);
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: location || undefined,
          foodType: foodType || undefined,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`[Chatbot] API response:`, data);
      
      // Process the response
      if (data.restaurants && data.restaurants.length > 0) {
        console.log(`[Chatbot] Received ${data.restaurants.length} restaurants`);
        console.log(`[Chatbot] First restaurant:`, JSON.stringify(data.restaurants[0], null, 2));
        onRestaurantsReceived(data.restaurants);
      }
      
      if (data.foods && data.foods.length > 0) {
        console.log(`[Chatbot] Received ${data.foods.length} foods`);
        console.log(`[Chatbot] First food:`, JSON.stringify(data.foods[0], null, 2));
        onFoodsReceived(data.foods);
      }
      
      // Add assistant message to chat
      let responseContent = '';
      
      if (data.restaurants && data.restaurants.length > 0) {
        responseContent = `I found ${data.restaurants.length} restaurants ${location ? `in ${location}` : ''} for you. Check out the cards below!`;
      } else if (data.foods && data.foods.length > 0) {
        responseContent = `I found ${data.foods.length} ${foodType} food options for you. Check out the cards below!`;
      } else if (data.error) {
        responseContent = `Sorry, I encountered an error: ${data.error}`;
      } else {
        responseContent = "Sorry, I couldn't find any results. Please try a different query.";
      }
      
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      
      // Show chat history after getting a response
      setShowHistory(true);
    } catch (error) {
      console.error('[Chatbot] Error:', error);
      
      // Add error message to chat
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      
      // Show chat history after getting an error
      setShowHistory(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <div className="inline-block bg-gradient-to-r from-blue-100/80 via-purple-100/80 to-pink-100/80 p-1.5 rounded-2xl backdrop-blur-md mb-3">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2">
            <h2 className="text-xl font-semibold text-gray-800">เพลงอยากกินอะไร? 🙉</h2>
          </div>
        </div>
        <p className="text-gray-600">ค้นหาร้านอาหารหรือเมนูอาหารที่คุณต้องการ</p>
      </div>
      
      <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
      
      {showHistory && messages.length > 0 && (
        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-100/50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-500 flex items-center">
              <svg className="w-4 h-4 mr-1.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Searches
            </h3>
            <button 
              onClick={() => setShowHistory(false)} 
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
            >
              Hide
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ChatHistory messages={messages} />
        </div>
      )}
    </div>
  );
};

export default Chatbot; 