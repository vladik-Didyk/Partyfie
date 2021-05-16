const { MongoClient } = require("mongodb");
 
const url = "mongodb+srv://partyfyAdmin:tI1H2cY9qHV7RbK7@parytfycluster.ete80.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
exports.client = client;
