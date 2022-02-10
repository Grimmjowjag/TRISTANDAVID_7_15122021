const express = require('express')
const router = express.Router()

const likeCtrl = require('../controllers/reaction')
const auth = require('../middleware/auth')

router.post('/', auth, likeCtrl.createLike)
router.get('/posts/:id', auth, likeCtrl.getOneLike)