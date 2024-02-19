import React, { useState , useContext} from 'react'
import { userContext } from '../../App';
import axios from "axios"
import {Toaster,toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import Loading from '../../Common/Loading';
const AdminAddDomain = () => {
    const navigate=useNavigate();
    const {admin,SetAdmin}=useContext(userContext);
    const [loading,setLoading]=useState(false)
    async function handleSubmit(e){
        e.preventDefault()
        let form=new FormData(formElement)
        let formData={}
        for(let [key,value] of form.entries())
        {
            formData[key]=value
        }
        console.log(formData);
        const backurl=import.meta.env.VITE_BACKEND_URL
        setLoading(true);
        axios.post(`${backurl}/api/domain/create`,formData,
            {
                headers:{
                    Authorization: `Bearer ${admin.token}`
                }
            }
        )
        .then((res)=>{
            setLoading(false)
            setTimeout(() => {
                navigate("/admin/dashboard/getDomain");
            }, 120);
            console.log(res)
            setTimeout(() => {
                return toast.success("Domain Added Successfully");
            }, 1);
           
        })
        .catch((err)=>{
            setLoading(false)
            console.log(err)
            toast.error(err.response.data.message)
        })
    }
  return (
    <div className='flex flex-col items-center py-20  gap-5 bg-gray-300 h-screen'>
        <Toaster/>
        {loading && <Loading/>}
        <h1 className='text-3xl font-bold my-5'>Add New Domain</h1>
        <form id='formElement' className="bg-slate-200 shadow-2xl rounded-lg px-8 pt-6  pb-8 mb-4 flex flex-col w-[25%]  mx-auto ">
            <div className="mb-4">
                <label className="block text-black text-2xl font-bold mb-2" htmlFor="email">
                    Domain Name:
                </label>
                <input
                    className="text-xl shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="domain_name"
                    name="domain_name"
                    type="text"
                    placeholder="Name of Domain"
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

export default AdminAddDomain