const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 08000;

app.use(bodyParser.json());

const {
  handleGetUser,
  handleGetGroceries,
  handleGetFavorites,
  handleDeleteGroceries,
} = require("./handlers");

app.post("/user", handleGetUser);

app.post("/addgroceries", handleGetGroceries);
app.post("/addfavorites", handleGetFavorites);

app.delete("/deletegroceries", handleDeleteGroceries);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
