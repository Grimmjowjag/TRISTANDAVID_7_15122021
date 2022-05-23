const { relativeTimeRounding } = require('moment')
const { Reaction } = require('../models')

exports.createreaction = (req, res, next) => {
    Reaction.findOne({ where: { userId: req.userAuth.id, postId: req.body.postId } })
        .then((reaction) => {
            if (reaction) {
                return res.status(401).json({ error: 'Impossible de poster à nouveau une reaction' })
            }
            Reaction.create({
                userId: req.userAuth.id,
                postId: req.body.postId,
            })
                .then(() => res.status(201).json({ message: 'Vous aimez ce post !' }))
                .catch((error) => { res.status(500).json({ error: error }) })
        })
        .catch((error) => { res.status(500).json({ error: error }) })
}

exports.ReactionPost = (req, res, next) => {
    const postId = parseInt(req.params.postId)
    if (postId <= 0) {
        return res.status(500).json({ error: error })
    }
}

exports.getPostreaction = (req, res, next) => {
    Reaction.findAll({ where: { postId: req.params.id } })
        .then((reaction) => { res.status(200).json(reaction) })
        .catch((error) => { res.status(500).json({ error: error }) })
}

exports.deletereaction = (req, res, next) => {
    Reaction.findOne({ where: { postId: req.params.id, userId: req.userAuth.id } })
        .then(reaction => {
            reaction.destroy()
                .then(() => {
                    if (!reaction) {
                        return res.status(400).json({ error: 'Impossible de supprimer la reaction' })
                    }
                    res.status(200).json({ message: 'Reaction supprimée !' })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ message: `${error}` }))
}

