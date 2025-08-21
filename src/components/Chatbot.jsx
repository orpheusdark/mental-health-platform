import { useState, useEffect, useRef } from 'react';
import { faqData } from '../faqData';
import './Chatbot.css'; // We will create this CSS file next

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! How can I help you today? Ask me about the platform, rules, or how to find help.' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = (userInput) => {
    const userWords = userInput.toLowerCase().split(' ');
    let bestMatch = { score: 0, answer: "I'm sorry, I don't have an answer for that. Try asking about our rules, finding a therapist, or what this platform is for." };

    faqData.forEach(faq => {
      let currentScore = 0;
      faq.keywords.forEach(keyword => {
        if (userWords.includes(keyword)) {
          currentScore++;
        }
      });
      if (currentScore > bestMatch.score) {
        bestMatch = { score: currentScore, answer: faq.answer };
      }
    });
    return bestMatch.answer;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    const botAnswer = findAnswer(input);
    setTimeout(() => {
      const botMessage = { from: 'bot', text: botAnswer };
      setMessages(prev => [...prev, botMessage]);
    }, 1000); // Simulate bot "thinking"

    setInput('');
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <p>Support Bot</p>
            <button onClick={() => setIsOpen(false)}>—</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chat-input-form" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
      <button className="chat-bubble" onClick={() => setIsOpen(!isOpen)}>
        ?
      </button>
    </div>
  );
}
