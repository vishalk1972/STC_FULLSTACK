import React, { useContext } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { userContext } from '../App';
import axios from "axios"
import {Toaster,toast} from "react-hot-toast"
const TeacherCard = ({teacher}) => {
    const {admin}=useContext(userContext)
    const backurl=import.meta.env.VITE_BACKEND_URL
    const handleDelete=(id,name)=>{
        if(admin)
          {
            axios.delete(`${backurl}/api/adminDashboard/deleteTeacher/${id}`,
            {
                headers:{
                    Authorization: `Bearer ${admin.token}`
                }
            }
            )
            .then((res)=>{
                // console.log(res)
                setTimeout(() => {
                  return toast.success(`${name} Deleted Successfully`)
                }, 1000);  
            })
            .catch((err)=>{
                // console.log(err)
                return toast.error(err.response.data.message || "Error Deleting Data")
            })
          }
    
      }
    const {id,name,email,domain_name,reg_number,mobile_number,designation}=teacher
  return (
    <>
    <Toaster/>
    {/* <div className='border-b-2 w-[27%] flex flex-col  p-4 rounded-2xl shadow-xl bg-gradient-to-r from-[#80a8ff] to-[#c4d5f9] gap-1' >
        <div className='text-xl flex justify-end cursor-pointer ml-auto relative' onClick={()=>handleDelete(id,name)}>
            <RiDeleteBin6Line/>
        </div>
        <h1 className='text-xl absolute'>Id: {id}</h1>
        <h1 className='text-xl'>Name : {designation} {name}</h1>
        <h1 className='text-xl'>Email : {email}</h1>
        <h1 className='text-xl'>Domain  : {domain_name}</h1>
        <h1 className='text-xl'>Reg No : {reg_number}</h1>
    </div> */}
    <div className="relative bg-gray-100 p-4 rounded-lg">
    <div className='text-xl flex justify-end cursor-pointer ml-auto relative' onClick={() => handleDelete(id, name)}>
      <RiDeleteBin6Line />
    </div>
    <h1 className='text-xl absolute'>Id: {id}</h1>
    <h1 className='text-xl'>Name: {designation} {name}</h1>
    <h1 className='text-xl'>Email: {email}</h1>
    <h1 className='text-xl'>Domain: {domain_name}</h1>
    <h1 className='text-xl'>Reg No: {reg_number}</h1>
  </div>
    </>
  )
}

export default TeacherCard