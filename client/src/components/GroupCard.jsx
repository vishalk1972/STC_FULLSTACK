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
  const {id,fk_teacher,group_name}=group;
  
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
            // console.log(res)
            toast.success(`${id} Deleted Successfully`)
        })
        .catch((err)=>{

            // console.log(err)
            return toast.error(err.response.data.message || 'Error Deleting Group')
        })
      }

  }
  return (
    <>
    <Toaster/>
    <div className='text-center border-b-2 md:w-[25%] w-[90%] flex items-center justify-between p-5 rounded-2xl shadow-xl bg-gradient-to-r from-[#80a8ff] to-[#c4d5f9]' >
        <h1 className='md:text-xl text-lg'>Id:{id}</h1>
        <h1 className='md:text-xl text-lg'>Grp Name: {group_name}</h1>
        <h1 className='md:text-xl text-lg'>Teacher Id: {fk_teacher}</h1>
        <div className='md:text-xl text-lg cursor-pointer ' onClick={()=>handleDelete(id )}>
            <RiDeleteBin6Line/>
        </div>
        
    </div>
    </>
  )
}

export default GroupCard