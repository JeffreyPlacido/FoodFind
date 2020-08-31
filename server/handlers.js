const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

console.log(MONGO_URI);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleUserGroceries = async (req, res) => {
  const email = req.body.email;

  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("foodfind");

    const r = await db.collection("groceries").find({ email }).toArray();

    client.close();

    res.status(200).json({ data: r });
  } catch ({ message }) {
    res.status(500).json({ status: 500, message });
  }
};

const handleUserFavorites = async (req, res) => {
  const email = req.body.email;

  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("foodfind");

    const r = await db.collection("favorites").find({ email }).toArray();

    client.close();

    res.status(200).json({ data: r });
  } catch ({ message }) {
    res.status(500).json({ status: 500, message });
  }
};

async function handleGetUser(req, res) {
  console.log(req.body);
  const email = req.body.email;
  const client = await MongoClient(MONGO_URI, { useUnifiedTopology: true });

  await client.connect();

  const db = client.db("foodfind");

  db.collection("users").findOne({ email }, (err, result) => {
    if (result) {
      res.status(200).json({ status: 200, email, data: result });
    } else {
      try {
        const db = client.db("foodfind");
        db.collection("users").insertOne(req.body, { unique: true });

        res.status(201).json({ status: 201, data: req.body });
      } catch (err) {
        res
          .status(500)
          .json({ status: 500, data: req.body, message: err.message });
      }
    }
  });
}

async function handleGetFavorites(req, res) {
  const ordernumber = req.body.ordernumber;
  const client = await MongoClient(MONGO_URI, { useUnifiedTopology: true });

  await client.connect();

  const db = client.db("foodfind");

  db.collection("favorites").findOne({ ordernumber }, (err, result) => {
    if (result) {
      res.status(200).json({ status: 200, ordernumber, data: result });
    } else {
      try {
        const db = client.db("foodfind");
        db.collection("favorites").insertOne(req.body, { unique: true });

        res.status(201).json({ status: 201, data: req.body });
      } catch (err) {
        res
          .status(500)
          .json({ status: 500, data: req.body, message: err.message });
      }
    }
  });
}

async function handleGetGroceries(req, res) {
  console.log(req.body);
  try {
    const client = await MongoClient(MONGO_URI, { useUnifiedTopology: true });

    await client.connect();

    const db = client.db("foodfind");

    const addUser = await db.collection("groceries").insertOne(req.body);

    assert.equal(1, addUser.insertedCount);

    client.close();

    res.status(201).json({ status: 201, data: req.body });
  } catch ({ message }) {
    res.status(500).json({ status: 500, message });
  }
}

const handleDeleteGroceries = async (req, res) => {
  console.log("in");
  console.log(req.body, "BODYBODYBODY");

  const id = req.body._id;
  const client = await MongoClient(MONGO_URI, { useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db("foodfind");
    const favorites = await db
      .collection("groceries")
      .deleteOne({ ordernumber: req.body.ordernumber });

    assert.equal(1, favorites.deletedCount);

    res.status(204).json({ status: 204, data: id });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

const handleDeleteFavorite = async (req, res) => {
  const id = req.body._id;
  const client = await MongoClient(MONGO_URI, { useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db("foodfind");
    const favorites = await db.collection("favorites").deleteOne(req.body);

    assert.equal(1, favorites.deletedCount);

    res.status(204).json({ status: 204, data: id });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

module.exports = {
  handleGetUser,
  handleGetGroceries,
  handleGetFavorites,
  handleDeleteGroceries,
  handleUserGroceries,
  handleUserFavorites,
  handleDeleteFavorite,
};
