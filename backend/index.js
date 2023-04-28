const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const redis = require("redis");
const client = redis.createClient();

dotenv.config();

const app = express();

// Create a Redis client
client.on("connect", () => {
  console.log("Connected to Redis");
});
// Check if there is any error connecting to Redis
client.on("error", (err) => {
  console.error(err);
});

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API

// setting user
app.post("/user", (req, res) => {
  const { username } = req.body;
  const gameWon = 0;
  const value = {
    user: username,
    gameWon: gameWon,
  };
  // Check if the request body contains the username property
  if (!username) {
    return res.status(400).send("Username is required");
  }
  // Store the username in Redis
  client.set("users", JSON.stringify(value), (err, reply) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error creating user");
    }
    console.log(`User ${username} created`);
    res.send("User created");
  });
});

// updating the score
app.post("/update-score", (req, res) => {
  const { username, score } = req.body;
  const value = {
    user: username,
    gameWon: score,
  };

  // Check if the request body contains the username and score properties
  if (!username || !score) {
    return res.status(400).send("Username and score are required");
  }

  // Update the user's score in Redis
  client.set("users", JSON.stringify(value), (err, reply) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error updating score");
    }
    console.log(`Score for user ${username} updated to ${score}`);
    res.send(`Score updated for user ${username}`);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
