import React, { useState, useRef } from 'react';
import { Smile, Send, Paperclip } from 'lucide-react';
import Button from '../ui/Button';

const ChatInput = ({ 
  onSendMessage, 
  recipientName = 'client',
  disabled = false,
  className = '' 
}) => {
  const [message, setMessage] = useState('');
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim() || disabled) return;
    
    onSendMessage?.(message.trim());
    setMessage('');
    
    // Refocus input after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const insertEmoji = (emoji) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;
    const newMessage = message.substring(0, start) + emoji + message.substring(end);
    
    setMessage(newMessage);
    setIsEmojiOpen(false);
    
    // Reset cursor position
    setTimeout(() => {
      input.selectionStart = input.selectionEnd = start + emoji.length;
      input.focus();
    }, 0);
  };

  const commonEmojis = ['😊', '😂', '👍', '❤️', '🔥', '💯', '🎉', '👏', '🙏', '💪'];

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Emoji Picker */}
      {isEmojiOpen && (
        <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-yellow-200/50 p-3 sm:p-4">
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 sm:gap-2">
            {commonEmojis.map((emoji, index) => (
              <button
                key={index}
                type="button"
                onClick={() => insertEmoji(emoji)}
                className="w-10 h-10 flex items-center justify-center hover:bg-yellow-50 rounded-lg transition-colors text-lg border border-transparent hover:border-yellow-200"
                aria-label={`Insert ${emoji} emoji`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Section */}
      <div className="flex items-end gap-1.5 sm:gap-3">
        {/* Attach Button - Outside with gray background */}
        <button
          type="button"
          onClick={() => console.log('Attach file')}
          className="flex-shrink-0 p-2 sm:p-2.5 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors mb-1"
          aria-label="Attach file"
          disabled={disabled}
        >
          <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Emoji Button - Outside with stylish design */}
        <button
          type="button"
          onClick={() => setIsEmojiOpen(!isEmojiOpen)}
          className="flex-shrink-0 p-2 sm:p-2.5 text-yellow-500 hover:text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-full transition-colors mb-1 border border-yellow-200"
          aria-label="Add emoji"
          disabled={disabled}
        >
          <div className="text-base sm:text-lg leading-none">😊</div>
        </button>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-white/20">

          {/* Text Input */}
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Reply to ${recipientName} here...`}
            className="flex-1 bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 text-sm sm:text-base"
            disabled={disabled}
            maxLength={1000}
          />

          {/* Send Button */}
          <Button
            type="submit"
            variant="gradient"
            size="sm"
            disabled={!message.trim() || disabled}
            className="flex-shrink-0 !px-2 sm:!px-3 !py-2"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>

      {/* Click outside to close emoji picker */}
      {isEmojiOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsEmojiOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default ChatInput;
