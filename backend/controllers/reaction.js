const { Reaction } = require('../models')

exports.createreaction = (req, res, next) => {
    Reaction.create({
        userId: req.userAuth.id,
        postId: req.body.postId,
    })
        .then(() => res.status(201).json({ message: 'Vous aimez ce post !' }))
        .catch((error) => { res.status(404).json({ error: error }) })
}

exports.ReactionPost = (req, res, next) => {
    const postId = parseInt(req.params.postId)
    if (postId <= 0) {
        return res.status(400).json({ error: error })
    }
}

exports.getAllreaction = (req, res, next) => {
    Reaction.findAll()
        .then((reaction) => { res.status(200).json(reaction) })
        .catch((error) => { res.status(404).json({ error: error }) })
}

exports.deletereaction = (req, res, next) => {
    Reaction.findOne({ where: { id: req.params.id } })
        .then(Reaction => {
            Reaction.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Like supprimé !' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error: JSON.stringify(error) }))
}

