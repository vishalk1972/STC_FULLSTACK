import React, { useState , useContext, useEffect} from 'react'
import { userContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { storeInLocal } from '../../assests/local';
import Loading from '../../Common/Loading';
import { Toaster,toast } from 'react-hot-toast';
import { IoChevronBackCircle } from "react-icons/io5"

const HomePageAdmin = () => {
    const navigate=useNavigate();
    const {admin,SetAdmin}=useContext(userContext);
    const [loading,setloading]=useState(false)
    // console.log(admin,"admin in context")
    useEffect(()=>{
        if(admin && admin.token)
        {
            navigate("/admin/dashboard")
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
    // console.log(formData);
    const backurl=import.meta.env.VITE_BACKEND_URL
    setloading(true);
    axios.post(`${backurl}/api/admin/login`,formData)
    .then((res)=>{
       setloading(false);
        // console.log(res,"ca lled")
        const finalData={...res.data.data,type:"admin"}
        storeInLocal("admin",JSON.stringify(finalData))
        SetAdmin(finalData);
    })
    .catch((err)=>{
        setloading(false);
        toast.error(err.response.data.message)
        // console.log(err);
    })
}
  return (
    admin && admin.token ?  navigate(`/admin/dashboard`) :
    <div className='flex flex-col h-screen justify-center items-center gap-10 bg-[#B4C7ED]'>
        <Toaster/>
        {loading && <Loading/>}
        <h1 className='text-3xl font-bold'>ADMIN LOGIN</h1>
        <form id='formElement' className="bg-[#EAF0FA] shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 ">
            <div className="mb-4">
                <label className="block text-black text-2xl font-bold mb-2" htmlFor="email">
                    Username:
                </label>
                <input
                    className="text-xl shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="username"
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
  )
}

export default HomePageAdmin