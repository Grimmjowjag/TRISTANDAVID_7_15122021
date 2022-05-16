"use strict"

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../models')

// Enregistrement de nouveaux utilisateurs

exports.signup = (req, res, next) => {
  console.log(req.body.password)
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      // Création du nouvel utilisateur avec un email, un username et un mot de passe crypté
      User.create({
        email: req.body.email,
        password: hash,
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
  if (!req.body.email) {
    return res.status(400).json({ error :'Veuillez renseigner un email'})
  }
  if (!req.body.password) {
    return res.status(400).json({ error :'Veuillez renseigner un mot de passe'})
  }
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé !' })
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
              {
                userId: user.id,
                isAdmin: user.isAdmin
              },
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
  .catch((error) => { res.status(500).json({ error: error }) })
  .then((user) => { 
    if (!user) {
      return res.status(404).json({ error :'Utilisateur introuvable'})
    } 
    else res.status(200).json(user) })
}

exports.getAllUser = (req, res, next) => {
  User.findAll({
    attributes: ["id", "nom", "prenom", "email", "isAdmin"]
  })
  .catch((error) => { res.status(500).json({ error: error }) })
  .then((user) => { res.status(200).json(user) })
}

exports.modifyUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.userId } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error :'Utilisateur introuvable'})
      }
      // Object.assign permet de ne copier que les propriétés qui ne sont pas héritées depuis un objet source vers un objet cible
      const modUser = Object.assign(user, req.body)
      modUser.save()
        .catch(error => res.status(400).json({ error: error }))
        .then(() => res.status(200).json({ message: 'Profil modifié !' }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error :'Utilisateur introuvable'})
      }
      // isAdmin permet de vérifier si l'utilisateur dispose des droits requis
      if (req.userAuth.id == req.params.id || req.userAuth.isAdmin) {
        User.destroy({ where: { id: req.params.id } })
          .catch(error => res.status(400).json({ error }))
          .then(() => res.status(200).json({ message: 'Profil supprimé !' }))
      } else return res.status(401).json({ error: 'Action non autorisée !' })
    })
    .catch(error => res.status(500).json({ error: JSON.stringify(error) }))
}

