const mongoose = require('mongoose');

// Define the query schema
const querySchema = new mongoose.Schema({
  topic: { type: String, required: true },
  level: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Create the Query model
const Query = mongoose.model('Query', querySchema);

module.exports = Query;
