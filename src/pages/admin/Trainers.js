import React,{useState,useEffect} from 'react'
import Layout from './../../components/Layout'
import axios from 'axios'
import {Table, message} from 'antd'

const Trainers = () => {
  const [trainers,setTrainers]=useState([])

  //getUsers
  const getTrainers=async()=>{
    try{
      const res=await axios.get('/api/v1/admin/getAllTrainers',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
     if(res.data.success){
      setTrainers(res.data.data)
     }
    }catch(error){
      console.log(error)
    }
  }

  //handle account 
  const handleAccountStatus=async(record,status)=>{
    try{
      const res=await axios.post('/api/v1/admin/changeAccountStatus',
      {trainerId:record._id,userId:record.userId,status:status},
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
        message.success(res.data.message)
        window.location.reload()
      }

    }catch(error){
      message.error('Something Went Wrong in Status')
    }
  }

  useEffect(()=>{
    getTrainers()
  },[])

  const columns=[
    {
      title:'Name',
      dataIndex:'name',
      render:(text,record)=>(
      <span>{record.firstName} {record.lastName}</span>
      )
    },
    {
      title:'Status',
      dataIndex:'status'
    },
    {
      title:'Phone',
      dataIndex:'phone',
    },
    {
      title:'Actions',
      dataIndex:'actions',
      render:(text,record)=>(
        <div className='d-flex'>
          {record.status==='pending'?(
          <button className='btn btn-success' 
          onClick={()=>handleAccountStatus(record,"approve")}>Approve</button>):(
          <button className='btn btn-danger'>Reject</button>)
          }
        </div>
      )
    }
  ]
  return (
    <Layout>
      <h1 className='text-center m-2'>All Trainers List</h1>
      <Table columns={columns} dataSource={trainers}/>
    </Layout>
  )
}

export default Trainers