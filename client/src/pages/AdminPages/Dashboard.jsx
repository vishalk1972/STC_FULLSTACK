import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { removeFromLocal } from '../../assests/local'
import { userContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Toaster,toast } from 'react-hot-toast'
import Loading from '../../Common/Loading'

const Dashboard = () => {
    let cardclass="md:w-[20%] md:h-48 w-[90%] md:rounded-2xl rounded-xl shadow-2xl bg-gradient-to-r from-[#80a8ff] to-[#c4d5f9] hover:scale-105 flex justify-center items-center md:text-3xl text-2xl text-black font-semibold border-b-2 border-white "
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
            // console.log(res);
            removeFromLocal("admin");
            SetAdmin(null);
            setTimeout(() => {
                navigate("/")
            }, 100);
            toast.success('Logout Successfully')
            
        })
        .catch((err)=>{
            setloading(false);
            toast.error(err.response.data.message)
        })
    }
  return (
    <div className='bg-[#d5e0fb] min-h-screen'>
    <>
    <Toaster/>
    <div className='flex justify-end md:pr-10 pr-2 md:pt-10 pt-2 '><button onClick={Logout} className='bg-[#041643] text-white font-semibold md:py-2 py-1 hover:bg-slate-600 px-6 md:text-xl text-lg rounded-xl focus:outline-none focus:shadow-outline'>LOGOUT</button></div>
    <h1 className='text-center md:text-3xl text-2xl font-bold pt-3 md:mb-16   text-gray-800 from-neutral-200   '>ADMIN DASHBOARD</h1>
    <div className='flex flex-wrap md:gap-10 gap-4 justify-center items-center py-6'>
    {   loading && <Loading/>}
        {/* <div className='w-[20%] h-48 rounded-2xl shadow-2xl bg-gradient-to-r from-[#80a8ff] to-[#c4d5f9] hover:scale-105 flex justify-center items-center text-3xl text-black font-semibold'></div> */}
        <Link className={cardclass} to="addDomain">
            <div >
                Add Domain
            </div>
        </Link>
        <Link className={cardclass} to="addTeacher">
            <div >
                Add Teacher
            </div>
        </Link>
        {/* <Link className={cardclass} to="addGroup">
            <div >
                Add Group
            </div>
        </Link> */}
        <Link className={cardclass} to="addStudent">
            <div >
                Add Student
            </div>
        </Link>
        <Link className={cardclass} to="getDomain">
            <div >
                Get Domain
            </div>
        </Link>
        <Link className={cardclass} to="getTeacher">
            <div >
                Get Teacher
            </div>
        </Link>
        <Link className={cardclass} to="getGroup">
            <div >
                Get Group
            </div>
        </Link>
        <Link className={cardclass} to="getStudent">
            <div >
                Get Student
            </div>
        </Link>
        <Link className={cardclass} to="assign">
            <div >
                Assign Groups
            </div>
        </Link>
        <Link className={cardclass} to="assignDomain">
            <div >
                Assign Domain
            </div>
        </Link>
        <Link className={cardclass} to="addNotice">
            <div >
                Add Notice
            </div>
        </Link>
        <Link className={cardclass} to="getFinalData">
            <div >
                Final Report Data
            </div>
        </Link>
    </div>
    </>
    </div>
  )
}

export default Dashboard