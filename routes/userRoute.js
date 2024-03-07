const express = require('express')
const { postUser, signIn, authController } = require('../controllers/userController')
const authMware = require('../middleware/authMware')
const router = express.Router()

router.post('/register',postUser)
router.post('/login',signIn)
router.post('/getUserData',authMware, authController)


module.exports=router