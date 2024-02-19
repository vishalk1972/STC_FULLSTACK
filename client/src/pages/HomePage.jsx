import React, { useContext, useEffect, useState } from 'react'
import loginLogo from "../assests/loginLogo.jpg"
import { IoChevronBackCircle } from "react-icons/io5"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { storeInLocal } from '../assests/local'
import { userContext } from '../App'
import Loading from '../Common/Loading'
import { Toaster,toast } from 'react-hot-toast'

const HomePage = ({type}) => {
    const {user,SetUser}=useContext(userContext)
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate();
    useEffect(()=>{
        if(user && user.token)
        {
            navigate(`/${user.type}/chat`)
        }
    },[])
    function handleSubmit(e){
        e.preventDefault()
        let form=new FormData(formElement)
        let formData={}
        for(let [key,value] of form.entries())
        {
            formData[key]=value
        }
        console.log(formData);
        const backurl=import.meta.env.VITE_BACKEND_URL
        setLoading(true)
        axios.post(`${backurl}/api/${type}/login`,formData)
        .then((res)=>{
            console.log(res,"called")
            setLoading(false)
            const finalData={...res.data.data,type:type}
            storeInLocal("user",JSON.stringify(finalData))
            SetUser(finalData);
        })
        .catch((err)=>{
            setLoading(false)
            toast.error(err.response.data.message)
            console.log(err);
        })
    }
  return (
   user && user.token ?  navigate(`/${user.type}/chat`) :
    <div className='h-screen '>
        <div className='flex h-full'>
            <img className='md:w-6/12 hidden md:block' src={loginLogo}/>
            {
                type ? 
                <div className='bg-slate-300 md:w-6/12 w-full flex flex-col justify-center items-center gap-16'>
                    <Toaster/>
                    {loading && <Loading/>}
                    <h1 className='text-4xl font-semibold'>{type.substring(0, 1).toUpperCase() + type.substring(1)}</h1>
                    <form id='formElement' className="bg-slate-200 shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-black text-2xl font-bold mb-2" htmlFor="email">
                                Email:
                            </label>
                            <input
                                className="text-xl shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Email"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-black text-2xl font-bold mb-2" htmlFor="password">
                                Password:
                            </label>
                            <input
                                className="text-xl shadow appearance-none border rounded w-full py-4 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                        </div>

                        
                        <button
                            className="bg-black text-white font-bold py-2 hover:bg-slate-600 mt-4 px-6 text-2xl rounded-xl focus:outline-none focus:shadow-outline"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        
                    </form>
                    <Link to="/">
                        <button className='text-xl'>
                            <IoChevronBackCircle className='w-12 h-12'/>Back
                        </button>
                    </Link>
                    
                </div>
                : <div className='bg-slate-300 md:w-6/12 w-full flex flex-col justify-center items-center gap-16 relative'>
                    <Link className='mb-auto ml-auto' to="/admin">
                            <button className='text-xl font-medium bg-grey rounded-lg px-5 py-2 cursor-pointer  hover:underline' >Admin Click Here</button>
                     </Link>
                     <div className='flex flex-col justify-center items-center mb-auto gap-16'>
                        <h1 className='text-4xl font-semibold '>LOGIN</h1>
                        <div className='flex gap-10'>
                            <Link to="/teacher">
                                <button className='text-2xl bg-black text-white rounded-lg px-5 py-2 cursor-pointer hover:bg-gray-600' >Teacher</button>
                            </Link>
                            <Link to="/student">
                                <button className='text-2xl bg-black text-white rounded-lg px-5 py-2 cursor-pointer hover:bg-gray-600'>Student</button>
                            </Link>
                        </div>
                    </div>
                 </div>
            }
        </div>
        
    </div>
  )
}

export default HomePage