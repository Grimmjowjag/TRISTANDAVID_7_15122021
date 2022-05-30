"use strict"
require('dotenv').config()

const express = require('express')
const helmet = require("helmet")
const path = require('path')

const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')
const reactionRoutes = require('./routes/reaction')
const userRoutes = require('./routes/user')
const cors = require("cors")
const app = express()

// ---- CORS (Cross-origin ressource sharing nécéssaire ici car le front et le back ne partagent pas la même origine) ----

// Premier Middleware éxécuté par le serveur (permet à l'application d'accéder à l'API sans problème depuis n'importe quelle origine)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*') // "*" Permet l'accès à l'origine de notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization') // Autorisation des headers spécifiés
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS') // Autorisation des requêtes spécifiées
    next()
  })

const rateLimit = require("express-rate-limit")
const { cp } = require('fs')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  message:"Trop de requêtes effectuées, veuillez réessayer dans 15 minutes"
})

// Appliqué à toutes les requêtes

app.use(cors())

app.use(limiter)

app.use(express.json())

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/reaction', reactionRoutes)
app.use('/api/auth', userRoutes)

app.use(helmet())

module.exports = app