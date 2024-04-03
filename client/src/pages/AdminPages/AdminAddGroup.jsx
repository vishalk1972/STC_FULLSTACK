import React, { useState, useEffect, useContext} from 'react'
import axios from "axios"
import { userContext } from '../../App'
import {Toaster,toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import Loading from '../../Common/Loading'

const AdminAddGroup = () => {
  const {admin}=useContext(userContext)
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
  const handleSubmit=(e)=>{
    e.preventDefault();
    e.preventDefault()
    let form=new FormData(formElement)
    let formData={}
    for(let [key,value] of form.entries())
    {        
        if(key==="teacherId")
        {
            formData[key]=parseInt(value)
        }
        else{
            formData[key]=value
        }
      
    }
    //  console.log(formData);
     const backurl=import.meta.env.VITE_BACKEND_URL
     setLoading(true)
    axios.post(`${backurl}/api/group/create`,formData,
          {
              headers:{
                  Authorization: `Bearer ${admin.token}`
              }
          }
        )
        .then((res)=>{
            // console.log(res)
            setLoading(false)
            setTimeout(() => {
                navigate("/admin/dashboard/getGroup")
            }, 1000);
            toast.success(`Group Created Successfully`)
        })
        .catch((err)=>{
            setLoading(false)
            // console.log(err)
            toast.error(err.response.data.message)
        })
      }
  
  return (
    
    <div className='flex flex-col items-center justify-center h-screen bg-[#B4C7ED]'>
        {loading && <Loading/>}
        <h1 className='text-2xl font-bold my-5'>Add New Group</h1>
        <form id='formElement' className="bg-[#E8EDFA] shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col items-center justify-center">
            <div className="mb-2">
                <label className="block text-black text-xl font-bold mb-1" htmlFor="password">
                    Group Name:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="groupId"
                    name="groupId"
                    type="text"
                    placeholder="groupId"
                />
            </div>

            <div className="mb-2">
                <label className="block text-black text-xl font-bold mb-1" htmlFor="password">
                    Teacher Id:
                </label>
                <input
                    className="text-lg shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="teacherId"
                    name="teacherId"
                    type="text"
                    placeholder="teacherId"
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
  )
}

export default AdminAddGroup