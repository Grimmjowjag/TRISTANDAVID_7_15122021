"use strict"

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
  console.log(req.body.password)
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      // Création du nouvel utilisateur avec un email, un username et un mot de passe crypté
      User.create({
        email: req.body.email,
        password: hash,
        isAdmin: req.body.admin,
        prenom: req.body.prenom,
        nom: req.body.nom
      })
        // et on renvoie un message pour confirmer l'enregistrement de notre user
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

// Connection des utilisateurs existants
exports.login = (req, res, next) => {
  // On essaie de trouver un seul utilisateur de la base de donnée
  console.log(req.body.email)
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' })
      }
      // On compare le mot de passe envoyé avec la requête du "hash" enregistré dans notre doc user
      console.log(user.password)
      console.log(req.body.password)
      bcrypt.compare(req.body.password, user.password)
        // On vérifie si la comparaison est valable ou non -> bon/mauvais mdp
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' + valid })
          }
          // On renvoie un statut "200" pour une bonne connexion avec un userId et un token encodé/crypté (permet la connection)
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.getOneUser = (req, res, next) => {
  User.findOne({ 
    where: { id: req.params.userId },
    attributes: ["id", "nom", "prenom", "email", "isAdmin"]
  })
    .then((user) => { res.status(200).json(user) })
    .catch((error) => { res.status(404).json({ error: error }) })
}

exports.getAllUser = (req, res, next) => {
  User.findAll({
    attributes: ["id", "nom", "prenom", "email", "isAdmin"]
  })
    .then((user) => { res.status(200).json(user) })
    .catch((error) => { res.status(404).json({ error: error }) })
}

exports.modifyUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.userId } })
    .then(user => {
      const modUser = Object.assign(user, req.body)
      modUser.save()
        .then(() => res.status(200).json({ message: 'Profil modifié !' }))
        .catch(error => res.status(400).json({ error: error }))
    }).catch(error => res.status(500).json({ error }))
}

exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then(User => {
      User.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Profil supprimé !' }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error: JSON.stringify(error) }))
}
