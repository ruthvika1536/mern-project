const appointmentModel = require('../models/appointmentModel')
const trainerModel=require('../models/trainerModel')
const userModel = require('../models/userModels')


const getTrainerInfoController=async(req,res)=>{
    try{
        const trainer=await trainerModel.findOne({userId:req.body.userId})
        res.status(200).send({
            success:true,
            message:'trainer data fetch success',
            data:trainer,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Fetching Trainer Details'
        })
    }

}
const updateProfileController=async(req,res)=>{
    try{
      const trainer=await trainerModel.findOneAndUpdate({userId:req.body.userId},req.body)
      res.status(201).send({
        success:true,
        message:'Trainer profile updated',
        data:trainer,
      })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Trainer profile update issue',
            error,
        })
    }

}
//get single trainer
const getTrainerByIdController=async(req,res)=>{
    try{
        const trainer=await trainerModel.findOne({_id:req.body.trainerId})
        res.status(200).send({
            success:true,
            message:'Single Trainer Info Fetched',
            data:trainer,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Single Trainer Info'
        })
    }

}
//get trainer appointments controller
const trainerAppointmentsController=async(req,res)=>{
    try{
        const trainer=await trainerModel.findOne({userId:req.body.userId})
        const appointments=await appointmentModel.find({trainerId:trainer._id})
        res.status(200).send({
            success:true,
            message:'Trainer Appointments Fetched Successfully',
            data:appointments
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Trainer Appointments'
        })
    }

}
//update appointment status controller
const updateStatusController=async(req,res)=>{
    try{
        const {appointmentsId,status}=req.body
        const appointments=await appointmentModel.findByIdAndUpdate(appointmentsId,{status})
        const user =await userModel.findOne({_id:appointments.userId})
        const notification=user.notification
        notification.push({
            type:'Status-Updated',
            message:`Your Appointment Status has been Updated ${status}`,
            onClickPath:'/trainer-appointments'
        })
        await user.save()
        res.status(200).send({
            success:true,
            message:'Appointment Status Updated'
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in updating appointment status'
        })
    }

}

module.exports={getTrainerInfoController,updateProfileController,getTrainerByIdController,trainerAppointmentsController,updateStatusController}