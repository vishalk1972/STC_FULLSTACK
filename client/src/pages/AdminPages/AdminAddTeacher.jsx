import React, { useState, useEffect, useContext} from 'react'
import axios from "axios"
import { userContext } from '../../App'
import {Toaster,toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import Loading from '../../Common/Loading'
const AdminAddTeacher = () => {
  const navigate=useNavigate()
  const {admin}=useContext(userContext)
  const [loading,setLoading]=useState(false);
  const handleSubmit=(e)=>{
    e.preventDefault()
    let form=new FormData(formElement)
    let formData={}
    for(let [key,value] of form.entries())
    {
        if(key==="fk_domain" || key=="mobile_number")
        {
          formData[key]=parseInt(value)
        }
        else{
          formData[key]=value
        }
    }
     console.log(formData);
    const backurl=import.meta.env.VITE_BACKEND_URL
    setLoading(true)
    axios.post(`${backurl}/api/teacher/signup`,formData,
        {
            headers:{
                Authorization: `Bearer ${admin.token}`
            }
        }
        )
        .then((res)=>{
            console.log(res)
            setLoading(false)
            setTimeout(() => {
                navigate("/admin/dashboard/getTeacher")
            }, 1000);
            toast.success(`Teacher Created Successfully`)
        })
        .catch((err)=>{
            setLoading(false)
            console.log(err)
            toast.error(err.response.data.message)
        })
      }
  
  return (
    <>
    {loading && <Loading/>}
    <Toaster/>
    <div className='flex flex-col items-center justify-center h-screen bg-slate-300 '>
        
        <h1 className='text-2xl font-bold my-5'>Add New Teacher</h1>
        <form id='formElement' className="bg-slate-200 shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col items-center justify-center">
            <div className="mb-2">
                <label className="block text-black text-xl font-bold mb-1" htmlFor="email">
                    Name:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                />
            </div>

            <div className="mb-2">
                <label className="block text-black text-xl font-bold mb-1" htmlFor="email">
                    Email:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                />
            </div>

            <div className="mb-2">
                <label className="block text-black text-xl font-bold mb-1" htmlFor="email">
                Mobile Number:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="mobile_number"
                    name="mobile_number"
                    type="number"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    placeholder="Mob. No"
                />
            </div>

            <div className="mb-2">
                <label className="block text-black text-xl font-bold mb-1" htmlFor="email">
                Registartion Number:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="reg_number"
                    name="reg_number"
                    type="text"
                    placeholder="Reg. No"
                />
            </div>

            <div className="mb-2">
                <label className="block text-black text-xl font-bold mb-1" htmlFor="password">
                    Domain Id:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fk_domain"
                    name="fk_domain"
                    type="number"
                    placeholder="Domain"
                />
            </div>

            <div className="mb-2">
                <label className="block text-black text-xl font-bold mb-1" htmlFor="password">
                    Password:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
    </div>
    </>
  )
}

export default AdminAddTeacher