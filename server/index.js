const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const mongoose = require("mongoose");
const Query = require("./models/Query");

const app = express();
app.use(express.json());

// OpenAI API setup
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Route to get explanation
app.post("/api/submit-query", async (req, res) => {
  const { topic, level } = req.body;

  // Create the prompt based on the level
  let prompt = `Explain the topic "${topic}" like a ${level} year old.`;

  try {
    // Call OpenAI API to get the explanation
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 200,
    });

    // Send the explanation back as response
    res.json({ explanation: response.data.choices[0].text.trim() });

    // Save the query to the database
    const newQuery = new Query({ topic, level });
    await newQuery.save();
  } catch (error) {
    console.error("Error getting explanation:", error);
    res.status(500).json({ message: "Error fetching explanation" });
  }
});

// MongoDB connection and server setup
mongoose.connect("mongodb://localhost:27017/Easypeasy", { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(5000, () => console.log("Server running on port 5000"));
