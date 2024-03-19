import React, { useState, useEffect, useContext} from 'react'
import axios from "axios"
import { userContext } from '../../App'
import DomainCard from '../../components/DomainCard'
import Shimmer from '../../Common/Shimmer'
import TeacherCard from '../../components/TeacherCard'
import GroupCard from '../../components/GroupCard'
import { Link } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import { Toaster,toast } from 'react-hot-toast'
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
            // console.log(res)
            setGroupList(res.data.groups);
            // console.log(TeacherList)
        })
        .catch((err)=>{
            // console.log(err)
            // return toast.error(err.response)
        })
      }
  },[admin,GroupList])

  const handleDelete=(id)=>{
    if(admin && window.confirm("Are Your Sure ! You Want To Delete This Data"))
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
    GroupList===null ? <Shimmer type="List Of All Group" className="border-b-2 w-[18%] h-16 flex flex-col  p-4 rounded-2xl shadow-xl bg-gradient-to-r from-[#80a8ff] to-[#c4d5f9] gap-1"/>:
    <div className='bg-[#d5e0fb] min-h-screen'>
      <Toaster/>
      <div className='flex justify-end gap-5 pt-5 px-5'>
          {/* <Link to="/admin/dashboard/addGroup"><button className='bg-[#041643] text-white  py-1 hover:bg-slate-600 px-4 text-xl rounded-xl focus:outline-none focus:shadow-outline'>Add Another Group</button></Link> */}
          <Link to="/admin/dashboard"><button className='bg-[#041643] text-white  py-1 hover:bg-slate-600 px-4 text-xl rounded-xl focus:outline-none focus:shadow-outline'>Dashboard</button></Link>
      </div>
    <div className='flex flex-col items-center justify-center gap-5 h-max py-14'>
      
      {
         GroupList.length>0 ? <h1 className='text-2xl font-semibold mb-1'>List Of All Group</h1>:""
      }
      {
        GroupList.length==0 ? <h1 className='text-3xl '>No Groups To Show</h1> :
      <div className='md:flex md:justify-center md:items-center my-1 min-w-screen mx-2'>
        <table className="border rounded-xl bg-[#e9ebf0]">
          <thead className=''>
            <tr className='bg-[#4076fe] text-gray-50'> 
              <th className="border-b border-r-2 border-gray-300 md:p-4 p-2 md:text-2xl text-xl">Id</th>
              <th className="border-b border-r-2 border-gray-300 md:p-4 p-2 md:text-2xl text-xl">Teacher</th>
              <th className="border-b border-r-2 border-gray-300  md:p-4 p-2 md:text-2xl text-xl">Group Name</th>
              <th className="border-b border-r-2 md:p-4 p-2 border-gray-300 md:text-2xl text-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {GroupList.map(({id,fk_teacher,group_name},index) => (
              <tr key={id} className={`${index%2==0 ? "bg-gray-100" :"bg-[#bed0fd]"}`}> 
                <td className="border-b border-r-2 border-gray-400  md:p-6 p-2 md:text-xl text-lg">{id}</td>
                <td className="border-b border-r-2 border-gray-400  md:p-4 p-2 md:text-xl text-lg ">{fk_teacher}</td>
                <td className="border-b border-r-2 border-gray-400  md:p-4 p-2 md:text-xl text-lg">{group_name.toUpperCase()}</td>
                <td className="border-b border-r-2 border-gray-400  md:p-8 p-2 md:text-xl text-lg "><RiDeleteBin6Line className='cursor-pointer' onClick={() => handleDelete(id)} /></td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
}
    </div>
    </div>
  )
}

export default AdminGetGroup