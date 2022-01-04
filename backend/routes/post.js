const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

// Pour protéger nos routes, on ajoute un middleware "auth" 
router.get('/', auth, postCtrl.getAllPosts)
router.post('/', auth, multer, postCtrl.createPost)
router.get('/:id', auth, postCtrl.getOnePost)
router.put('/:id', auth, multer, postCtrl.modifyPost)
router.delete('/:id', auth, postCtrl.deletePost)
router.post('/:id/like', auth, postCtrl.likePost)

module.exports = router