const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

console.log(MONGO_URI);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function handleGetUser(req, res) {
  console.log(req.body);
  try {
    const client = await MongoClient(MONGO_URI, { useUnifiedTopology: true });

    await client.connect();

    const db = client.db("foodfind");

    const addUser = await db.collection("users").insertOne(req.body);

    assert.equal(1, addUser.insertedCount);

    client.close();

    res.status(201).json({ status: 201, data: req.body });
  } catch ({ message }) {
    res.status(500).json({ status: 500, message });
  }
}

async function handleGetFavorites(req, res) {
  console.log(req.body);
  try {
    const client = await MongoClient(MONGO_URI, { useUnifiedTopology: true });

    await client.connect();

    const db = client.db("foodfind");

    const addUser = await db.collection("favorites").insertOne(req.body);

    assert.equal(1, addUser.insertedCount);

    client.close();

    res.status(201).json({ status: 201, data: req.body });
  } catch ({ message }) {
    res.status(500).json({ status: 500, message });
  }
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

// async function handleGetGroceries(req, res) {
//   const ID = req.body.email;
//   const user = req.body;
//   const client = await MongoClient(MONGO_URI, { useUnifiedTopology: true });

//   try {
//     await client.connect();

//     // const grocerynumber = `${groceries}` + Math.floor(Math.random() * 10000000);

//     const db = client.db("foodfind");
//     const newValues = user.groceries;

//     if (req.body.groceries === undefined) {
//       throw new Error("Missing info");
//     }
//     console.log(req.params);

//     const r = await db.collection("users").updateOne(
//       { email: ID },
//       {
//         $set: { groceries: newValues },
//         $currentDate: { lastModified: true },
//       },
//       { upsert: true }
//     );
//     assert.equal(1, r.matchedCount);
//     assert.equal(1, r.modifiedCount);

//     res.status(200).json({ status: 200, data: { ID, r } });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ status: 500, data: { ...req.body }, message: err.message });
//   }
//   client.close();
// }

// async function handleGetFavorites(req, res) {
//   const ID = req.body.email;
//   const user = req.body;
//   const client = await MongoClient(MONGO_URI, { useUnifiedTopology: true });

//   try {
//     await client.connect();

//     const db = client.db("foodfind");
//     const newValues = user.favorites;

//     if (req.body.favorites === undefined) {
//       throw new Error("Missing info");
//     }
//     console.log(req.params);

//     const r = await db.collection("favorites").updateOne(
//       { email: ID },
//       {
//         $set: { favorites: newValues },
//         $currentDate: { lastModified: true },
//       },
//       { upsert: true }
//     );
//     assert.equal(1, r.matchedCount);
//     assert.equal(1, r.modifiedCount);

//     res.status(200).json({ status: 200, data: { ID, r } });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ status: 500, data: { ...req.body }, message: err.message });
//   }
//   client.close();
// }

const handleDeleteGroceries = async (req, res) => {
  const id = req.body._id;
  const deleteFav = req.body.favorites;
  const client = await MongoClient(MONGO_URI, { useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db("foodfind");
    const favorites = await db.collection("foodfind").deleteOne({ deleteFav });

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
};
