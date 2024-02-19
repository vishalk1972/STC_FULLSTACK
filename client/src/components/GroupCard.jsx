import React, { useContext} from 'react'
import axios from "axios"
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../App';
import {Toaster,toast} from "react-hot-toast"
const GroupCard = ({group}) => {
  const navigate=useNavigate();
  const backurl=import.meta.env.VITE_BACKEND_URL
  const {admin}=useContext(userContext)
  const {id,fk_teacher,group_id}=group;
  
  //////
  const handleDelete=(id)=>{
    if(admin)
      {
        axios.delete(`${backurl}/api/group/delete/${id}`,
        {
            headers:{
                Authorization: `Bearer ${admin.token}`
            }
        }
        )
        .then((res)=>{
            toast.success(`${group_id} Deleted Successfully`)
             
        })
        .catch((err)=>{

            console.log(err)
            return toast.error(err.response.data.message)
        })
      }

  }
  return (
    <>
    <Toaster/>
    <div className='text-center border-b-2 w-[25%] flex items-center justify-between p-5 rounded-2xl shadow-xl bg-gradient-to-r from-slate-400 to-slate-300' >
        <h1 className='text-xl'>Id:{id}</h1>
        <h1 className='text-xl'>Grp Name: {group_id}</h1>
        <h1 className='text-xl'>Teacher Id: {fk_teacher}</h1>
        <div className='text-xl cursor-pointer' onClick={()=>handleDelete(id,group_id)}>
            <RiDeleteBin6Line/>
        </div>
        
    </div>
    </>
  )
}

export default GroupCard