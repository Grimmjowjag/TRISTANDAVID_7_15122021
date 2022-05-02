"use strict"
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    // On récupère le token dans le header "authorization"
    const token = req.headers.authorization.split(' ')[1]
    // On décode le token et on le vérifie
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
    const userId = decodedToken.userId
    const isAdmin = decodedToken.isAdmin

    // Vérification que la requête correspond bien à celle du token -> userId valide ou non
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable'
    // Si tout s'est bien passé, nous pouvons passer au middleware suivant avec next
    } else {
      req.userAuth = { id: userId, isAdmin },
      next()
    }
    // Si une erreur s'affiche, on veut pouvoir les gérer avec catch
  } catch {
    res.status(401).json({
      error:'Requête non authentifiée!'
    })
  }
}