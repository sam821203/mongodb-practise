const express = require("express");
const { connectToDB, getDB } = require("./db");
const { ObjectId } = require("mongodb");

// init app & middleware
const app = express();
app.use(express.json());

// db connection
let db;

connectToDB((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("app listening on port 3000");
    });

    db = getDB();
  }
});

// routes
app.get("/books", (req, res) => {
  // current page
  const page = req.query.page || 0;
  const booksPerPage = 3;

  let books = [];

  db.collection("books")
    .find()
    .sort({ author: 1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents!" });
    });
});

app.get("/books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch the documents!" });
      });
  } else {
    res.status(500).json({ error: "Not a valid document id" });
  }
});

app.post("/books", async (req, res) => {
  const book = req.body;

  // 存在資料庫裡
  try {
    const result = await db.collection("books").insertOne(book);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: "Could not post new object." });
  }
});

app.delete("/books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not delete the documents!" });
      });
  } else {
    res.status(500).json({ error: "Not a valid document id" });
  }
});

app.patch("/books/:id", (req, res) => {
  const updates = req.body;

  if (ObjectId.isValid(req.params.id)) {
    // $set 是需要修改的物件資料
    db.collection("books")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not delete the documents!" });
      });
  } else {
    res.status(500).json({ error: "Not a valid document id" });
  }
});
