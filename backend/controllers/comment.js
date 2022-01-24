const Comment = require('../models/commentModel')

exports.createComment = (req, res, next) => {
    Comment.create({
        // add 
    })
    .then(() => res.status(201).json({ message: 'Commentaire créé !'}))
    .catch(error => res.status(400).json({ error }))
}

exports.getAllComments = (req, res, next) => {
    Comment.findAll({ where: { comment: req.body.comment } })
    .then((comment) => {res.status(200).json(comment)})
    .catch((error) => {res.status(400).json({error: error})})
}