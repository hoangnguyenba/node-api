var config = require('../dist/config/config');
var AWS = require("aws-sdk");
AWS.config.update(config.database);

exports.dynamoDB = new AWS.DynamoDB();
exports.docClient = new AWS.DynamoDB.DocumentClient();