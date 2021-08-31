// Conectando mongo
const {
    MongoClient
} = require('mongodb');

const clientMongo = new MongoClient(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, {
    useUnifiedTopology: true
});

clientMongo.connect().then(() => {
    console.log("Mongodb conectado!")
}).catch((err) => {
    console.log('Err')
});

module.exports = {
    clientMongo
}