import * as admin from 'firebase-admin'

// admin.initializeApp()
// const db = admin.firestore(functions.config().firebase)
const serviceAccount = require('./../serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore()

module.exports = { admin, db }