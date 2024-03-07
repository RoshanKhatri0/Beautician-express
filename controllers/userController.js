const User = require('../models/userModel');
const crypto = require('crypto');
const Token = require('../models/tokenModel');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.postUser = async (req, res) => {
    try {
        const emailLowercase = req.body.email.toLowerCase();
        let user = await User.findOne({ email: emailLowercase });

        if (user) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        user = new User({
            name: req.body.name,
            email: emailLowercase,
            password: req.body.password, 
        });

        user = await user.save();

        let token = new Token({
            token: crypto.randomBytes(16).toString('hex'),
            userId: user._id,
        });

        token = await token.save();
        
        return res.status(200).json({ message: 'User created successfully', success: true, user });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'An error occurred during the registration process' });
    }
};

exports.signIn = async(req,res)=>{
    const { email, password } = req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(503).json({message: "User doesnot exist", success: false})
        }
        if (!user.authenticate(password)) {
            return res.status(400).json({ error: 'email and password doesnot match', success: false })
        }
        //now generate token with user id and jwt secret
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET , {expiresIn: "1d"})
    res.status(200).json({ message:"Login Successfull", success: true, token})
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Error logging in", success:false, error})
    }
}

exports.authController = async(req,res) =>{
    try{
        const user = await userModel.findOne({_id:req.body.userId})
        if(!user){
            return res.status(200).json({message:'user not found',success:false})
        }
        else{
            res.status(200).json({success:true,data:{name:user.name, email:user.email}})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:'auth error',success:false,error})
    }
}