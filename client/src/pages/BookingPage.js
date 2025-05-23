import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import {showLoading,hideLoading} from '../redux/features/alertSlice'
import {useDispatch, useSelector} from 'react-redux'
import { DatePicker, TimePicker, message } from 'antd'

const BookingPage = () => {
    const params=useParams()
    const {user}=useSelector((state) =>state.user)
    const [trainers,setTrainers]=useState([])
    const [date,setDate]=useState("")
    const [time,setTime]=useState()
    const [isAvailable,setIsAvailable]=useState(false)
    const dispatch=useDispatch()
    //login user data
    const getUserData=async()=>{
      try{
        const res=await axios.post("/api/v1/trainer/getTrainerById",
        {trainerId:params.trainerId},{
          headers:{
            Authorization:"Bearer "+ localStorage.getItem("token"),
          },
        })
        if(res.data.success){
          setTrainers(res.data.data)
        }
      }catch(error){
        console.log(error)
    
      }
    
    }

//booking function
const handleBooking=async()=>{
  try{
    setIsAvailable(true)
    if(!date && !time){
      return alert("Date & Time Required")
    }
    dispatch(showLoading())
    const res=await axios.post('/api/v1/user/book-appointment',
    {
      trainerId:params.trainerId,
      userId:user._id,
      trainerInfo:trainers,
      userInfo:user,
      date:date,
      time:time,
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`,
      }
    }
  )
  dispatch(hideLoading())
  if(res.data.success){
    message.success(res.data.message)
  }
  }catch(error){
    dispatch(hideLoading())
    console.log(error)
  }

}
//booking function
//booking availability
const handleAvailability=async()=>{
  try{
    dispatch(showLoading())
    const res= await axios.post('/api/v1/user/booking-availability',
    {trainerId:params.trainerId,date,time},
    {
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    }
  )
  dispatch(hideLoading())
  if(res.data.success){
    setIsAvailable(true)
    message.success(res.data.message)
  }else{
    message.error(res.data.message)
  }

  }catch(error){
    dispatch(hideLoading())
    console.log(error)
  }
}
    
    useEffect(()=>{
      getUserData()
      //eslint-disable-next-line
    },[])
  return (
    <Layout>
        <h3>BookingPage</h3>
        <div className='container m-2'>
            {trainers && (
                <div>
                    <h4>Trainer:- {trainers.firstName} {trainers.lastName}</h4>
                    <h4>Fees: {trainers.feesPerSession}</h4>
                    <h4>Timings: {trainers.timings && trainers.timings[0]} -{" "}
                    {trainers.timings && trainers.timings[1]}{" "}
                    </h4>
                    <div className='d-flex flex-column w-50'>
                        <DatePicker aria-required={"true"} className='m-2' format="DD-MM-YYYY" 
                        onChange={(value)=>{
                        setDate(moment(value).format('DD-MM-YYYY'))
                        }}/>
                        <TimePicker 
                        aria-required={"true"}
                        format="HH:mm" 
                        className='m-2'
                         onChange={(value)=>{
                          setTime(moment(value).format("HH:mm"))
                         }}/>
                        <button className='btn btn-primary mt-2' onClick={handleAvailability}>Check Availability</button>
                        
                          <button className='btn btn-dark mt-2' onClick={handleBooking}>Book Now</button>
                        
                    </div>
                </div>
            )}
        </div>
    </Layout>
  )
}

export default BookingPage