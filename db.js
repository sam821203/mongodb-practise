const { MongoClient } = require("mongodb");

let dbConnection;

module.exports = {
  connectToDB: (callback) => {
    // MongoClient 用來連線到 mongoDb
    MongoClient.connect("mongodb://localhost:27017/bookstore")
      .then((client) => {
        dbConnection = client.db();
        return callback();
      })
      .catch((err) => {
        console.log(err);
        return callback(err);
      });
  },
  getDB: () => dbConnection,
};
