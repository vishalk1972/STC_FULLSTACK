import React, { useState, useEffect, useContext} from 'react'
import axios from "axios"
import { userContext } from '../../App'
import DomainCard from '../../components/DomainCard'
import Shimmer from '../../Common/Shimmer'
import TeacherCard from '../../components/TeacherCard'
import GroupCard from '../../components/GroupCard'
import { Link } from 'react-router-dom'
const AdminGetGroup = ()=> {
  // const navigate=useNavigate();
  const backurl=import.meta.env.VITE_BACKEND_URL
  const [GroupList,setGroupList]=useState(null)
  // console.log(admin,"->")
  // console.log(GroupList)
  const {admin}=useContext(userContext)
  useEffect(()=>{
      if(admin)
      {
        axios.get(`${backurl}/api/group`,
        {
            headers:{
                Authorization: `Bearer ${admin.token}`
            }
        }
        )
        .then((res)=>{
            console.log(res)
            setGroupList(res.data.groups);
            // console.log(TeacherList)
        })
        .catch((err)=>{
            // console.log(err)
            // return toast.error(err.response)
        })
      }
  },[admin,GroupList])
  return (
    GroupList===null ? <Shimmer type="List Of All Group" className="border-b-2 w-[18%] h-16 flex flex-col  p-4 rounded-2xl shadow-xl bg-gradient-to-r from-[#80a8ff] to-[#c4d5f9] gap-1"/>:
    <div className='bg-[#d5e0fb] min-h-screen'>
      <div className='flex justify-end gap-5 pt-5 px-5'>
          <Link to="/admin/dashboard/addGroup"><button className='bg-[#041643] text-white  py-1 hover:bg-slate-600 px-4 text-xl rounded-xl focus:outline-none focus:shadow-outline'>Add Another Group</button></Link>
          <Link to="/admin/dashboard"><button className='bg-[#041643] text-white  py-1 hover:bg-slate-600 px-4 text-xl rounded-xl focus:outline-none focus:shadow-outline'>Go To Dashboard</button></Link>
      </div>
    <div className='flex flex-col items-center justify-center gap-5 h-max py-14'>
      <h1 className='text-2xl font-semibold mb-1'>List Of All Group</h1>
      {
        GroupList.map((group)=>{
          return <GroupCard group={group}/>
        })
      }  
    </div>
    </div>
  )
}

export default AdminGetGroup