import VERS from './util/version'

const { getAllDestinations, getAllPlaces } = require('./controllers/destination')
const { signUp, signIn } = require('./controllers/user')

import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors'

const app = express()

app.use(cors(
    {
        credentials: true,
    }
))

app.get(`/${VERS}/destinations`, getAllDestinations)
app.get(`/${VERS}/top_destinations/:count`)
app.get(`/${VERS}/places`, getAllPlaces)

app.post(`/signup`, signUp)
app.get('/signin/:uid', signIn)

// https://baseurl.com/api/
// exports.api = region('us-central1').functions.https.onRequest(app)
exports.api = functions.https.onRequest(app)


