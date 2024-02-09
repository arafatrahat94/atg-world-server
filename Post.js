const express = require("express");
const { atgworld } = require("./mongodb");
const { ObjectId } = require("mongodb");

const postCollection = atgworld.collection("posts");
const commentCollection = atgworld.collection("comments");

const post = express.Router();

post.post("/Post", async (req, res) => {
  const body = await req.body;
  const result = await postCollection.insertOne(body);
  res.send(result);
});
post.get("/Post", async (req, res) => {
  const result = await postCollection.find({}).sort({ _id: -1 }).toArray();
  res.send(result);
});

post.patch("/Post/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const body = await req.body;
  console.log(body);
  const find = await postCollection.findOne(query);
  if (body.like === "like") {
    if (!find.like) {
      const result = await postCollection.updateOne(
        query,
        {
          $set: {
            like: 1,
          },
        },
        { upsert: true }
      );
      res.send(result);
    }
    if (find.like >= 1) {
      const result = await postCollection.updateOne(
        query,
        {
          $set: {
            like: find.like + 1,
          },
        },
        { upsert: true }
      );
      res.send(result);
    }
  }
  if (body.like === "unlike") {
    if (!find.like) {
      const result = await postCollection.updateOne(
        query,
        {
          $set: {
            like: 0,
          },
        },
        { upsert: true }
      );
      res.send(result);
    }
    if (find.like >= 1) {
      const result = await postCollection.updateOne(
        query,
        {
          $set: {
            like: find.like - 1,
          },
        },
        { upsert: true }
      );
      res.send(result);
    }
  }
});

post.post("/Comment", async (req, res) => {
  const body = await req.body;
  const result = await commentCollection.insertOne(body);
  res.send(result);
});
post.get("/Comment/:id", async (req, res) => {
  const id = req.params.id;
  const query = { postId: id };
  const result = await commentCollection
    .find(query)
    .sort({ _id: -1 })
    .toArray();

  if (result === undefined) {
    res.send([]);
  }
  res.send(result);
});
module.exports = post;
