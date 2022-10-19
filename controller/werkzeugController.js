import { changeState, getAll } from "../services/werkzeugService.js"

export const getAllTools = (req, res) => {
    getAll()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({error: err}))
}

export const changeToolState = (req, res) =>{
    const state = req.body.state
    const _id = req.body._id

    changeState(_id, state)
        .then(result => {
            if(result.acknowledged) {
                getAll()
                .then(allTools => res.status(200).json(allTools))
                // noch nicht fertig
            }
        })
        .catch(err => res.status(500).json({error: err}))
} 