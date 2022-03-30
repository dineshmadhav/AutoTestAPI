const {getDatabase} = require('./mongo');
const {objectID} = require('mongodb');

const collectionName = 'autonomy';

async function insertNewToken(auto) {
    const database = await getDatabase();
    const {insertedId} = await database.collection(collectionName).insertOne(auto);
    return insertedId;
}

async function getNewToken() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

async function deleteToken(id){
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
        _id: new objectID(id)
    });
}

async function updateToken(id, ad) {
    const database = await getDatabase();
    delete ad._id;
    await database.collection(collectionName).update(
        {_id: new objectID(id)},
        {$set: {...ad,}}
        );
}

module.exports = {insertNewToken, getNewToken, deleteToken, updateToken};