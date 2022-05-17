const { MongoClient } = require('mongodb');

const URI = 'mongodb+srv://dbaula:deploy@deploytest.c6uqu.mongodb.net/?retryWrites=true&w=majority';

let db = null;
let conn = null;

const connection = async () => {
    if (db) return db;
    try {
        conn = await MongoClient.connect(URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        db = conn.db('DesenvSistI');
        return db;
    } catch (error) {
        console.log(error.message);
        process.exit(0);
    }
};

const close = () => {
    if (conn) {
        conn.close();
        db = null;
        conn = null;
    }
};

module.exports = {
    connection,
    close,
};