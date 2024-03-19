import React, { useContext } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { userContext } from '../App';
import axios from "axios"
import {Toaster,toast} from "react-hot-toast"
const StudentCard = ({student}) => {
    const {admin}=useContext(userContext)
    const backurl=import.meta.env.VITE_BACKEND_URL
    const handleDelete=(id)=>{
        if(admin)
          {
            axios.delete(`${backurl}/api/student/delete/${id}`,
            {
                headers:{
                    Authorization: `Bearer ${admin.token}`
                }
            }
            )
            .then((res)=>{
                // console.log(res)
                setTimeout(() => {
                  return toast.success(`${id} Deleted Successfully`)
                }, 1000);  
            })
            .catch((err)=>{
                // console.log(err)
                return toast.error(err.response.data.message || "Error Deleting Data")
            })
          }
    
      }
    const {id,first_name,last_name,email,fk_domain,fk_group,roll_number,reg_number,mobile_number}=student
  return (
    <>
   
    <div className='border-b-2 w-[25%] flex justify-between p-8 rounded-2xl shadow-xl bg-gradient-to-r from-[#80a8ff] to-[#c4d5f9] gap-1' >
        <div>
            <h1 className='text-xl'>id: {id}</h1>
            <h1 className='text-xl font-semibold '>Name: {first_name+" "} {last_name}</h1>
            <h1 className='text-xl'>Email: {email}</h1>
            <h1 className='text-xl'>Roll No: {roll_number}</h1>
            <h1 className='text-xl'>Reg No: {reg_number}</h1>
            <h1 className='text-xl'>Domain Id: {fk_domain}</h1>
            <h1 className='text-xl'>Group Id: {fk_group}</h1>
        </div>
        <div className='text-xl flex justify-end cursor-pointer ml-auto' onClick={()=>handleDelete(id)}>
            <RiDeleteBin6Line/>
        </div>
    </div>
    </>
  )
}

export default StudentCard