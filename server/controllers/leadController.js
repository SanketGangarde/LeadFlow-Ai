const Lead = require('../models/Lead');
const { getAIResponse } = require('../services/aiService');
const { sendConfirmationEmail } = require('../services/emailService');

const createLead = async (req, res) => {
  try {
    const { name, email, phone, interest, message } = req.body;

    if (!name || !email || !phone || !interest || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Generate AI Summary
    const summaryPrompt = `Summarize this lead in one professional sentence. Name: ${name}, Interest: ${interest}, Message: ${message}`;
    const aiSummary = await getAIResponse(summaryPrompt);

    // Generate Lead Status
    const statusPrompt = `Classify this lead as Hot, Warm, or Cold based on the following message and interest. Return ONLY the word 'Hot', 'Warm', or 'Cold'. Message: ${message}, Interest: ${interest}`;
    let leadStatusRaw = await getAIResponse(statusPrompt);
    
    // Clean up status output
    let leadStatus = 'Warm';
    if (leadStatusRaw.includes('Hot')) leadStatus = 'Hot';
    else if (leadStatusRaw.includes('Cold')) leadStatus = 'Cold';

    const newLead = new Lead({
      name,
      email,
      phone,
      interest,
      message,
      aiSummary,
      leadStatus
    });

    await newLead.save();

    // Fire and forget email sending
    sendConfirmationEmail(newLead);

    res.status(201).json({ message: 'Lead captured successfully', lead: newLead });
  } catch (error) {
    console.error('Lead capture error:', error);
    res.status(500).json({ error: 'Failed to capture lead' });
  }
};

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
};

module.exports = {
  createLead,
  getLeads
};
