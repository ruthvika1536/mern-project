import React, { useState,useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import moment from 'moment'
import { Table } from 'antd'
import 'moment-timezone';

const Appointments = () => {
    const [appointments,setAppointments]=useState([])


    const getAppointments=async()=>{
        try{
            const res=await axios.get('/api/v1/user/user-appointments',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setAppointments(res.data.data)
            }
        }catch(error){
            console.log(error)
        }

    }
    useEffect(()=>{
        getAppointments();
    },[])

const columns=[
    {
        title:"ID",
        dataIndex:"_id"
    },
    //{
    //   title:"Name",
     //   dataIndex:"name",
     //   render:(text,record)=>(
     //       <span>
     //           {record.trainerId.firstName} {record.trainerId.lastName}
     //       </span>

     //   )
    //},
    //{
    //   title:"Phone",
    //    dataIndex:"phone",
    //    render:(text,record)=>(
    //        <span>
    //            {record.trainerId.phone}
    //        </span>

    //    )
    //},
    {
        title:"Date & Time",
        dataIndex:"date",
        render:(text,record)=>(
            <span>
                {moment.tz(record.date, 'Asia/Kolkata').format("DD-MM-YYYY")} &nbsp;
                {moment.tz(record.time, 'Pacific/Honolulu').format("HH:mm")}
            </span>

        )
    },
    {
        title:"Status",
        dataIndex:"status",
    },
]
  return (
    <Layout>
        <h1>Appointments List</h1>
        <Table columns={columns} dataSource={appointments}/>
    </Layout>
  )
}

export default Appointments