const express = require('express')
const router = express.Router()

const reactionCtrl = require('../controllers/reaction')
const auth = require('../middleware/auth')

router.post('/', auth, reactionCtrl.createreaction)
router.get('/', auth, reactionCtrl.getAllreaction)
router.get('/:reactionId', auth, reactionCtrl.getOnereaction)
router.put('/:reactionId', auth, reactionCtrl.updatereaction)
router.delete('/:reaction', auth, reactionCtrl.deletereaction)


module.exports = router