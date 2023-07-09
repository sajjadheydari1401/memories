const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// const postRoutes = require("./routes/posts");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// app.use("/posts", postRoutes);

app.listen(6000, () => {
  console.log("Server connected. Listening on port 6000");
});
