const express = require("express");
const cors = require("cors");

const app = express();

const { createMessage } = require("./controller.js");

app.use(express.json());
app.use(cors());

//Endpoint from index.js file
app.post("/api/messages", createMessage);

app.listen(4004, () => {
  console.log("You are running on 4004");
});
