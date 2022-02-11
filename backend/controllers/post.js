"use strict"

// !!!!!!!!!!!!!!!!! PENSER A LINK LES TABLES !!!!!!!!!!!!!!!!!!!!!!!!

const Post = require('../models/postModel')
const fs = require('fs')

exports.createPost = (req, res, next) => {
  console.log(req.body)
    Post.create({
      title: req.body.title,
      description: req.body.description,
      user_id: req.body.user_id,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0
     })
      .then(() => res.status(201).json({ message: 'Post créé !'}))
      .catch((error) => {res.status(404).json({error: error})})
  }
  
  // Récupération de l'id de l'objet grâce à "find()" pour trouver le "Post" ayant le même "_id" que le paramètre de la requête
  exports.getOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.postId } })
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
  
    Post.updateOne({ where: { id: req.params.postId } }, { ...postObject, id: req.params.postId }) // updateOne récupère l'id dans la base de données
      .then(() => res.status(200).json({ message: 'Post modifié !'}))
      .catch(error => res.status(400).json({ error }))
  }
   
  exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
      .then(post => {
        // On extrait le nom du fichier à supprimer
        const filename = post.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          Post.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Post supprimé !'}))
            .catch(error => res.status(400).json({ error }))
        })
      })
      .catch(error => res.status(500).json({ error: JSON.stringify(error) }))
  }
  
  exports.getAllPosts = (req, res, next) => {
    Post.findAll({ where: { post: req.body.post } })
    .then((post) => {res.status(200).json(post)})
    .catch((error) => {res.status(400).json({error: error})})
  }