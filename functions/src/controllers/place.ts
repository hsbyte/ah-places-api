import HTTP from "../http"

const { db } = require('./../util/admin')

exports.getPlaces = (req: any, res: any) => {
    const count = req.params.count ? parseInt(req.params.count) : 0
    const sortBy = req.params.sort ? req.params.sort : 'name'
    const orderBy = req.params.order ? req.params.order : 'asc'
    db.collection('places')
        .orderBy(sortBy, orderBy)
        .limit(count)
        .get()
        .then((snapshot: any) => {
            const promises: Array<any> = []
            snapshot.forEach((doc: any) => promises.push(doc.data()))
            res.status(HTTP.OK).json(promises)
        })
        .catch((error: any) => res.status(HTTP.InternalServerError).send(error))
}

exports.getPlace = (req: any, res: any) => {
    db.collection('places')
        .doc(req.params.id)
        .then((snapShot: any) => res.status(HTTP.OK).json(snapShot.data()))
        .catch((error: any) => res.status(HTTP.InternalServerError).json(error))
}