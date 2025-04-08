const OpenAI = require("openai");
const express = require("express");
const mongoose = require("mongoose");
const Query = require("./models/Query");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
app.use(express.json());

// ✅ OpenAI API setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Using API key from environment variable
});

// 🎯 Endpoint to get an explanation
app.post("/api/submit-query", async (req, res) => {
  const { topic, level } = req.body;

  const prompt = `Explain the topic "${topic}" like a ${level}-year-old.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
    });

    const explanation = response.choices[0].message.content.trim();

    // Send explanation to client
    res.json({ explanation });

    // Save query to MongoDB
    const newQuery = new Query({ topic, level, date: new Date() });
    await newQuery.save();
  } catch (error) {
    console.error("Error fetching explanation:", error);
    res.status(500).json({ message: "Error fetching explanation" });
  }
});

// ✅ Fetch previous queries from MongoDB
app.get("/api/queries", async (req, res) => {
  try {
    const queries = await Query.find().sort({ date: -1 });
    res.json(queries);
  } catch (error) {
    console.error("Error fetching queries:", error);
    res.status(500).json({ message: "Error fetching queries" });
  }
});

// ✅ Connect to MongoDB using connection string from environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ Connected to MongoDB");

  // Start the server, binding to the dynamic port or fallback to 5000 for local development
  const PORT = process.env.PORT || 5000; // Use the port provided by the environment or default to 5000
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});
