// server/routes/explain.js
const express = require('express');
const router = express.Router();
const Explanation = require('../models/Explanation');

// POST route to save an explanation
router.post('/explain', async (req, res) => {
  try {
    const { topic, level, explanation } = req.body;
    const newExplanation = new Explanation({ topic, level, explanation });
    await newExplanation.save();
    res.status(200).json({ message: 'Explanation saved successfully', explanation: newExplanation });
  } catch (error) {
    res.status(500).json({ message: 'Error saving explanation', error });
  }
});

// GET route to fetch all explanations
router.get('/explanations', async (req, res) => {
  try {
    const explanations = await Explanation.find();
    res.status(200).json(explanations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching explanations', error });
  }
});

module.exports = router;
