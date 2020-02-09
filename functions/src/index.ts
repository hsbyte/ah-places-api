import VERS from './util/version'

const { getDestinations, getDestination } = require('./controllers/destination')
const { getPlaces, getPlace } = require('./controllers/place')
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

app.get(`/${VERS}/destinations/:count?/:sort?/:order?`, getDestinations)
app.get(`/${VERS}/destination/:id`, getDestination)
app.get(`/${VERS}/places/:count?/:sort?/:order?`, getPlaces)
app.get(`/${VERS}/place/:id`, getPlace)

app.post(`/signup`, signUp)
app.get('/signin/:uid', signIn)

// https://baseurl.com/api/
// exports.api = region('us-central1').functions.https.onRequest(app)
exports.api = functions.https.onRequest(app)


