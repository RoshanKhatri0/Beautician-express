const B_Profile =require('../models/beauticianProfileModel');
const userModel = require('../models/userModel');

exports.postB_Profile=async(req,res)=>{
    try{
        let contactInfo = {
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
          };
        
          let socialsData = {
            socials_instragram: req.body.socials_instragram,
            socials_facebook: req.body.socials_facebook,
            socials_tiktok: req.body.socials_tiktok
          };
        let b_profile = new B_Profile({
            userId: req.body.userId,
            beautician_name: req.body.beautician_name,
            beautician_bio: req.body.beautician_bio,
            beautician_profilepic: req.file.path,
            experience: req.body.experience,
            gallery: req.body.gallery,
            pricing: req.body.pricing,
            services_offered: req.body.services_offered,
            working_hours: req.body.working_hours,
            certifications: req.body.certifications,
            contact_info: contactInfo,
            socials: socialsData,
            
        })
        await b_profile.save()
        const adminUser = await userModel.findOne({role:1})
        const notification = adminUser.notification
        notification.push({
            type:"apply-beautician-request",
            message: `${b_profile.beautician_name} has applied for a Beautician Account`,
            data:{
                b_Id: b_profile._id,
                name: b_profile.beautician_name,
                onClickPath:'/admin/beuticians'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, {notification})
        res.status(201).json({
            success:true,
            message: "Beautician Account Applied Successfully"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success:false, error, message:"Error while applying for beautician"
        })
    }
}

exports.B_ProfileList=async(req,res)=>{
    const b_profile = await B_Profile.find()
    if (!b_profile){
        return res.status(400).json({error:'Something went wrong'})
    }
    res.send(b_profile)
}

exports.B_ProfileDetail=async(req,res)=>{
    const b_profile = await B_Profile.findById(req.params.id)
    if (!b_profile){
        return res.status(400).json({error:'Something went wrong'})
    }
    res.send(b_profile)
}

exports.B_ProfileUpdate=async(req,res)=>{
    const b_profile = await B_Profile.findByIdAndUpdate(
        req.params.id,
        {
            beautician_name: req.body.beautician_name,
            beautician_bio: req.body.beautician_bio,
            beautician_profilepic: req.file.path,
            experience: req.body.experience,
            gallery: req.body.gallery,
            pricing: req.body.pricing,
            services_offered: req.body.services_offered,
            working_hours: req.body.working_hours,
            certifications: req.body.certifications,
            contact_info: {
                email: req.body.contact_info.email,
                phoneNumber: req.body.contact_info.phoneNumber
              },
              socials: {
                socials_instragram: req.body.socials.socials_instragram,
                socials_facebook: req.body.socials.socials_facebook,
                socials_tiktok: req.body.socials.socials_tiktok
              }
            
        },{new:true}
    )
    if (!b_profile){
        return res.status(400).json({error:'Something went wrong'})
    }
    res.send(b_profile)
}

exports.B_ProfileDelete = (req,res)=>{
    B_Profile.findByIdAndDelete(req.params.id)
    .then(b_profile=>{
        if (!b_profile){
            return res.status(404).json({error:'b_profile with this id is not found'})
        }
        else{
            return res.status(200).json({message:'profile deleted'})
        }
    })
    .catch(err=>{
        return res.status(400).json({error:err})
    })
}