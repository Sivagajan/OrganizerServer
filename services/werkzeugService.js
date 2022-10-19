import { ObjectId } from "mongodb"
import { getDb } from "../util/db.js"

export const getAll = () => {
    return new Promise((resolve, reject) => {

        getDb()
            .then(db => db.collection('Werkzeug').find().toArray())
            .then(result => resolve(result))
            .catch(err => reject(err))
    })
}

export const addTool = (req, res) => {
    const tool = {
        Werkzeug: req.body.tool,
        Raum: req.body.room,
        Kiste: req.body.box,
        verliehen_an: req.body.lentTo,
        verliehen_am: req.body.letOn,
        verliehen: req.body.lent
    }

    getDb()
        .then(db => db.collection('Werkzeug').insertOne(tool))
        .then(dbRes => {
            console.log(dbRes)
            res.status(200).send('insert erfolgreich')
        })
        .catch(err => {
            console.log(err)
            res.status(500).send('scheiße')
        })
}

export const changeState = (_id, state) => {
    return new Promise((resolve,reject) => {
        getDb()
            .then(db => db.collection('Werkzeug').updateOne({ _id: new ObjectId(_id) }, {$set: {'verliehen': state}}))
            .then(result => resolve(result))
            .catch(err => reject(err))
    })
}