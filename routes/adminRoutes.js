const express=require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getAllUsersController, getAllTrainersController,changeAccountStatusController } = require('../controllers/adminCtrl')

const router=express.Router()

//get users method
router.get('/getAllUsers',authMiddleware,getAllUsersController)

//get users method
router.get('/getAllTrainers',authMiddleware,getAllTrainersController)

//post account status
router.post('/changeAccountStatus',authMiddleware,changeAccountStatusController)

module.exports=router