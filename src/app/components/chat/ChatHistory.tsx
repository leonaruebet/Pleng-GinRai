/**
 * ChatHistory component for displaying chat message history
 */
import React, { useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '../../types';
import ChatMessage from './ChatMessage';

interface ChatHistoryProps {
  messages: ChatMessageType[];
}

/**
 * ChatHistory component displays a list of chat messages
 * @param messages - Array of chat messages to display
 * @returns JSX.Element - The rendered component
 */
const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  console.log(`[ChatHistory] Rendering ${messages.length} messages`);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // If there are no messages, don't display anything
  if (messages.length === 0) {
    return null;
  }
  
  // Get only the last 5 messages to keep the history compact
  const recentMessages = messages.slice(-5);
  
  return (
    <div className="rounded-xl max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <div className="space-y-3 p-1">
        {recentMessages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatHistory; 