import React, { useState, useEffect, useContext} from 'react'
import axios from "axios"
import { userContext } from '../../App'
import {Toaster,toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import Loading from '../../Common/Loading'

const AdminAddStudent = () => {
    const navigate=useNavigate()
  const {admin}=useContext(userContext)
  const [loading,setloading]=useState(false);
  const handleSubmit=(e)=>{
    e.preventDefault()
    let form=new FormData(formElement)
    let formData={}
    for(let [key,value] of form.entries())
    {
        if(key==="fk_domain" || key=="mobile_number" || key=="roll_number" || key=="fk_group" )
        {
          formData[key]=parseInt(value)
        }
        else{
          formData[key]=value
        }
    }
     console.log(formData);
    const backurl=import.meta.env.VITE_BACKEND_URL
    setloading(true)
    axios.post(`${backurl}/api/student/signup`,formData,
        {
            headers:{
                Authorization: `Bearer ${admin.token}`
            }
        }
        )
        .then((res)=>{
            console.log(res)
            setloading(false)
            setTimeout(() => {
                navigate("/admin/dashboard/getStudent   ")
            }, 1000);
            toast.success(`Student Created Successfully`)
        })
        .catch((err)=>{
            setloading(false)
            console.log(err)
            toast.error(err.response.data.message)
        })
      }
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-[#B4C7ED] '>
        <h1 className='md:text-3xl text-2xl font-bold md:my-5 my-3'>Add New Student</h1>
        {loading && <Loading/>}
        <form id='formElement' className="bg-[#E8EDFA] shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-1 flex flex-col items-center justify-center">
            <div className="mb-1">
                <label className="block text-black md:text-xl text-lg font-bold mb-1" htmlFor="email">
                   First Name:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="Enter First Name"
                />
            </div>

            <div className="mb-1">
                <label className="block text-black md:text-xl text-lg font-bold mb-1" htmlFor="email">
                    Last Name:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Enter last Name"
                />
            </div>

            <div className="mb-1">
                <label className="block text-black md:text-xl text-lg font-bold mb-1" htmlFor="email">
                    Email:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                />
            </div>
            <div className="mb-1">
                <label className="block text-black md:text-xl text-lg font-bold mb-1" htmlFor="password">
                    Roll No:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="roll_number"
                    name="roll_number"
                    type="number"
                    placeholder="Roll Number"
                />
            </div>

            <div className="mb-1">
                <label className="block text-black md:text-xl text-lg font-bold mb-1" htmlFor="email">
                Mobile Number:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="mobile_number"
                    name="mobile_number"
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    placeholder="Mob. No"
                />
            </div>

            <div className="mb-1">
                <label className="block text-black md:text-xl text-lg font-bold mb-1" htmlFor="email">
                Registartion Number:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="reg_number"
                    name="reg_number"
                    type="text"
                    placeholder="Reg. No"
                />
            </div>

            {/* <div className="mb-1">
                <label className="block text-black text-xl font-bold mb-1" htmlFor="password">
                    Domain Id:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fk_domain"
                    name="fk_domain"
                    type="number"
                    placeholder="Domain"
                />
            </div>

            <div className="mb-1">
                <label className="block text-black text-xl font-bold mb-1" htmlFor="password">
                    Group Id:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fk_group"
                    name="fk_group"
                    type="number"
                    placeholder="Group"
                />
            </div> */}

            <div className="mb-1">
                <label className="block text-black md:text-xl text-lg font-bold mb-1" htmlFor="password">
                    Password:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                />
            </div>
            <button
                className="bg-black text-white font-bold py-1 hover:bg-slate-600 mt-4 px-6 md:text-2xl text-xl rounded-xl focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={handleSubmit}
            >
              Submit
            </button>        
        </form>
    </div>
  )
}

export default AdminAddStudent