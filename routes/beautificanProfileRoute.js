const express = require('express')
const router=express.Router()
const B_Profile = require('../models/beauticianProfileModel')

router.post('/postb_profile', async (req, res) => {
    try {
        const newProfile = new B_Profile(req.body); 
        await newProfile.save(); 
        res.status(201).json(newProfile); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/b_profilelist',async(req,res)=>{
    const b_profile=await B_Profile.find()
    if (!b_profile){
        return res.status(400).json({error:'Something went wrong'})
    }
    res.send(b_profile)
})

module.exports=router