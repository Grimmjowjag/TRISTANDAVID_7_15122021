"use strict"

const { Post } = require('../models')
const fs = require('fs')

exports.createPost = (req, res, next) => {
  console.log(req.body, req.userAuth)
  Post.create({
    title: req.body.title,
    description: req.body.description,
    userId: req.userAuth.id,
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

exports.getAllPost = (req, res, next) => {
  Post.findAll()
    .then((post) => { res.status(200).json(post) })
    .catch((error) => { res.status(400).json({ error: error }) })
}

exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      if (req.userAuth.id == req.params.id || req.userAuth.isAdmin) {
        // On extrait le nom du fichier à supprimer
        const filename = post.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          Post.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Post supprimé !' }))
            .catch(error => res.status(400).json({ error }))
        })
      } else return res.status(401).json({ error: 'Action non autorisée !' })
    })
    .catch(error => res.status(500).json({ error: JSON.stringify(error) }))
}