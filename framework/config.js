// Conection MongoDB
const connection = require('./database/index')


//Conection Firebase

const admin = require("firebase-admin");

const serviceAccount = require("./database/firebase.json");

const dbFirebase = () => { admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  
});}
module.exports= {
    connection,
    dbFirebase
}
