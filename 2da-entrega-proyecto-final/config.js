require('dotenv').config();

export default {
    fileSystem: {
      path: "./db"
    },

    mongodb: {
      cnxStr: "mongodb+srv://cpax:lpPbv8sf78PHOzbi@cluster0.2qm6piw.mongodb.net/myFirstDatabase?appName=mongosh+1.6.0",
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 5000,
      },
    },

    firebase: {
        "type": "service_account",
        "project_id": "proyecto-final-748fc",
        "private_key_id": "17c4e6b276139d77e4d15985b041e7639ed8627c",
        "private_key": PRIVATEKEY,
        "client_email": "firebase-adminsdk-tvayy@proyecto-final-748fc.iam.gserviceaccount.com",
        "client_id": "116453792153732566892",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tvayy%40proyecto-final-748fc.iam.gserviceaccount.com"
      },
  };