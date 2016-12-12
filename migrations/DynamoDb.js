var BaseDb = require('./BaseDb');

var config = require('../dist/config/config').config;
var AWS = require("aws-sdk");
AWS.config.update(config.database);

var dynamoDB = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var fs = require('fs');

var bcrypt = require('bcrypt-nodejs');


class DynamoDb extends BaseDb {
	
	create(table, callback)
	{
		console.log("Creating " + table.name + " ...");

		var params = table.structure;
	    params.TableName = config.prefix_table + capitalizeFirstLetter(table.name);

	    dynamoDB.createTable(params, (err, data) => {
	        if (err) {
	            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
	        } else {
	            console.log("Created table " + table.name);
	        }
	        callback(err, data);
	    });
	}

	delete(table_name, callback)
	{
		console.log("Deleting " + table_name + " ...");

	    var params = {
	        TableName : config.prefix_table + capitalizeFirstLetter(table_name)
	    };

	    dynamoDB.deleteTable(params, (err, data) => {
	        if (err) {
	            console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
	        } else {
	            console.log("Deleted table " + table_name);
	        }
	        callback(err, data);
	    });

	}

	addItems(table, callback)
	{
		console.log("Adding data " + table.name + " ...");
        table.data.forEach(function(item) {
            item.created_at = new Date().getTime();
			if(item.password !== undefined) {
				item.password = bcrypt.hashSync(item.password);
			}
            var params = {
                TableName: config.prefix_table + capitalizeFirstLetter(table.name),
                Item: item
            };

            docClient.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to add data", JSON.stringify(item), ". Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("PutItem succeeded:", JSON.stringify(item));
                }
				callback(err, data);
            });
        });
	}
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = DynamoDb;