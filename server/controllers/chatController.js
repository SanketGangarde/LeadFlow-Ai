const Chat = require('../models/Chat');
const { getAIResponse } = require('../services/aiService');

const systemPrompt = `You are an AI business assistant for a tech training institute.
Answer professionally and briefly.

Available services:
- MERN Stack Training
- AI/ML Training
- Python Development
- Web Development

Provide concise responses.`;

const handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const botReply = await getAIResponse(message, systemPrompt);

    const chatEntry = new Chat({
      userMessage: message,
      botReply: botReply
    });
    
    await chatEntry.save();

    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
};

const getChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 }).limit(50);
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
};

module.exports = {
  handleChat,
  getChats
};
