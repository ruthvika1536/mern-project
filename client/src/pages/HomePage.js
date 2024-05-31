import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { Row } from 'antd'
import TrainerList from '../components/TrainerList'

const HomePage = () => {
  const [trainers,setTrainers]=useState([])
//login user data
const getUserData=async()=>{
  try{
    const res=await axios.get("/api/v1/user/getAllTrainers",{
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

useEffect(()=>{
  getUserData()
},[])
  return (
    <Layout>
        <h1 className='text-center'>Home Page</h1>
        <Row>
          {trainers && trainers.map(trainer=>(
            <TrainerList trainer={trainer}/>
          ))}
        </Row>
    </Layout>
  )
}

export default HomePage