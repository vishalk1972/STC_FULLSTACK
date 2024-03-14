import React, { useState, useEffect, useContext} from 'react'
import axios from "axios"
import { userContext } from '../../App'
import Shimmer from '../../Common/Shimmer'
import StudentCard from '../../components/StudentCard'
import { Link } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import Loading from '../../Common/Loading'
import { Toaster,toast } from 'react-hot-toast'
const AdminGetStudent = () => {
  const backurl=import.meta.env.VITE_BACKEND_URL
  const [StudentList,setStudentList]=useState(null)
  const {admin}=useContext(userContext)
  useEffect(()=>{
      if(admin)
      {
        axios.get(`${backurl}/api/adminDashboard/students`,
        {
            headers:{
                Authorization: `Bearer ${admin.token}`
            }
        }
        )
        .then((res)=>{
            console.log(res)
            setStudentList(res.data.data);
        })
        .catch((err)=>{
            console.log(err)
            toast.error(err.response.data.message)
        })
      }
  },[admin,StudentList])
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
            console.log(res)
            setTimeout(() => {
              return toast.success(`${id} Deleted Successfully`)
            }, 1000);  
        })
        .catch((err)=>{
            console.log(err)
            return toast.error(err.response.data.message || "Error Deleting Data")
        })
      }

  }
  return (
    StudentList===null ? <div className='flex justify-center'><Loading/></div>:
    <div className='bg-[#d5e0fb] min-h-screen  '>
       <Toaster/>
       <div className='flex justify-end md:gap-5 gap-2 pt-5 md:px-5 px-2'>
          <Link to="/admin/dashboard/addTeacher"><button className='bg-[#041643] text-white  py-1 hover:bg-slate-600 md:px-4 px-2 md:text-xl text-lg rounded-xl focus:outline-none focus:shadow-outline'>Add Student</button></Link>
          <Link to="/admin/dashboard"><button className='bg-[#041643] text-white  py-1 hover:bg-slate-600 md:px-4 px-2 md:text-xl text-lg rounded-xl focus:outline-none focus:shadow-outline'>Dashboard</button></Link>
      </div>
        <h1 className='md:text-2xl text-xl my-2 md:flex justify-center font-bold md:mb-5 mb-2 mx-2'>List Of All Students</h1> 
        <div className='md:flex md:justify-center md:items-center my-1 min-w-screen mx-2'>
        <table className="border rounded-xl bg-[#e9ebf0]">
          <thead className=''>
            <tr className='bg-[#4076fe] text-gray-50'> 
              <th className="border-b border-r-2 border-gray-300 md:p-4 p-2 md:text-2xl text-xl">Id</th>
              <th className="border-b border-r-2 border-gray-300 md:p-4 p-2 md:text-2xl text-xl">Roll No.</th>
              <th className="border-b border-r-2 border-gray-300  md:p-4 p-2 md:text-2xl text-xl">Full Name</th>
              <th className="border-b border-r-2 md:p-4 p-2 border-gray-300 md:text-2xl text-xl">Email</th>
              <th className="border-b border-r-2 md:p-4 p-2 border-gray-300 md:text-2xl text-xl">Password</th>
              <th className="border-b border-r-2 md:p-4 p-2 border-gray-300 md:text-2xl text-xl">Mobile No</th>
              <th className="border-b border-r-2 md:p-4 p-2 border-gray-300 md:text-2xl text-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {StudentList.map(({ id,first_name,last_name,email,roll_number,mobile_number,password },index) => (
              <tr key={id} className={`${index%2==0 ? "bg-gray-100" :"bg-[#bed0fd]"}`}> 
                <td className="border-b border-r-2 border-gray-400  md:p-6 p-2 md:text-xl text-lg">{id}</td>
                <td className="border-b border-r-2 border-gray-400  md:p-4 p-2 md:text-xl text-lg ">{roll_number}</td>
                <td className="border-b border-r-2 border-gray-400  md:p-4 p-2 md:text-xl text-lg">{first_name} {last_name}</td>
                <td className="border-b border-r-2 border-gray-400  md:p-4 p-2 md:text-xl text-lg ">{email}</td>
                <td className="border-b border-r-2 border-gray-400  md:p-4 p-2 md:text-xl text-lg ">{password}</td>
                <td className="border-b border-r-2 border-gray-400  md:p-4 p-2 md:text-xl text-lg ">{mobile_number}</td>
                <td className="border-b border-r-2 border-gray-400  md:p-8 p-2 md:text-xl text-lg "><RiDeleteBin6Line className='cursor-pointer' onClick={() => handleDelete(id)} /></td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
    </div>
  )
}

export default AdminGetStudent
