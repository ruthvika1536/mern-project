const express=require('express')
const { loginController, 
    registerController, 
    authController,
    applyTrainerController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllTrainersController,
    bookAppointmentController,
    bookingAvailabilityController,
    userAppointmentsController
} = require('../controllers/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

//router object
const router=express.Router()

//login post method
router.post('/login',loginController)
//register post method
router.post('/register',registerController)
//Auth post method
router.post('/getUserData',authMiddleware,authController)
//Apply trainer post method
router.post('/apply-trainer',authMiddleware,applyTrainerController)
//notification post method
router.post('/get-all-notification',authMiddleware,getAllNotificationController)
//notification post method
router.post('/delete-all-notification',authMiddleware,deleteAllNotificationController)
//get all trainers
router.get('/getAllTrainers',authMiddleware,getAllTrainersController)
//book appointment 
router.post('/book-appointment',authMiddleware,bookAppointmentController)
//booking availability
router.post('/booking-availability',authMiddleware,bookingAvailabilityController)
//appointments list
router.get('/user-appointments',authMiddleware,userAppointmentsController)

module.exports=router