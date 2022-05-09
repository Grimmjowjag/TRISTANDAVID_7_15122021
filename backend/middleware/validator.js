"use strict"

const validator = require('validator')

module.exports = (req, res, next) => {
  try {
    // Vérification que la requête correspond bien à celle du token -> password valide ou non
    // Si validator est false
    if (validator.isEmpty(req.body.nom) || validator.isEmpty(req.body.prenom)) {
      console.log('Veuillez renseigner un nom et un prénom')
      return res.status(400).json({ error: 'Veuillez renseigner un nom et un prénom' })
    }
    if (!validator.isStrongPassword(req.body.password)) {
      console.log('Veuillez utiliser un mot de passe au bon format')
      return res.status(400).json({ error: 'Veuillez utiliser une majuscule, une minuscule, un chiffre et un caractère spécial' })
      // Format requis: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
    } else { next() }
  } catch (err){
    console.log(err)
    res.status(500).json({
      error: "erreur serveur"
    })
  }
}