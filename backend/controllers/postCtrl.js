"use strict"

const Post = require('../models/userModel')
const fs = require('fs')

// ---- Début CRUD  ----

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.sauce)
    delete postObject._id
    const post = new Post({
      // On récupère l'objet via le spread et on remplace l'image url en écrasant l'ancien fichier
      ...postObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    post.save()
      .then(() => res.status(201).json({ message: 'Post créé !'}))
      .catch(error => res.status(400).json({ error }))
  }
  
  // Récupération de l'id de l'objet grâce à "findOne()" pour trouver le "Post" ayant le même "_id" que le paramètre de la requête
  exports.getOnePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
    .then((post) => {res.status(200).json(post)})
    .catch((error) => {res.status(404).json({error: error})})
  }
  
  // Mise à jour du "Post" (premier argument) grâce à "updateOne()" qui permet de modifier nos objets et de les mettre à jour
  exports.modifyPost = (req, res, next) => {
    const postObject = req.file 
      ? //permet de vérifier si la requête contient une nouvelle image si req.file = true
      {
        ...JSON.parse(req.body.post), //S'il y a une nouvelle image, on parse avec ...JSON.parse
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } 
      : { ...req.body } // si false -> req.body
  
    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id }) // updateOne récupère l'id dans la base de données
      .then(() => res.status(200).json({ message: 'Post modifié !'}))
      .catch(error => res.status(400).json({ error }))
  }
   
  // On passe un objet à "deleteOne()" correspondant au document à supprimer
  exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
      .then(post => {
        // On extrait le nom du fichier à supprimer
        const filename = post.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Post supprimé !'}))
            .catch(error => res.status(400).json({ error }))
        })
      })
      .catch(error => res.status(500).json({ error }))
  }
  
  exports.getAllPosts = (req, res, next) => {
    Post.find()
    .then((post) => {res.status(200).json(post)})
    .catch((error) => {res.status(400).json({error: error})})
  }
  
  exports.likePost = (req, res, next) => {
      
    const Post = req.body.like
    const userId = req.body.userId
  
    if (like === 1 ) {
        // $inc permet de rajouter une valeur à une donnée numérique
        Post.updateOne({_id: req.params.id}, {$inc: {likes: 1}, $push: {usersLiked: userId}}) 
            .then(() => res.status(200).json({message: 'Vous aimez ce post !'}))
            .catch(error => res.status(400).json({ error }))
    } else if (like === -1) {
        // $push permet de rajouter un nouvel élément à un tableau
        Post.updateOne({_id: req.params.id}, {$inc: {dislikes: 1}, $push: {usersDisliked: userId}} )
            .then(() => res.status(200).json({message: "Vous n'aimez pas ce post !"}))
            .catch(error => res.status(400).json({ error }))
    } else if (like === 0) {
        Post.findOne({_id: req.params.id})
            .then((post) => {
                if (post.usersLiked.includes(userId)) {
                    // $pull permet de supprimer un élément
                    Post.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: userId}})
                     .then(() => res.status(200).json({message: "Vous n'aimez plus ce post !"}))
                     .catch(error => res.status(500).json({ error }))
                } if (post.usersDisliked.includes(userId)) {
                    Post.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: userId}})
                     .then(() => res.status(200).json({message: "Vous aimez de nouveau ce post !"}))
                     .catch(error => res.status(500).json({ error }))
                }
            })
            .catch(error => res.status(500).json({ error }))
        }else {
          // Si le likescore n'est pas égal à 1/-1/0, l'app refuse la req
          return 'Erreur dans la gestion des likes'
        }
  }

// ---- FIN CRUD (Create, Read, Update, Delete) ----