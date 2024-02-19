import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {data} from "../assests/data"
import { userContext } from '../App';
import axios from 'axios';
// do api call here using id and show name of group , name of students
const ChatHeader = () => {
 const {id}=useParams();
 const backurl=import.meta.env.VITE_BACKEND_URL
 const {user}=useContext(userContext)
//  console.log(id,user,"frompara")
 const [threestudents,setthreestudent]=useState()
//  console.log(threestudents)
  useEffect(()=>{
          if(user && id)
          {
            axios.get(`${backurl}/api/teacherDashboard/studentsUnderGroup/${id}`,
            {
                headers:{
                  Authorization:`Bearer ${user?.token}`
                }
            })
            .then((res)=>{
              // console.log(res)
              setthreestudent(res.data.data)
            })
            .catch((err)=>{
              // console.log(err)
            })
          }
   },[user,id])
  return (
    (
        id && <div className='text-center p-5'>
          <h1 className='text-2xl'>{id}</h1>
          {
              threestudents && threestudents.map((student,index)=>(
                <span key={student.id} className='text-xl'>{student.first_name.charAt(0).toUpperCase() +student.first_name.slice(1)} {index+1==threestudents.length ? "":","} </span> 
              ))
          }
          {/* <h1 className='text-xl'>{threestudents[0].first_name} , {threestudents[1].first_name}  , {threestudents[2].first_name}</h1> */}
      </div>
    )
    
  )
}

export default ChatHeader
