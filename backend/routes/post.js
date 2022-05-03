const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

// Pour protéger nos routes, on ajoute un middleware "auth" 
router.post('/', auth, multer, postCtrl.createPost)
router.get('/:postId', auth, postCtrl.getOnePost)
router.get('/', auth, postCtrl.getAllPost)
router.delete('/:id', auth, postCtrl.deletePost)

module.exports = router