const express = require("express");
const app = express();
const cors = require(`cors`);
const port = process.env.PORT || 5000;

const { atgworld, connectToDatabase } = require(`./mongodb`);
const user = require(`./user`);
const post = require(`./Post`);
// middleware
app.use(cors());
app.use(express.json());

require(`dotenv`).config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(user);
app.use(post);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

module.exports = { app };
