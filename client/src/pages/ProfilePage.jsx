import React, { useState ,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../App'
import { removeFromLocal } from '../assests/local'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import Loading from '../Common/Loading'

const ProfilePage = ({type}) => {
   
    const [ChangePass,setChangePass]=useState(false)
    const {user,SetUser}=useContext(userContext)
    const backurl=import.meta.env.VITE_BACKEND_URL
    const [loading,setloading]=useState(false)
    const navigate=useNavigate();
    const handleLogout=()=>{
        setloading(true)
        axios.post(`${backurl}/api/${user.type}/logout`,{},
        {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        })
        .then((res)=>{
            setloading(false);
            console.log(res);
            removeFromLocal("user");
            setTimeout(() => {
                SetUser(null);
                navigate("/")
            }, 1000);
            return toast.success('Logout Successfully')
        })
        .catch((err)=>{
            setloading(false);
            return toast.error(err.response.data.message)
        })
    }
    console.log(user,"user in context")
  return (
    <>
    <div className="md:w-[30.5%]  w-[100%]  h-screen bg-[#E8EDFA] flex flex-col  items-center gap-7 mx-1 py-5 transition-transform duration-500 transform translate-x-0}" >
        {/* <Toaster/> */}
        {/* <h1 className='text-2xl mt-4'>PROFILE</h1> */}
        <img className='w-44 h-44 rounded-full shadow-2xl' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3IwnFoJ9Fw5d_q5rHVElUqeHTWeHTaWuIQ&usqp=CAU'></img>
        { user && <h2 className='text-xl font-bold'>{user.type==="student" ? user.student.first_name : user.teacher.name}</h2>}
        { user && <h2 className='text-xl font-extralight'>{user.type==="student" ? user.student.email : user.teacher.email}</h2>}
        {loading && <Loading/>}
        {/* { user && <h2 className='text-xl font-extralight'>Domain : {user.type==="student" ? user.student.domain_name : user.teacher.domain_name}</h2>} */}
        <h2 onClick={()=>setChangePass(x=>!x)} className='text-xl underline underline-offset-2 text-center cursor-pointer'>Change Password</h2>
        {
            ChangePass && <form className="shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                 <label className="block text-black text-lg font-extralight mb-1" htmlFor="password">
                   Old Password:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-1 px-2 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <label className="block text-black text-lg font-extralight mb-1" htmlFor="password">
                    New Password:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-1 px-2 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <label className="block text-black text-lg font-extralight mb-1" htmlFor="password">
                    Confirm New Password
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <h1 className='text-center translate-y-5 text-2xl  underline font-extralight cursor-pointer' onClick={()=>setChangePass(x=>!x)}>Submit</h1>
                </form>
        }
        <button onClick={handleLogout} className='text-xl bg-black text-white rounded-3xl px-5 py-2 cursor-pointer hover:bg-gray-600'>LogOut</button>
    </div>
    </>
  )
}

export default ProfilePage