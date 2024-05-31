const trainerModel=require('../models/trainerModel')
const userModel=require('../models/userModels')

const getAllUsersController=async(req,res)=>{
     try{
        const users=await userModel.find({})
        res.status(200).send({
            success:true,
            message:'users data list',
            data:users,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while fetching users',
            error
        })
     
    }

}
const getAllTrainersController=async(req,res)=>{
    try{
          const trainers=await trainerModel.find({})
          res.status(200).send({
            success:true,
            message:'trainers data list',
            data:trainers,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while fetching doctors',
            error
        })
    }

}
//trainer account status
const changeAccountStatusController=async(req,res)=>{
    try{
        const {trainerId,status}=req.body
        const trainer=await trainerModel.findByIdAndUpdate(trainerId,{status})
        const user=await userModel.findOne({_id:trainer.userId}) 
        const notification=user.notification
        notification.push({
            type:'trainer-account-request-updated',
            message:`Your Trainer Account Request Has ${status}`,
            onClickPath:'/notifications'
        })
        if(status==='approve'){
            user.isTrainer=true;
        }else{
            user.isTrainer=false;
        }
        await user.save()
        res.status(201).send({
            success:true,
            message:'Account Status Approved',
            data:trainer,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Account Status',
            error
        })
    }
}

module.exports={getAllTrainersController,getAllUsersController,changeAccountStatusController}