const express = require('express')
const router=express.Router()
const { postB_Profile, B_ProfileList, B_ProfileDetail, B_ProfileUpdate, B_ProfileDelete } = require('../controllers/beauticianProfileController');
const upload = require('../middleware/fileUpload');

router.post('/b_profilepost',upload.single('beautician_profilepic') , postB_Profile )
router.get('/b_profilelist',B_ProfileList)
router.get('/b_profiledetail/:id',B_ProfileDetail)
router.put('/b_profileupdate/:id',upload.single('beautician_profilepic'),B_ProfileUpdate)
router.delete('/b_profiledelete/:id',B_ProfileDelete)




module.exports=router