import React, { useState, useEffect, useContext} from 'react'
import axios from "axios"
import { userContext } from '../../App'
import {Toaster,toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import Loading from '../../Common/Loading'
const AdminAddTeacher = () => {
  const designations=["Professor","Asscoiate Professor","Assistant Professor","Adjunct Faculty"]
  const [designation,setDesignation]=useState("Professor");
  const navigate=useNavigate()
  const {admin}=useContext(userContext)
  const [loading,setLoading]=useState(false);
  const backurl=import.meta.env.VITE_BACKEND_URL
  const handleSubmit=(e)=>{
    e.preventDefault()
    let form=new FormData(formElement)
    let formData={}
    for(let [key,value] of form.entries())
    {
        if(key==="fk_domain")
        {
          formData[key]=parseInt(value)
        }
        else{
          formData[key]=value
        }
    }
    formData['designation']=designation
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
            // console.log(res)
            setLoading(false)
            setTimeout(() => {
                navigate("/admin/dashboard/getTeacher")
            }, 1000);
            toast.success(`Teacher Created Successfully`)
        })
        .catch((err)=>{
            setLoading(false)
            // console.log(err)
            toast.error(err.response.data.message)
        })
    }
    const handleBannerUpload = (e) => {
        let file = e.target.files[0];
        const formData = {}
        formData["file"] = file;
        // const backurl=import.meta.env.VITE_BACKEND_URL
        let url = `${backurl}/api/csv/teachers/csv`
        console.log(formData)
        axios.post(url, formData, {
          headers: {
            Authorization: `Bearer ${admin?.token}`,
            "Content-Type ": "multipart/form-data"
          }
        })
          .then((res) => {
            console.log(res);
            toast.success(res.data.message || "Teachers Added Through CSV Successfully......")
          })
          .catch((err) => {
            toast.error(err.response.data.message)
          })
    
      }
  
  return (
    <>
    
    <Toaster/>
    <div className='flex flex-col items-center justify-center h-screen bg-[#B4C7ED] '>
        {loading && <Loading/>}
        <h1 className='md:text-3xl text-2xl font-bold md:my-5 my-3'>Add New Teacher / <span className='cursor-pointer hover:underline rounded-xl p-1'><label className='cursor-pointer' htmlFor="uploadBanner">
          {/* <TiAttachmentOutline className='w-9 h-9 cursor-pointer' /> */}Upload CSV
          <input
            id="uploadBanner"
            type="file"
            // accept=".png, .jpg, .jpeg, .pdf, .ppt, .pptx, .doc, .docx"
            // accept=".csv"
            onChange={handleBannerUpload}
            hidden
          />
        </label>
        </span>
        </h1>
        <form id='formElement' className="bg-[#E8EDFA] shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col items-center justify-center">
            <div className="mb-2">
                <label className="block text-black md:text-xl text-lg font-bold mb-1" htmlFor="email">
                    Name:
                </label>
                <input
                    className="md:text-lg text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                />
            </div>

            <div className="mb-2">
                <label className="block text-black md:text-xl text-lg font-bold mb-1" htmlFor="email">
                    Email:
                </label>
                <input
                    className="md:text-lg text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                />
            </div>

            <div className="mb-2">
                <label className="block text-black md:text-xl text-lg font-bold mb-1" htmlFor="mobile_number">
                    Mobile Number:
                </label>
                <input
                    className="md:text-lg text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="mobile_number"
                    name="mobile_number"
                    type="number"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    placeholder="Mob. No"
                />
            </div>

            <div className="mb-2">
                <label className="block text-black md:text-xl text-lg font-bold mb-1" htmlFor="email">
                    Registartion Number:
                </label>
                <input
                    className="md:text-lg text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="reg_number"
                    name="reg_number"
                    type="text"
                    placeholder="Reg. No"
                />
            </div>

            <div className='mb-2 flex flex-col mr-auto w-full'>
                <label className="text-black md:text-xl text-lg font-bold mb-1">
                    Select Designation:
                </label>
                <select
                    className="px-1 py-2 md:text-lg text-sm bg-gray-100 cursor-pointer outline-none"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}    
                >
                    {designations.map((des) => (
                    <option key={des} value={des}>
                        {des}
                    </option>
                    ))}
                </select>
            </div>

            <div className="mb-2">
                <label className="block text-black md:text-xl text-lg font-bold mb-1" htmlFor="password">
                    Password:
                </label>
                <input
                    className="md:text-lg text-sm shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                />
            </div>
            <button
                className="bg-[#042058] text-white font-bold py-2 hover:bg-slate-600 mt-4 px-6 md:text-2xl text-xl rounded-xl focus:outline-none focus:shadow-outline"
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