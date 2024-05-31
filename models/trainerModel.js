const mongoose=require('mongoose')

const trainerSchema=new mongoose.Schema({
    userId:{
        type:String,
    },
    firstName:{
        type:String,
        required:[true,'first name is required']
    },
    lastName:{
        type:String,
        required:[true,'last name is required']
    },
    phone:{
        type:String,
        required:[true,'phone no is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    website:{
        type:String,
    },
    address:{
        type:String,
        required:[true,'address is required']
    },
    specialization:{
        type:String,
        required:[true,'specialization is required']
    },
    feesPerSession:{
        type:Number,
        required:[true,'fee is required']
    },
    status:{
        type:String,
        default:'pending',
    },
    timings:{
       type:Object,
       required:[true,'work timing is required']
    }
},{timestamps:true}
);

const trainerModel=mongoose.model('trainers',trainerSchema)
module.exports=trainerModel