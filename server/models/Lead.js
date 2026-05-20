const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  interest: { type: String, required: true },
  message: { type: String, required: true },
  aiSummary: { type: String },
  leadStatus: { type: String, enum: ['Hot', 'Warm', 'Cold'] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Lead', leadSchema);
