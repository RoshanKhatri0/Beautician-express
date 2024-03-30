const express = require('express')
const router=express.Router()
const { postB_Profile, B_ProfileList, B_ProfileDetail, B_ProfileUpdate, B_ProfileDelete, getBeauticianById, beauticianAppointmentList, updateStatus } = require('../controllers/beauticianProfileController');
const upload = require('../middleware/fileUpload');
const authMware = require('../middleware/authMware');

//Apply for Beautician
router.post('/apply-beautician',upload.single('beautician_profilepic'), authMware , postB_Profile )
//Get Info of Beautician
router.post('/getBeauticianInfo', authMware ,B_ProfileDetail)
//Update Beautician Profile
router.post('/b_updateprofile/:id',upload.single('beautician_profilepic'), authMware ,B_ProfileUpdate)
//List of Beautician
router.get('/getAllBeautician',authMware, B_ProfileList)
// Post get single beautician info
router.post('/getBeauticianById', authMware, getBeauticianById)
// get Appointments
router.get('/beautician-appointments',authMware, beauticianAppointmentList)
//post update status
router.post('/update-status',authMware, updateStatus)



router.delete('/b_profiledelete/:id',B_ProfileDelete)




module.exports=router