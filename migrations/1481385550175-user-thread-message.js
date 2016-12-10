'use strict'

var config = require('../dist/config/config');

var DynamoDb = require('./DynamoDb');
var db = new DynamoDb();
var fs = require('fs');
var data = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf8'));

exports.up = function(next) {

  let i = 0;
  data.forEach(t => {
    // create table
    db.create(t, (err, data1) => {
      if(err == null)
      {
          // add some data
          db.addItems(t, (err, data2) => {
            i++;
            if(i == data.length) {
              next();
            }
          });
          
      }
    });
  });
};

exports.down = function(next) {
  let i = 0;
  data.forEach(t => {
    // delete table
    db.delete(t.name, function(err, data1) {
      i++;
      if(i === data.length)
        next();
    });
  });
};
