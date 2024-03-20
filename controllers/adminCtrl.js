const beauticianProfileModel = require('../models/beauticianProfileModel')
const User= require ('../models/userModel')

exports.getAllUsers = async(req,res) =>{
    try {
        const users = await User.find({})
        res.status(200).json({
            success: true, message:'users data', data: users
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'error while fetching users', error})
    }
}
exports.getAllBeauticians = async(req,res) =>{
    try {
        const beauticians = await beauticianProfileModel.find({})
        res.status(200).json({
            success: true, message:'beautician data', data: beauticians
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'error while fetching users', error})
    }
}
