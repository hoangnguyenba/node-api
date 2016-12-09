var db = require('./dynamodb.js');
var config = require('../dist/config/config');


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

var tables = [];
if(table === "all")
{
    tables = ARR_TABLE;
}
else
{
    tables.push(table);
}

tables.forEach((t) => {

    if(type == "init")
    {
        // create table
        createTable(t, function (err, data) {
            if(err == null)
            {
                sampleTable(t, function (err, data) {
                });
            }
        });
    }
    else if(type == "reset")
    {
        // create table
        deleteTable(t, function (err, data) {
            // create table
            createTable(t, function (err, data) {
                sampleTable(t, function (err, data) {
                });
            });
        });
    }
    else if(type == "create")
    {
        createTable(t, function (err, data) {
        });
    }
    else if(type == "delete")
    {
        deleteTable(t, function (err, data) {
        });
    }
    else if(type == "sample")
    {
        sampleTable(t, function (err, data) {
        });
    }
    
});

function deleteTable(table_name, callback) {

    var params = {
        TableName : config.prefix_table + capitalizeFirstLetter(table_name)
    };

    db.dynamoDB.deleteTable(params, function(err, data) {
        if (err) {
            console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
        }
        callback(err, data);
    });
}

function createTable(table_name, callback) {
    
    var params = require( "./" + table_name + '-table-create.js');
    params.TableName = config.prefix_table + capitalizeFirstLetter(table_name);

    db.dynamoDB.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
        callback(err, data);
    });
}

function sampleTable(table_name, callback) {
    var fs = require('fs');
    fs.exists( __dirname + '/' + table_name + '-data.json', function(exists) {
        if (exists) {
            console.log('Table ' + table_name + ' has data sample!!!');


            var data = JSON.parse(fs.readFileSync('./scripts/' + table_name + '-data.json', 'utf8'));
            data.forEach(function(item) {
                item.created_at = new Date().getTime();
                var params = {
                    TableName: config.prefix_table + capitalizeFirstLetter(table_name),
                    Item: item
                };

                db.docClient.put(params, function(err, data) {
                    if (err) {
                        console.error("Unable to add data", JSON.stringify(item), ". Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("PutItem succeeded:", JSON.stringify(item));
                    }
                });
            });
        } else {
            // It isn't accessible
            console.log('Table ' + table_name + ' doesn\'t have data sample!!!');
        }
    });
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}