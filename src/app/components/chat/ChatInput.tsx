/**
 * ChatInput component for user input
 */
import React, { useState, FormEvent } from 'react';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}

/**
 * ChatInput component provides a form for user input
 * @param onSubmit - Callback function when the form is submitted
 * @param isLoading - Boolean indicating if a request is in progress
 * @returns JSX.Element - The rendered component
 */
const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, isLoading }) => {
  const [message, setMessage] = useState('');
  
  /**
   * Handle form submission
   * @param e - Form event
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !isLoading) {
      console.log(`[ChatInput] Submitting message: ${message}`);
      onSubmit(message.trim());
      setMessage('');
    }
  };
  
  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          {/* Modern search input with frosted glass effect */}
          <div className="bg-gradient-to-r from-blue-100/80 via-purple-100/80 to-pink-100/80 p-1.5 rounded-2xl shadow-lg backdrop-blur-md">
            <div className="relative flex items-center bg-white/60 backdrop-blur-sm rounded-xl overflow-hidden">
              {/* Search icon */}
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-blue-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* Input field */}
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isLoading ? "กำลังค้นหา..." : "ค้นหาร้านอาหารหรือประเภทอาหาร..."}
                disabled={isLoading}
                className="w-full pl-14 pr-14 py-4 bg-transparent border-none focus:ring-0 focus:outline-none disabled:bg-transparent text-gray-700 placeholder-gray-500"
                aria-label="Search input"
              />
              
              {/* Submit button or loading indicator */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isLoading ? (
                  <div className="w-10 h-10 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl disabled:opacity-50 hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md"
                    aria-label="Search"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      
      {/* Suggestion pills with modern design */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        <SuggestionPill text="ร้านอาหารแถวทองหล่อ" onClick={(text) => onSubmit(text)} disabled={isLoading} />
        <SuggestionPill text="อาหารอิตาเลียน" onClick={(text) => onSubmit(text)} disabled={isLoading} />
        <SuggestionPill text="ร้านกาแฟแถวนี้" onClick={(text) => onSubmit(text)} disabled={isLoading} />
        <SuggestionPill text="อาหารไทยแถวสยาม" onClick={(text) => onSubmit(text)} disabled={isLoading} />
        <SuggestionPill text="ส้มตำแถวรังสิต" onClick={(text) => onSubmit(text)} disabled={isLoading} />
        <SuggestionPill text="ร้านอาหารญี่ปุ่นแถวอโศก" onClick={(text) => onSubmit(text)} disabled={isLoading} />
      </div>
    </div>
  );
};

interface SuggestionPillProps {
  text: string;
  onClick: (text: string) => void;
  disabled: boolean;
}

/**
 * SuggestionPill component for quick search suggestions
 */
const SuggestionPill: React.FC<SuggestionPillProps> = ({ text, onClick, disabled }) => {
  return (
    <button
      type="button"
      onClick={() => !disabled && onClick(text)}
      disabled={disabled}
      className="px-4 py-2 bg-white/70 backdrop-blur-sm text-sm text-gray-700 rounded-full border border-gray-200/50 hover:bg-blue-50/80 hover:border-blue-200/70 transition-all shadow-sm disabled:opacity-50"
    >
      {text}
    </button>
  );
};

export default ChatInput; 