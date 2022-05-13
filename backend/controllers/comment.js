"use strict"

const { Comment, Post } = require('../models/')

exports.createComment = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((Post) => {
      if (!Post) {
        return res.status(404).json({ error: 'Impossible de créer un commentaire' })
      }
      Comment.create({
        description: req.body.description,
        userId: req.userAuth.id,
        postId: req.params.id
      })
        .catch(error => res.status(500).json({ error }))
        .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.getAllComments = (req, res, next) => {
  Comment.findAll()
    .catch((error) => { res.status(500).json({ error: error }) })
    .then((comment) => { res.status(200).json(comment) })
}

exports.deleteComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then(comment => {
      if (!comment) {
        return res.status(404).json({ error: 'Impossible de supprimer ce commentaire' })
      }
      if (req.userAuth.id == comment.userId || req.userAuth.isAdmin) {
        comment.destroy()
          .catch(error => res.status(500).json({ error }))
          .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
      } else return res.status(401).json({ error: 'Action non autorisée !' })
    })
    .catch(error => res.status(500).json({ error }))
}
