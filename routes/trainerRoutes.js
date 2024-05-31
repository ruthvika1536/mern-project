const express=require('express')
const authMiddleware=require('../middlewares/authMiddleware')
const { getTrainerInfoController, updateProfileController, getTrainerByIdController, trainerAppointmentsController, updateStatusController } = require('../controllers/trainerCtrl')

const router=express.Router()
//post single trainer info
router.post('/getTrainerInfo',authMiddleware,getTrainerInfoController)

//post update profile
router.post('/updateProfile',authMiddleware,updateProfileController)

//post get single doc info
router.post('/getTrainerById',authMiddleware,getTrainerByIdController)

//get appointments 
router.get('/trainer-appointments',authMiddleware,trainerAppointmentsController)

//post update status
router.post('/update-status',authMiddleware,updateStatusController)
module.exports=router