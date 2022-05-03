"use strict"

const { Comment } = require('../models/')

exports.createComment = (req, res, next) => {
  Comment.create({
    description: req.body.description,
    userId: req.body.userId,
    postId: req.body.postId
  })
    .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
    .catch(error => res.status(400).json({ error }))
}

exports.getAllComments = (req, res, next) => {
  Comment.findAll()
    .then((comment) => { res.status(200).json(comment) })
    .catch((error) => { res.status(400).json({ error: error }) })
}

exports.deleteComment = (req, res, next) => {
  Comment.findOne({ id: req.params.commentId })
    .then(Comment => {
      if (req.userAuth.id == req.params.id || req.userAuth.isAdmin) {
        Comment.destroy({ where: { id: req.params.commentId } })
          .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
          .catch(error => res.status(400).json({ error }))
      } else return res.status(401).json({ error: 'Action non autorisée !' })
    })
    .catch(error => res.status(500).json({ error }))
}
