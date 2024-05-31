const userModel = require('../models/userModels')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const trainerModel=require('../models/trainerModel')
const appointmentModel=require('../models/appointmentModel')
const moment=require('moment')

//login callback
const loginController=async(req,res)=>{
    try{
        const user=await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({message:'user not found',success:false})
        }
        const isMatch=await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
            return res.status(200).send({message:'Invalid email or password',success:false})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.status(200).send({message:'Login Success',success:true,token})

    }catch(error){
        console.log(error)
        res.status(500).send({message:`error in login ctrl${error.message}`})
    }

}
//register callabck
const registerController=async(req,res)=>{
    try{
        const existingUser=await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({message:'user already exists',success:false})
        }
        const password=req.body.password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        req.body.password=hashedPassword
        const newUser=new userModel(req.body)
        await newUser.save()
        res.status(201).send({message:'Registration success',success:true})
    }catch(error){
       console.log(error)
       res.status(500).send({success:false,message:`Register Controller ${error.message}`}) 
    }

}

const authController=async(req,res)=>{
    try{
        const user=await userModel.findById({_id:req.body.userId})
        user.password=undefined;
        if(!user){
            return res.status(200).send({message:'user not found',success:false})
        }else{
            res.status(200).send({success:true,
                data:user
            })
        }

    }catch(error){
        console.log(error)
        res.status(500).send({message:'Auth error',success:false,error})
    }

}
//apply doctor controller
const applyTrainerController=async(req,res)=>{
    try{
      const newTrainer=await trainerModel({...req.body,status:'pending'})
      await newTrainer.save()
      const adminUser=await userModel.findOne({isAdmin:true})
      const notification=adminUser.notification
      notification.push({
        type:'apply-trainer-request',
        message:`${newTrainer.firstName} ${newTrainer.lastName} Has Applied For A Trainer Account `,
        data:{
            trainerId:newTrainer._id,
            name:newTrainer.firstName+" "+newTrainer.lastName,
            onClickPath:'/admin/trainers'
        }
      })
      await userModel.findByIdAndUpdate(adminUser._id,{notification})
      res.status(201).send({
        success:true,
        message:'Trainer Account Applied Successfully',
      })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while applying for doctor'
        })
    }

}

//notification controller
const getAllNotificationController=async(req,res)=>{
    try{
        const user=await userModel.findOne({_id:req.body.userId})
        const seennotification=user.seennotification
        const notification=user.notification
        seennotification.push(...notification)
        user.notification=[]
        user.sseennotification=notification
        const updatedUser=await user.save()
        res.status(200).send({
            success:true,
            message:'all notification marked as read',
            data:updatedUser,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            message:'Error in notification',
            success:false,
            error
        })
    }


}
//delete notification controller
const deleteAllNotificationController=async(req,res)=>{
    try{
       const user =await userModel.findOne({_id:req.body.userId})
       user.notification=[]
       user.seennotification=[]
       const updatedUser=await user.save()
       updatedUser.password=undefined
       res.status(200).send({
        success:true,
        message:'Notifications deleted successfully',
        data:updatedUser,
       })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'unable to delete all notification',
            error
        })
    }

}

//get all trainers controllers
const getAllTrainersController=async(req,res)=>{
    try{
      const trainers=await trainerModel.find({status:'approve'})
      res.status(200).send({
        success:true,
        message:'Trainers List Fetched Successfully',
        data:trainers,
      }) 
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error While Fetching Trainers'
        })
    }
}
//book appointment controller
const bookAppointmentController=async(req,res)=>{
    try{
        req.body.date=moment(req.body.date,"DD-MM-YYYY").toISOString()
        req.body.time=moment(req.body.time,"HH:mm").toISOString()
        req.body.status="pending"
        const newAppointment=new appointmentModel(req.body)
        await newAppointment.save()
        const user =await userModel.findOne({_id:req.body.trainerInfo.userId})
        user.notification.push({
            type:'New-appointment-request',
            message:`A new Appointment Request from ${req.body.userInfo.name}`,
            onClickPath:'/user/appointments'
        })
        await user.save()
        res.status(200).send({
            success:true,
            message:'Appointment Book Successfully'
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error While Booking Appointment'
        })
    }

}
//booking availability controller
const bookingAvailabilityController=async(req,res)=>{
    try{
        const date=moment(req.body.date,"DD-MM-YYYY").toISOString()
        const fromTime=moment(req.body.time,"HH:mm").subtract(1,'hours').toISOString()
        const toTime=moment(req.body.time,"HH:mm").add(1,'hours').toISOString()
        const trainerId=req.body.trainerId
        const appointments=await appointmentModel.find({trainerId,
            date,
            time:{
                $gte:fromTime,$lte:toTime
            }
        })
        if(appointments.length>10){
            return res.status(200).send({
                message:'Appointment not Available at this time',
                success:true,
            })
        }else{
            return res.status(200).send({
                success:true,
                message:'Appointment Available'
            })
        }
    }catch(error){
      console.log(error)
      res.status(500).send({
        success:false,
        error,
        message:'Error in Booking Availability'
      })
    }

}
//appointments list
const userAppointmentsController=async(req,res)=>{
    try{
        const appointments=await appointmentModel.find({
            userId:req.body.userId,
        })
        res.status(200).send({
            success:true,
            message:"Users Appointments Fetched Successfully",
            data:appointments,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error In User Appointments'
        })
    }

}

module.exports={loginController,registerController,authController,applyTrainerController,getAllNotificationController,deleteAllNotificationController,getAllTrainersController,bookAppointmentController,bookingAvailabilityController,userAppointmentsController}
