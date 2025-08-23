import { useState, useEffect, useRef } from 'react';
import { FiMessageCircle, FiX, FiSend, FiUser, FiBot, FiMinimize2 } from 'react-icons/fi';
import { faqData } from '../faqData';

export default function EnhancedChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { 
      from: 'bot', 
      text: 'Hi there! 👋 I\'m here to help you navigate our platform. You can ask me about our rules, how to find help, or anything else about our community.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([
    'What is this platform?',
    'How do I find a therapist?',
    'What are the rules?',
    'How do I stay anonymous?'
  ]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const findAnswer = (userInput) => {
    const userWords = userInput.toLowerCase().split(' ');
    let bestMatch = { 
      score: 0, 
      answer: "I'm sorry, I don't have a specific answer for that. You might want to check our Resource Directory or contact a moderator for more help. Is there anything else I can help you with?",
      relatedQuestions: []
    };

    faqData.forEach(faq => {
      let currentScore = 0;
      faq.keywords.forEach(keyword => {
        if (userWords.some(word => word.includes(keyword) || keyword.includes(word))) {
          currentScore++;
        }
      });
      
      if (currentScore > bestMatch.score) {
        bestMatch = { 
          score: currentScore, 
          answer: faq.answer,
          relatedQuestions: faqData
            .filter(f => f !== faq && f.keywords.some(k => faq.keywords.includes(k)))
            .slice(0, 2)
            .map(f => f.question)
        };
      }
    });

    return bestMatch;
  };

  const handleSend = (messageText = input) => {
    if (!messageText.trim()) return;

    const userMessage = { 
      from: 'user', 
      text: messageText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = findAnswer(messageText);
      const botMessage = { 
        from: 'bot', 
        text: botResponse.answer,
        timestamp: new Date(),
        relatedQuestions: botResponse.relatedQuestions
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Update suggestions based on context
      if (botResponse.relatedQuestions.length > 0) {
        setSuggestions(botResponse.relatedQuestions);
      }
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleSuggestionClick = (suggestion) => {
    handleSend(suggestion);
    setSuggestions([]);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        {isOpen && (
          <div className={`chat-window ${isMinimized ? 'minimized' : ''}`}>
            <div className="chat-header">
              <div className="header-info">
                <div className="bot-avatar">
                  <FiBot />
                </div>
                <div className="bot-info">
                  <h4>Support Assistant</h4>
                  <span className="status">Online</span>
                </div>
              </div>
              <div className="header-actions">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="header-btn"
                  aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
                >
                  <FiMinimize2 />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="header-btn close-btn"
                  aria-label="Close chat"
                >
                  <FiX />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="chat-messages">
                  {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.from}`}>
                      <div className="message-avatar">
                        {msg.from === 'user' ? <FiUser /> : <FiBot />}
                      </div>
                      <div className="message-content">
                        <div className="message-bubble">
                          {msg.text}
                        </div>
                        <div className="message-time">
                          {formatTime(msg.timestamp)}
                        </div>
                        {msg.relatedQuestions && msg.relatedQuestions.length > 0 && (
                          <div className="related-questions">
                            <p>You might also want to ask:</p>
                            {msg.relatedQuestions.map((question, qIndex) => (
                              <button
                                key={qIndex}
                                onClick={() => handleSuggestionClick(question)}
                                className="related-question"
                              >
                                {question}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="message bot typing">
                      <div className="message-avatar">
                        <FiBot />
                      </div>
                      <div className="message-content">
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {suggestions.length > 0 && (
                  <div className="suggestions">
                    <p>Quick questions:</p>
                    <div className="suggestion-buttons">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="suggestion-btn"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <form className="chat-input-form" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isTyping}
                    maxLength={500}
                  />
                  <button 
                    type="submit" 
                    disabled={!input.trim() || isTyping}
                    aria-label="Send message"
                  >
                    <FiSend />
                  </button>
                </form>
              </>
            )}
          </div>
        )}

        <button 
          className={`chat-bubble ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? <FiX /> : <FiMessageCircle />}
          {!isOpen && (
            <div className="notification-dot" aria-hidden="true"></div>
          )}
        </button>
      </div>

      <style jsx>{`
        .chatbot-container {
          position: fixed;
          bottom: var(--space-4);
          right: var(--space-4);
          z-index: 1000;
          font-family: var(--font-family);
        }

        .chat-bubble {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: var(--shadow-lg);
          transition: all var(--transition-normal);
          position: relative;
        }

        .chat-bubble:hover {
          transform: scale(1.05);
          box-shadow: var(--shadow-xl);
        }

        .chat-bubble.active {
          background: linear-gradient(135deg, var(--error-500), var(--error-600));
        }

        .notification-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 12px;
          height: 12px;
          background-color: var(--error-500);
          border-radius: var(--radius-full);
          border: 2px solid white;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }

        .chat-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 380px;
          height: 600px;
          background-color: white;
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-xl);
          border: 1px solid var(--neutral-200);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s ease-out;
        }

        .chat-window.minimized {
          height: 60px;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .chat-header {
          background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
          color: white;
          padding: var(--space-4);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
        }

        .header-info {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .bot-avatar {
          width: 36px;
          height: 36px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .bot-info h4 {
          margin: 0;
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
        }

        .status {
          font-size: var(--font-size-xs);
          opacity: 0.9;
          display: flex;
          align-items: center;
          gap: var(--space-1);
        }

        .status::before {
          content: '';
          width: 6px;
          height: 6px;
          background-color: var(--success-400);
          border-radius: var(--radius-full);
        }

        .header-actions {
          display: flex;
          gap: var(--space-1);
        }

        .header-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: var(--space-1);
          border-radius: var(--radius-md);
          transition: background-color var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .chat-messages {
          flex: 1;
          padding: var(--space-4);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          background-color: var(--neutral-50);
        }

        .message {
          display: flex;
          gap: var(--space-2);
          animation: fadeIn 0.3s ease-out;
        }

        .message.user {
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
        }

        .message.bot .message-avatar {
          background-color: var(--primary-100);
          color: var(--primary-700);
        }

        .message.user .message-avatar {
          background-color: var(--secondary-100);
          color: var(--secondary-700);
        }

        .message-content {
          flex: 1;
          max-width: 80%;
        }

        .message.user .message-content {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .message-bubble {
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-lg);
          font-size: var(--font-size-sm);
          line-height: var(--line-height-relaxed);
          word-wrap: break-word;
        }

        .message.bot .message-bubble {
          background-color: white;
          border: 1px solid var(--neutral-200);
          color: var(--neutral-800);
        }

        .message.user .message-bubble {
          background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
          color: white;
        }

        .message-time {
          font-size: var(--font-size-xs);
          color: var(--neutral-500);
          margin-top: var(--space-1);
          padding: 0 var(--space-2);
        }

        .message.user .message-time {
          text-align: right;
        }

        .related-questions {
          margin-top: var(--space-3);
          padding: var(--space-3);
          background-color: var(--neutral-100);
          border-radius: var(--radius-lg);
        }

        .related-questions p {
          margin: 0 0 var(--space-2) 0;
          font-size: var(--font-size-xs);
          color: var(--neutral-600);
          font-weight: var(--font-weight-medium);
        }

        .related-question {
          display: block;
          width: 100%;
          text-align: left;
          background: none;
          border: 1px solid var(--neutral-300);
          border-radius: var(--radius-md);
          padding: var(--space-2) var(--space-3);
          margin-bottom: var(--space-2);
          font-size: var(--font-size-xs);
          color: var(--primary-600);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .related-question:hover {
          background-color: var(--primary-50);
          border-color: var(--primary-500);
        }

        .typing-indicator {
          display: flex;
          gap: var(--space-1);
          padding: var(--space-3) var(--space-4);
          background-color: white;
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-lg);
          width: fit-content;
        }

        .typing-indicator span {
          width: 6px;
          height: 6px;
          background-color: var(--neutral-400);
          border-radius: var(--radius-full);
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .suggestions {
          padding: var(--space-3) var(--space-4);
          border-top: 1px solid var(--neutral-200);
          background-color: white;
        }

        .suggestions p {
          margin: 0 0 var(--space-2) 0;
          font-size: var(--font-size-xs);
          color: var(--neutral-600);
          font-weight: var(--font-weight-medium);
        }

        .suggestion-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .suggestion-btn {
          background-color: var(--primary-50);
          border: 1px solid var(--primary-200);
          border-radius: var(--radius-full);
          padding: var(--space-1) var(--space-3);
          font-size: var(--font-size-xs);
          color: var(--primary-700);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .suggestion-btn:hover {
          background-color: var(--primary-100);
          border-color: var(--primary-300);
        }

        .chat-input-form {
          display: flex;
          padding: var(--space-4);
          border-top: 1px solid var(--neutral-200);
          background-color: white;
          border-radius: 0 0 var(--radius-2xl) var(--radius-2xl);
        }

        .chat-input-form input {
          flex: 1;
          border: 1px solid var(--neutral-300);
          border-radius: var(--radius-full);
          padding: var(--space-3) var(--space-4);
          font-size: var(--font-size-sm);
          margin: 0;
          margin-right: var(--space-2);
        }

        .chat-input-form input:focus {
          border-color: var(--primary-500);
          box-shadow: 0 0 0 3px var(--primary-100);
        }

        .chat-input-form input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .chat-input-form button {
          background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
          border: none;
          border-radius: var(--radius-full);
          color: white;
          cursor: pointer;
          padding: var(--space-3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
          margin: 0;
        }

        .chat-input-form button:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .chat-input-form button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          .chatbot-container {
            bottom: var(--space-3);
            right: var(--space-3);
          }

          .chat-window {
            width: calc(100vw - var(--space-6));
            max-width: 350px;
            height: 500px;
          }

          .chat-bubble {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
}