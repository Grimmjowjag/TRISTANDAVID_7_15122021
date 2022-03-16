const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post')
const reactionCtrl = require('../controllers/reaction')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

// Pour protéger nos routes, on ajoute un middleware "auth" 
router.post('/', auth, multer, postCtrl.createPost)
router.get('/:postId', auth, postCtrl.getOnePost)
router.delete('/:id', auth, postCtrl.deletePost)

// Routes likes
router.post('/:postId/like', auth, reactionCtrl.likePost)
// router.post('/:postId/unlike', auth, reactionCtrl.unlikePost)
router.post('/like', auth, reactionCtrl.createLike)
router.get('/posts/:id', auth, reactionCtrl.getAllLike)

module.exports = router