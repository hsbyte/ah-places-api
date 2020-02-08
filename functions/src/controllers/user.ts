import admin = require("firebase-admin")
import HTTP from "../http"

exports.signUp = (req: any, res: any) => {
    admin.auth()
        .createUser({ ...req.body })
        .then((userRecord: any) => res.status(HTTP.Created).json({
            status: 'success',
            ...userRecord
        }))
        .catch((error: any) => res.status(HTTP.Unauthorized).send(error))
}

exports.signIn = (req: any, res: any) => {
    res.status(HTTP.OK).json({
        message: `Hello ${req.params.uid}`,
        ...req.params
    })
}