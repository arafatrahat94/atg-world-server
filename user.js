const express = require("express");
const { atgworld } = require("./mongodb");

const userCollection = atgworld.collection("users");

const user = express.Router();

user.get("/User", async (req, res) => {
  const query = await userCollection.find({}).toArray();
  res.send(query);
});

user.post("/User", async (req, res) => {
  const body = await req.body;
  const query = { email: body.email };
  const find = await userCollection.findOne(query);
  if (find) {
    return res.send({ message: "user already exist" });
  }
  const result = await userCollection.insertOne(body);
  res.send(result);
});

module.exports = user;
