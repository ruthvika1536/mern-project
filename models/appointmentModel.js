const mongoose=require('mongoose')

const appointmentSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    trainerId:{
        type:String,
        required:true,
    },
    trainerInfo:{
        type:String,
        required:true,
    },
    userInfo:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        default:'pending',
    },
    time:{
        type:String,
        required:true,
    },

},{timestamps:true})
const appointmentModel=mongoose.model('appointments',appointmentSchema)

module.exports=appointmentModel;