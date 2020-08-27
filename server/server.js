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
  handleUserGroceries,
  handleUserFavorites,
  handleDeleteGroceries,
} = require("./handlers");

app.get("/usergroceries", handleUserGroceries);
app.get("/userfavorites", handleUserFavorites);

app.post("/user", handleGetUser);

app.post("/addgroceries", handleGetGroceries);
app.post("/addfavorites", handleGetFavorites);

app.delete("/deletegroceries", handleDeleteGroceries);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
