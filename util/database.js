const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callBack) => {
    MongoClient
    .connect('mongodb+srv://Muhammad:WuRr5nIhlPGHii8B@cluster0-hebyh.mongodb.net/test?retryWrites=true&w=majority')
    .then(client => {
        console.log("Connected...");
        _db = client.db();
        callBack();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
}

const getDb = () => {
    if(_db) {
        return _db;
    }

    throw "No Database Found!";
}

module.exports = { mongoConnect, getDb };