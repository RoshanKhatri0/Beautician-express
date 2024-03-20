const express = require('express')
const authMware = require('../middleware/authMware')
const { getAllUsers, getAllBeauticians } = require('../controllers/adminCtrl')
const router = express.Router()

router.get('/getAllUsers', authMware, getAllUsers )
router.get('/getAllBeauticians', authMware, getAllBeauticians )


module.exports = router