var express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var router = express.Router();

const url = 'mongodb://18.196.111.32:27017';
const dbName = 'admin';

/* GET home page. */
router.get('/', function(req, res, next) {
  var connected = false;
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    connected = true;
    const db = client.db(dbName);

    client.close();
    res.render('index', { title: 'TICKET BLOCKCHAIN', connected: connected });
  })
});

router.post('/newTicket', function(req, res, next) {
  // récupérer nameTicket et priceTicket
  console.log(req.body.nameTicket);
  console.log(req.body.priceTicket);
  // ajouter à la base de données
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    const insertDocuments = function(db, callback) {
      // Get the documents collection
      const collection = db.collection('tickets');
      var obj = {};
      obj.price = req.body.priceTicket;
      obj.name = req.body.nameTicket;
      console.log(obj)
      // Insert some documents
      collection.insertMany([
        obj
      ], function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.ops.length);
        console.log("Inserted 1 ticket into the collection");
      });
    }
  })
});

module.exports = router;
