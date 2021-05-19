'use strict'

const user = "manu";
const pass = "manu";
const dbname = "inventario";
const uri = `mongodb+srv://${user}:${pass}@manucluster.c1h7e.mongodb.net/${dbname}?retryWrites=true&w=majority`;

module.exports = {
    uri,
    port: process.env.PORT || 3001,
    db: process.env.MONGO_DB || uri,
    SECRET_TOKEN: 'miclavedetokens'
}