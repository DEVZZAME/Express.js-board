// @ts-check

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.DB_URI_LOCAL;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
