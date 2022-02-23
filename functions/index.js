const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express')
const cors = require("cors");
const app = express()
app.use(cors({ origin: true }));

const serviceAccount = require("../cert.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})
app.get('/hello-world', (req, res) => {
    res.status(200).json({msg: 'Hello world.'})
});
app.use(require("./routes"));

exports.app = functions.https.onRequest(app);