import HTTP from "../http"

const { db } = require('./../util/admin')

exports.getAllDestinations = (req: any, res: any) => {
    db.collection('destinations')
        .orderBy('country', 'desc')
        .get()
        .then((snapshot: any) => {
            const promises: Array<any> = []
            snapshot.forEach((doc: any) => promises.push(doc.data()))
            return res.status(HTTP.OK).json(promises)
        })
        .catch((error: any) => res.status(HTTP.InternalServerError).send(error))
}

exports.getTopDestinations = (req: any, res: any) => {
    db.collection('destinations')
        .orderBy('country')
        .limit(req.params.count)
        .get()
        .then((snapshot: any) => {
            const promises: Array<any> = []
            snapshot.forEach((doc: any) => promises.push(doc.data()))
            return res.status(HTTP.OK).json(promises)
        })
        .catch((error: any) => res.status(HTTP.InternalServerError).send(error))
}

exports.getAllPlaces = (req: any, res: any) => {
    db.collection('places')
        .orderBy('city', 'desc')
        .get()
        .then((snapshot: any) => {
            const promises: Array<any> = []
            snapshot.forEach((doc: any) => promises.push(doc.data()))
            res.status(HTTP.OK).json(promises)
        })
        .catch((error: any) => res.status(HTTP.InternalServerError).send(error))
}

// export const onDestinationsUpdate = functions.firestore.document("destinations").onUpdate(change => {
//     const after = change.after.data()
//     const payload: any = {
//         ...after
//     }
//     return admin.messaging().sendToTopic("destinations", payload)
// })