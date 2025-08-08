require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Initialize Express
const app = express();

app.use(cors());
app.use(express.json());

const hostname = process.env.HOST;
const port = process.env.PORT;

//Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB 👅😝😜"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Application Schema
const postSchema = new mongoose.Schema({
  caption: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  res.send("Welcome to labphase server!");
});

// Get all applications (for admin view)
app.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});
app.post('/posts', async(req, res) => {
  const { caption, imageUrl } = req.body;
  const newPost = new Post ({ caption, imageUrl });
  await newPost.save();
  res.status(201).json(newPost);
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log("Press Ctrl+C to stop the server.");
  console.log("Press Ctrl+R to restart the server.");
  console.log("Waiting for requests...");
});
