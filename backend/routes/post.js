const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

// Pour protéger nos routes, on ajoute un middleware "auth" 
router.get('/', auth, postCtrl.getAllPosts)
router.post('/', auth, multer, postCtrl.createPost)
router.get('/:postId', auth, postCtrl.getOnePost)
router.put('/:postId', auth, multer, postCtrl.modifyPost)
router.delete('/:postId', auth, postCtrl.deletePost)
router.post('/:postId/like', auth, postCtrl.likePost)

module.exports = router