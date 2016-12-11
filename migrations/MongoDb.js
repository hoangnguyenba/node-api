var BaseDb = require('./BaseDb');

var config = require('../dist/config/config');
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/arubaito';


class MongoDb extends BaseDb {
    create(table, callback) {
        // MongoClient.connect(url, function(err, db) {
        console.log("create ...");

        // db.close();
        // });
        callback(null, true);
    }

    delete(table_name, callback) {
        MongoClient.connect(url, function(err, db) {
            console.log("delete ...");
            // Get the documents collection
            var collection = db.collection(table_name);
            // Remove all the document
            collection.removeMany();
            db.close();
            callback(null, true);
        });
    }

    addItems(table, callback) {
        MongoClient.connect(url, function(err, db) {
            console.log("add items ...");
            // Get the documents collection
            var collection = db.collection(table.name);
            // Insert some documents
            collection.insertMany(table.data, function(err, result) {
                callback(err, result);
                db.close();
            });
        })
    }
}

module.exports = MongoDb;