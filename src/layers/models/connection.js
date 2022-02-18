const mongodb = require('mongodb').MongoClient;

const DB_NAME = 'inventory';
const MONGO_DB_URL = `mongodb://localhost:27017/${DB_NAME}`
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const connection = () => mongodb
  .connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;
