import React, { useState, useEffect, useContext} from 'react'
import axios from "axios"
import { userContext } from '../../App'
import DomainCard from '../../components/DomainCard'
import Shimmer from '../../Common/Shimmer'
import TeacherCard from '../../components/TeacherCard'
import { Link } from 'react-router-dom'

const AdminGetTeacher = () => {
  // const navigate=useNavigate();
  const backurl=import.meta.env.VITE_BACKEND_URL
  const [TeacherList,setTeacherList]=useState(null)
  // console.log(admin,"->")
  console.log(TeacherList)
  const {admin}=useContext(userContext)
  useEffect(()=>{
      if(admin)
      {
        axios.get(`${backurl}/api/adminDashboard/teachers`,
        {
            headers:{
                Authorization: `Bearer ${admin.token}`
            }
        }
        )
        .then((res)=>{
            console.log(res)
            setTeacherList(res.data.data);
            // console.log(TeacherList)
        })
        .catch((err)=>{
            console.log(err)
            // return toast.error(err.response)
        })
      }
  },[admin,TeacherList])
  return (
    TeacherList===null ? <Shimmer type="List Of All Teachers" className="border-b-2 w-[20%] h-[95%] flex flex-col  p-4 rounded-2xl shadow-xl bg-gradient-to-r from-[#80a8ff] to-[#c4d5f9] gap-1"/>:
    <div className='bg-[#d5e0fb] min-h-screen'>
      <div className='flex justify-end gap-5 pt-5 px-5'>
          <Link to="/admin/dashboard/addTeacher"><button className='bg-[#041643] text-white  py-1 hover:bg-slate-600 px-4 text-xl rounded-xl focus:outline-none focus:shadow-outline'>Add Another Teacher</button></Link>
          <Link to="/admin/dashboard"><button className='bg-[#041643] text-white  py-1 hover:bg-slate-600 px-4 text-xl rounded-xl focus:outline-none focus:shadow-outline'>Go To Dashboard</button></Link>
      </div>
    <div className='flex flex-col items-center justify-center gap-5 h-max py-14'>
      <h1 className='text-2xl mb-1'>List Of All Teachers</h1>
      {
        TeacherList.map((teacher)=>{
          return <TeacherCard teacher={teacher}/>
        })
      }  
    </div>
    </div>
  )
}

export default AdminGetTeacher