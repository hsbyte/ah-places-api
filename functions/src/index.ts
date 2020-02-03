import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as dotenv from "dotenv"

dotenv.config()
const app = express()
// const cors = require('cors')

// admin.initializeApp()
// const db = admin.firestore(functions.config().firebase)
const serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore()

const VERS = process.env.API_VERSION

app.get(`/${VERS}/destinations`, (req: any, res: any) => {
    db.collection('destinations').get()
        .then(snapshot => {
            const promises: any = []
            snapshot.forEach(doc => promises.push(doc.data()))
            res.json(promises)
        })
        .catch(error => res.status(500).send(error))
})


// https://baseurl.com/api/
exports.api = functions.https.onRequest(app)









// export const onDestinationsUpdate = functions.firestore.document("destinations").onUpdate(change => {
//     const after = change.after.data()
//     const payload: any = {
//         destinations: after
//     }
//     return admin.messaging().sendToTopic("destinations", payload)
// })

// export const destinations = functions.https.onRequest((req, res) => {
//     db.collection('destinations').get()
//     .then(snapshot => {
//         const promises: any = []
//         snapshot.forEach(doc => promises.push(doc.data()))
//         res.send(promises)
//     })
//     .catch(error => res.status(500).send(error))
// })


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
