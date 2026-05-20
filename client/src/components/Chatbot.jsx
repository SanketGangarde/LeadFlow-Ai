import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../styles/Chatbot.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://leadflow-ai-03sa.onrender.com/api';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/chat`, { message: userMsg });
      setMessages(prev => [...prev, { text: response.data.reply, isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-card">
      <div className="chatbot-header">
        <div className="chatbot-avatar">🤖</div>
        <div>
          <h3 className="chatbot-title">AI Assistant</h3>
          <p className="chatbot-status">Online</p>
        </div>
      </div>
      
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-wrapper ${msg.isBot ? 'bot' : 'user'}`}>
            <div className={`message-bubble ${msg.isBot ? 'bot-bubble' : 'user-bubble'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message-wrapper bot">
            <div className="message-bubble bot-bubble typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chatbot-input-area" onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="chat-input"
          disabled={isLoading}
        />
        <button type="submit" className="chat-submit-btn" disabled={isLoading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
