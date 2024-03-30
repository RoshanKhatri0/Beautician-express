const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    beauticianId:{
        type: String,
        required: true
    },
    beauticianInfo:{
        type: String,
        required: true
    },
    userInfo:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: 'pending'
    },
},{timestamps:true})

module.exports=mongoose.model('Appointment',appointmentSchema)