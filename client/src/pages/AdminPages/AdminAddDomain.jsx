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
    const [domain,setdomain]=useState('')
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
    <div className='flex flex-col items-center py-20  gap-5 bg-[#B4C7ED] h-screen'>
        <Toaster/>
        {loading && <Loading/>}
        <h1 className='md:text-3xl text-2xl font-bold my-5'>Add New Domain</h1>
        <form id='formElement' className="bg-[#E8EDFA] shadow-2xl rounded-lg px-8 pt-6  pb-8 mb-4 flex flex-col md:w-[25%]  md:mx-auto mx-4">
            <div className="mb-4">
                <label className="block text-black md:text-2xl text-xl font-bold mb-2 md:mx-0" htmlFor="email">
                    Domain Name:
                </label>
                <input
                    className="md:text-xl text-lg shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="domain_name"
                    name="domain_name"
                    type="text"
                    value={domain}
                    onChange={()=>setdomain(e.target.value)}
                    placeholder="Name of Domain"
                    required
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
  )
}

export default AdminAddDomain