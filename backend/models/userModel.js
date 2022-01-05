"use strict"

const mongoose = require('mongoose')

// Création du schéma de données avec les champs requis (ceci va simplifier les opérations de lecture et d'écriture dans la base de données)
const userSchema = mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  enterprise_year: { type: String, required: true },
  description: { type: String, required: true },
  age: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: {type: Number, default: 0},
  dislikes: {type: Number, default: 0},
  usersLiked: {type: Array, default: []},
  usersDisliked: {type: Array, default: []}
})

// On exporte le modèle correspondant
module.exports = mongoose.model('User', userSchema)