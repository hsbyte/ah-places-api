enum HTTP {
    // Successful responses
    OK = 200,
    Created = 201,
    // Client error responses
    Unauthorized = 401,
    // Server error responses
    InternalServerError = 500,
}

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as cors from 'cors'
import * as dotenv from "dotenv"

dotenv.config()
const app = express()

app.use(cors(
    {
        credentials: true,
    }
))

// admin.initializeApp()
// const db = admin.firestore(functions.config().firebase)
const serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore()

const VERS = process.env.API_VERSION

app.get(`/${VERS}/destinations`, (req, res) => {
    db.collection('destinations')
        .get()
        .then(snapshot => {
            const promises: Array<any> = []
            snapshot.forEach(doc => promises.push(doc.data()))
            res.status(HTTP.OK).json(promises)
        })
        .catch(error => res.status(HTTP.InternalServerError).send(error))
})

// Sign up
app.post(`/signup`, (req, res) => {
    admin.auth()
        .createUser({ ...req.body })
        .then(userRecord => res.status(HTTP.Created).json({
            status: 'success',
            ...userRecord
        }))
        .catch(error => res.status(HTTP.Unauthorized).send(error))
})

// Sign in
app.get('/signin/:id', (req, res) => {
    console.log(req.params.id)

})

// https://baseurl.com/api/
exports.api = functions.https.onRequest(app)


// export const onDestinationsUpdate = functions.firestore.document("destinations").onUpdate(change => {
//     const after = change.after.data()
//     const payload: any = {
//         ...after
//     }
//     return admin.messaging().sendToTopic("destinations", payload)
// })


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
