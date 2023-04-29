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
// ###############################################
// Login user
// ###############################################
app.post("/login", (req, res) => {
  const username = req.body.username;
  if (username) {
    client.get(username, (err, reply) => {
      if (err) console.log(err);
      console.log(reply);
      if (reply != null) {
        console.log("User already Created");
        const value = JSON.parse(reply);
        res.json({
          status: true,
          value,
        });
      } else {
        console.log("Creating new User");
        client.set(username, JSON.stringify({ user: username, gameWon: 0 }));
        res.json({
          status: true,
          value: {
            user: username,
            gameWon: 0,
          },
        });
      }
    });
  } else {
    return res.status(400).send("Username is required");
  }
});

// ###############################################
// updating the score
// ###############################################
app.post("/update-score", async (req, res) => {
  const { username, Score } = req.body;

  // Check if the request body contains the username and score properties
  if (!username || !Score) {
    return res.status(400).send("Username and score are required");
  }
  const value = {
    user: username,
    gameWon: Score,
  };
  // Update the user's score in Redis
  client.set(value.user, JSON.stringify(value), (err, reply) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error updating score");
    }
    console.log(`Score for user ${username} updated to ${Score}`);
    return res.json({ status: true, value });
  });
});

// ###############################################
// get all users
// ###############################################
app.get("/keys", (req, res) => {
  client.keys("*", (err, keys) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      client.mget(keys, (err, values) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          const data = {};
          const users = [];
          keys.forEach((key, index) => {
            const user = JSON.parse(values[index]);
            users.push(user);
          });
          users.sort((a, b) => b.gameWon - a.gameWon);
          users.forEach((user) => {
            data[user.user] = user;
          });
          res.json(data);
        }
      });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
