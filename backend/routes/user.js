const express = require('express')
const router = express.Router()
const validator = require('../middleware/validator') 
const auth = require('../middleware/auth')

// Controler pour associer les fonctions aux différentes routes
const userCtrl = require('../controllers/user')

router.post('/signup', validator, userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/:userId', auth, userCtrl.getOneUser)
router.get('/', auth, userCtrl.getAllUser)
router.delete('/:id', auth, userCtrl.deleteUser)

module.exports = router