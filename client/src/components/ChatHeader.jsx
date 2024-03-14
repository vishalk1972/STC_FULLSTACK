import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {data} from "../assests/data"
import { userContext } from '../App';
import axios from 'axios';
import { CiMenuKebab } from "react-icons/ci";
// do api call here using id and show name of group , name of students
const ChatHeader = ({activeGroup}) => {
 const {id}=useParams();
 const backurl=import.meta.env.VITE_BACKEND_URL
 const {user}=useContext(userContext)
 const [threestudents,setthreestudent]=useState()
 console.log(activeGroup)
  useEffect(()=>{
          if(user && id)
          {
            let url = `${backurl}/api/${user?.type}Dashboard/studentsUnderGroup/${id}`;
            if(user.type === 'student'){
              url = `${backurl}/api/${user?.type}Dashboard/studentsUnderGroup`;
            }
            axios.get(url,
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
   console.log(threestudents,"bccccc")
  return (
    (
        id && <div className='text-center p-5 flex'>
          
          {/* <h1 className='text-xl font-semibold'>{activeGroup.name.toUpperCase().slice(0,3)} {activeGroup.name.slice(3)}</h1> */}
          <div className=''>
            <h1 className='text-xl font-semibold'>GRP {id}</h1>
            <h1 className=''>{activeGroup.name}</h1>
            {
                threestudents && threestudents.map((student,index)=>(
                  <span key={student.id} className='text-xl'>{student.first_name.charAt(0).toUpperCase() +student.first_name.slice(1)} {index+1==threestudents.length ? "":","} </span> 
                ))
            }
          </div>
          
          {/* <h1 className='text-xl'>{threestudents[0].first_name} , {threestudents[1].first_name}  , {threestudents[2].first_name}</h1> */}
      </div>
    )
    
  )
}

export default ChatHeader
