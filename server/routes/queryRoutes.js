// routes/queryRoutes.js

const express = require('express');
const Query = require('../models/Query');

const router = express.Router();

// POST route for submitting a query
router.post('/submit-query', async (req, res) => {
  const { topic, level } = req.body;

  if (!topic || !level) {
    return res.status(400).json({ message: 'Topic and level are required' });
  }

  try {
    const newQuery = new Query({ topic, level });
    await newQuery.save();
    res.status(200).json({ message: `Your query for "${topic}" at level ${level} has been submitted!` });
  } catch (error) {
    res.status(500).json({ message: 'There was an error processing your query', error });
  }
});

// GET route for retrieving all queries
router.get('/queries', async (req, res) => {
  try {
    const queries = await Query.find(); // Fetch all queries
    res.status(200).json(queries); // Return the queries as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching queries', error });
  }
});

module.exports = router;
