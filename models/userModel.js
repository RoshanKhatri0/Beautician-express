const mongoose=require('mongoose')
const uuidv1=require('uuidv1')
const crypto=require('crypto')

const userSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true

    },
    email:{
        required:true,
        type:String,
        trim:true,
        unique:true
    },
    role:{
        type:Number,
        default:0
    },
    hashed_password:{
        required:true,
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    salt:String,
    notification:{
        type:Array,
        default:[]
    },
    seennotification:{
        type:Array,
        default:[]
    }

},{timestamps:true})

//virtual fields
userSchema.virtual('password')
.set(function(password){
    this._password=password
    this.salt=uuidv1()
    this.hashed_password=this.encryptPassword(password)
})
.get(function(){
    return this._password
})

//defining methods
userSchema.methods={
    encryptPassword:function(password){
        if(!password) return ''
        try{
            return crypto
            .Hmac('sha1',this.salt)
            .update(password)
            .digest('hex')
        }
        catch(err){
            return err
        }
    },
    authenticate:function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    }
}

module.exports  = mongoose.model('User', userSchema)

