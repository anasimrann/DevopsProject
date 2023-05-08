const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");

const routes = require("./routes.js");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
const PORT = 8000;


const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
  
  module.exports = { app, server };

