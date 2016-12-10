var config = require('../dist/config/config');

var DynamoDb = require('./DynamoDb');
var fs = require('fs');
var data = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf8'));

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

var ARR_TABLE = ["message", "user", "thread"];

var type = "init"; // create, delete, sample, reset, init
var table = "all"; // all, Message, User

if(typeof process.argv[4] !== "undefined")
{
    type = process.argv[4];
}

if(typeof process.argv[3] !== "undefined")
{
    table = process.argv[3];
}

// var tables = [];
// if(table === "all")
// {
//     tables = ARR_TABLE;
// }
// else
// {
//     tables.push(table);
// }


var db = new DynamoDb();
data.forEach((t) => {

    if(type == "init")
    {
        // create table
        db.create(t, function (err, data) {
            if(err == null)
            {
                // db.addItems(t, function (err, data) {
                // });
            }
        });
    }
    else if(type == "reset")
    {
        // create table
        db.delete(t.name, function (err, data) {
            // create table
            db.create(t, function (err, data) {
                db.addItems(t, function (err, data) {
                });
            });
        });
    }
    else if(type == "create")
    {
        db.create(t, function (err, data) {
        });
    }
    else if(type == "delete")
    {
        db.delete(t.name, function (err, data) {
        });
    }
    else if(type == "sample")
    {
        db.addItems(t, function (err, data) {
        });
    }
    
});