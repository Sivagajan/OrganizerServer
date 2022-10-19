import { MongoClient } from "mongodb"
import '../config.js'

const URL = process.env.MONGODB_URL
const DB_NAME = process.env.DB_NAME

const client = new MongoClient(URL)

let db

export const getDb = () => {
    return new Promise ((resolved, reject) => {
        if(db)
            resolved(db)

        client.connect()
            .then(client =>{
                return client.db(DB_NAME)
            })
            .then(DBClient => {
                db = DBClient
                resolved(DBClient)
            })
            .catch(err => reject(err))
    })
}