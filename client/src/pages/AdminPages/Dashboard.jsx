import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { removeFromLocal } from '../../assests/local'
import { userContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Toaster,toast } from 'react-hot-toast'
import Loading from '../../Common/Loading'

const Dashboard = () => {
    const {admin,SetAdmin}=useContext(userContext);
    const backurl=import.meta.env.VITE_BACKEND_URL
    const [loading,setloading]=useState(false);
    const navigate=useNavigate();
    const Logout=()=>{
        setloading(true)
        axios.post(`${backurl}/api/admin/logout`,{},
        {
            headers:{
                Authorization: `Bearer ${admin.token}`
            }
        })
        .then((res)=>{
            setloading(false);
            console.log(res);
            removeFromLocal("admin");
            SetAdmin(null);
            setTimeout(() => {
                navigate("/")
            }, 1000);
            toast.success('Logout Successfully')
        })
        .catch((err)=>{
            setloading(false);
            toast.error(err.response.data.message)
        })
    }
  return (
    <>
    <Toaster/>
    <div className='flex justify-end pr-10 pt-10'><button onClick={Logout} className='bg-black text-white font-semibold py-2 hover:bg-slate-600 px-6 text-xl rounded-xl focus:outline-none focus:shadow-outline'>LOGOUT</button></div>
    <h1 className='text-center text-3xl font-bold pt-8 text-gray-800 from-neutral-200   '>ADMIN DASHBOARD</h1>
    <div className='flex flex-wrap gap-10 justify-center items-center my-20'>
    {   loading && <Loading/>}
        <Link className='w-[20%] h-48 rounded-2xl shadow-2xl bg-gradient-to-r from-slate-400 to-slate-300 hover:scale-105 flex justify-center items-center text-3xl text-purple-950 font-semibold' to="addDomain">
            <div >
                Add Domain
            </div>
        </Link>
        <Link className='w-[20%] h-48 rounded-2xl shadow-2xl bg-gradient-to-r from-slate-400 to-slate-300 hover:scale-105 flex justify-center items-center text-3xl text-purple-950 font-semibold' to="addTeacher">
            <div >
                Add Teacher
            </div>
        </Link>
        <Link className='w-[20%] h-48 rounded-2xl shadow-2xl bg-gradient-to-r from-slate-400 to-slate-300 hover:scale-105 flex justify-center items-center text-3xl text-purple-950 font-semibold' to="addGroup">
            <div >
                Add Group
            </div>
        </Link>
        <Link className='w-[20%] h-48 rounded-2xl shadow-2xl bg-gradient-to-r from-slate-400 to-slate-300 hover:scale-105 flex justify-center items-center text-3xl text-purple-950 font-semibold' to="addStudent">
            <div >
                Add Student
            </div>
        </Link>
        <Link className='w-[20%] h-48 rounded-2xl shadow-2xl bg-gradient-to-r from-slate-400 to-slate-300 hover:scale-105 flex justify-center items-center text-3xl text-purple-950 font-semibold' to="getDomain">
            <div >
                Get Domain
            </div>
        </Link>
        <Link className='w-[20%] h-48 rounded-2xl shadow-2xl bg-gradient-to-r from-slate-400 to-slate-300 hover:scale-105 flex justify-center items-center text-3xl text-purple-950 font-semibold' to="getTeacher">
            <div >
                Get Teacher
            </div>
        </Link>
        <Link className='w-[20%] h-48 rounded-2xl shadow-2xl bg-gradient-to-r from-slate-400 to-slate-300 hover:scale-105 flex justify-center items-center text-3xl text-purple-950 font-semibold' to="getGroup">
            <div >
                Get Group
            </div>
        </Link>
        <Link className='w-[20%] h-48 rounded-2xl shadow-2xl bg-gradient-to-r from-slate-400 to-slate-300 hover:scale-105 flex justify-center items-center text-3xl text-purple-950 font-semibold' to="getStudent">
            <div >
                Get Student
            </div>
        </Link>
    </div>
    </>
  )
}

export default Dashboard