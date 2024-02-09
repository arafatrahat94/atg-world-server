const express = require("express");
const { atgworld } = require("./mongodb");

const postCollection = atgworld.collection("posts");

const post = express.Router();

post.post("/Post", async (req, res) => {
  const body = await req.body;
  const result = await postCollection.insertOne(body);
  res.send(result);
});
post.get("/Post", async (req, res) => {
  const result = await postCollection.find({}).toArray();
  res.send(result);
});

module.exports = post;
