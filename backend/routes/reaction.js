const express = require('express')
const router = express.Router()

const reactionCtrl = require('../controllers/reaction')
const auth = require('../middleware/auth')

router.post('/', auth, reactionCtrl.createreaction)
router.get('/:id', auth, reactionCtrl.getPostreaction)
router.delete('/:id', auth, reactionCtrl.deletereaction)


module.exports = router