// server/models/Explanation.js
const mongoose = require('mongoose');

// Define the explanation schema
const explanationSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  level: { type: String, required: true },
  explanation: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the Explanation model
const Explanation = mongoose.model('Explanation', explanationSchema);

module.exports = Explanation;
