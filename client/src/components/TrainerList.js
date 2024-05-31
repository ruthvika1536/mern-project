import React from 'react'
import { useNavigate } from 'react-router-dom'

const TrainerList = ({trainer}) => {
    const navigate=useNavigate()
  return (
    <>
        <div className='card m-2' 
        style={{cursor:'pointer'}}
        onClick={()=>navigate(`/trainer/book-appointment/${trainer._id}`)}>
            <div className='card-header'>
              <b>Trainer:</b>  {trainer.firstName} {trainer.lastName}
            </div>
            <div className='card-body'>
                <p>
                    <b>Specialization</b> {trainer.specialization}
                </p>
                <p>
                    <b>Phone</b> {trainer.phone}
                </p>
                <p>
                    <b>Email</b> {trainer.email}
                </p>
                <p>
                    <b>Address</b> {trainer.address}
                </p>
                <p>
                    <b>Fees Per Session</b> {trainer.feesPerSession}
                </p>
                <p>
                    <b>Timings</b> {trainer.timings[0]} - {trainer.timings[1]}
                </p>
                
            </div>
        </div>
    </>
  )
}

export default TrainerList