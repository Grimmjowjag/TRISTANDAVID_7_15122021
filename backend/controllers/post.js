"use strict"

const Post = require('../models/postModel')
const fs = require('fs')

exports.createPost = (req, res, next) => {
  console.log(req.body, req.userAuth)
  Post.create({
    title: req.body.title,
    description: req.body.description,
    user_id: req.userAuth.id,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0
  })
    .then(() => res.status(201).json({ message: 'Post créé !' }))
    .catch((error) => { res.status(404).json({ error: error }) })
}

// Récupération de l'id de l'objet grâce à "find()" pour trouver le "Post" ayant le même "_id" que le paramètre de la requête
exports.getOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.postId } })
    .then((post) => { res.status(200).json(post) })
    .catch((error) => { res.status(404).json({ error: error }) })
}

exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      // On extrait le nom du fichier à supprimer
      const filename = post.imageUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        Post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: 'Post supprimé !' }))
          .catch(error => res.status(400).json({ error }))
      })
    })
    .catch(error => res.status(500).json({ error: JSON.stringify(error) }))
}