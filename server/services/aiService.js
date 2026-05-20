const axios = require('axios');

const getAIResponse = async (prompt, systemInstruction = null) => {
  try {
    const messages = [];
    if (systemInstruction) {
      messages.push({ role: 'system', content: systemInstruction });
    }
    messages.push({ role: 'user', content: prompt });

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-r1-distill-llama-70b',
        messages: messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.VITE_API_URL || 'http://localhost:5000',
          'X-Title': 'LeadFlow AI',
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API Error:', error?.response?.data || error);
    return "I'm sorry, I'm having trouble connecting to my AI services right now.";
  }
};

module.exports = { getAIResponse };
