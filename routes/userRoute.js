const express = require('express')
const { postUser, signIn, authController, getAllNotificationController, deleteAllNotification, bookAppointment } = require('../controllers/userController')
const authMware = require('../middleware/authMware')
const router = express.Router()

router.post('/register',postUser)
router.post('/login',signIn)
router.post('/getUserData',authMware, authController)
router.post('/get-all-notification',authMware, getAllNotificationController)
router.post('/delete-all-notification',authMware, deleteAllNotification)
//Book appointment
router.post('/book-appointment',authMware, bookAppointment)

module.exports=router