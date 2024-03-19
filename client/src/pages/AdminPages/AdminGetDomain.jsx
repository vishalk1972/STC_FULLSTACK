import React, { useState, useEffect, useContext , useRef} from 'react'
import axios from "axios"
import { userContext } from '../../App'
import DomainCard from '../../components/DomainCard'
import Shimmer from '../../Common/Shimmer'
import { Link } from 'react-router-dom'
const AdminGetDomain = () => {
  // const navigate=useNavigate();
  const backurl=import.meta.env.VITE_BACKEND_URL
  const [DomainList,setDomainList]=useState(null)
  // console.log(admin,"->")
  const {admin}=useContext(userContext)
  useEffect(()=>{
      if(admin)
      {
        axios.get(`${backurl}/api/domain`,
        {
            headers:{
                Authorization: `Bearer ${admin.token}`
            }
        }
        )
        .then((res)=>{
            setDomainList(res.data.data);
            // console.log(DomainList)
        })
        .catch((err)=>{
            // console.log(err)
            // return toast.error(err.response)
        })
      }
  },[admin,DomainList])
  return (
    DomainList===null ? <Shimmer type="List Of All Domains" className="text-center w-[20%] h-12 flex items-center justify-between p-3 rounded-2xl shadow-xl bg-gradient-to-r from-[#80a8ff] to-[#c4d5f9]"/>:
    <div className='bg-[#d5e0fb] min-h-screen'>
      <div className='flex justify-end gap-5 md:pt-5 md:px-5 px-2 pt-1'>
          <Link to="/admin/dashboard/addDomain"><button className='bg-[#041643] text-white  py-1 hover:bg-slate-600 px-4 md:text-xl text-lg rounded-xl focus:outline-none focus:shadow-outline'>Add Domain</button></Link>
          <Link to="/admin/dashboard"><button className='bg-[#041643] text-white  py-1 hover:bg-slate-600 px-4 md:text-xl text-lg rounded-xl focus:outline-none focus:shadow-outline'>Dashboard</button></Link>
      </div>
      
    <div className='flex flex-col items-center justify-center gap-5 h-max py-14'>
      <h1 className='text-2xl font-semibold mb-1'>List Of All Domains</h1>
      {
        DomainList.map((Domain)=>{
          return <DomainCard key={Domain.id}  Domain={Domain}/>
        })
      }  
    </div>
    </div>
  )
}

export default AdminGetDomain