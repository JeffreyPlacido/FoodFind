const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const {
  handleGetUser,
  handleGetGroceries,
  handleGetFavorites,
  handleDeleteGroceries,
} = require("./handlers");

app.post("/user", handleGetUser);

app.put("/addgroceries", handleGetGroceries);
app.put("/addfavorites", handleGetFavorites);

app.delete("/deletegroceries", handleDeleteGroceries);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
