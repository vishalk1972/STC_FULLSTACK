import React, { useState, useEffect, useContext} from 'react'
import axios from "axios"
import { userContext } from '../../App'
import Shimmer from '../../Common/Shimmer'
import StudentCard from '../../components/StudentCard'
import { Link } from 'react-router-dom'
const AdminGetStudent = () => {
  // const navigate=useNavigate();
  const backurl=import.meta.env.VITE_BACKEND_URL
  const [StudentList,setStudentList]=useState(null)
  // console.log(admin,"->")
  // console.log(StudentList)
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
            // console.log(StudentList)
        })
        .catch((err)=>{
            console.log(err)
            toast.error(err.response.data.message)
        })
      }
  },[admin,StudentList])
  return (
    StudentList===null ? <Shimmer type="List Of All Students" className="border-b-2 w-[25%] h-96 flex flex-col  p-4 rounded-2xl shadow-xl bg-gradient-to-r from-slate-400 to-slate-300 gap-1"/>:
    <div className='bg-gray-300 min-h-screen  '>
        <div className='flex justify-end gap-5 pt-5 px-5'>
          <Link to="/admin/dashboard/addStudent"><button className='bg-slate-700 text-white  py-1 hover:bg-slate-600 px-4 text-xl rounded-xl focus:outline-none focus:shadow-outline'>Add Another Student</button></Link>
          <Link to="/admin/dashboard"><button className='bg-slate-700 text-white  py-1 hover:bg-slate-600 px-4 text-xl rounded-xl focus:outline-none focus:shadow-outline'>Go To Dashboard</button></Link>
       </div>
        <div className='flex flex-col items-center justify-center gap-5 h-max py-14'>
          <h1 className='text-2xl mb-1'>List Of All Students</h1>
          {
            StudentList.map((student)=>{
                return< StudentCard student={student}/>
            })
          }  
        </div>
    </div>
  )
}

export default AdminGetStudent
