import HTTP from "../http"

const { db } = require('./../util/admin')

exports.getDestinations = (req: any, res: any) => {
    const count = req.params.count ? parseInt(req.params.count) : 0
    const sortBy = req.params.sort ? req.params.sort : 'country'
    const orderBy = req.params.order ? req.params.order : 'asc'
    db.collection('destinations')
        .orderBy(sortBy, orderBy)
        .limit(count)
        .get()
        .then((snapshot: any) => {
            const promises: Array<any> = []
            snapshot.forEach((doc: any) => promises.push(doc.data()))
            return res.status(HTTP.OK).json(promises)
        })
        .catch((error: any) => res.status(HTTP.InternalServerError).send(error))
}

exports.getDestination = (req: any, res: any) => {
    db.collection('destinations')
        .doc(req.params.id)
        .then((snapShot: any) => res.status(HTTP.OK).json(snapShot.data()))
        .catch((error: any) => res.status(HTTP.InternalServerError))
}

// export const onDestinationsUpdate = functions.firestore.document("destinations").onUpdate(change => {
//     const after = change.after.data()
//     const payload: any = {
//         ...after
//     }
//     return admin.messaging().sendToTopic("destinations", payload)
// })
