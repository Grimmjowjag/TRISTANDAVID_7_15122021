"use strict"

const Post = require('../models/postModel')
const fs = require('fs')
const { title } = require('process')

exports.createPost = (req, res, next) => {
  console.log("Tentative de création de post")
    Post.create({
      title: req.body.title,
      user_id: req.body.user_id,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0
     })
      .then(() => res.status(201).json({ message: 'Post créé !'}))
      .catch(error => res.status(400).json({ error }))
  }
  
  // Récupération de l'id de l'objet grâce à "find()" pour trouver le "Post" ayant le même "_id" que le paramètre de la requête
  exports.getOnePost = (req, res, next) => {
    Post.find({ where: { _id: req.params.id } }) // < !! ---- switch updateOne---- !! >
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
    Post.findAll({ where: { post: req.body.post } })
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
    } else {
          // Si le likescore n'est pas égal à 1/-1, l'app refuse la req
          return 'Erreur dans la gestion des likes'
        }
  }
