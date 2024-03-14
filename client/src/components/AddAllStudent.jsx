import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { userContext } from '../App'
import { Toaster,toast } from 'react-hot-toast'
import Loading from '../Common/Loading'
import { useNavigate } from 'react-router-dom'
import { IoChevronBackCircle } from "react-icons/io5"
// import axios from 'axios'
import { removeFromLocal } from '../assests/local'
const AddAllStudent = () => {

  const [loading,setloading]=useState(false)
  const [selectedSize,setSelectedSize]=useState(1);
  const {user,SetUser}=useContext(userContext)
  const backurl=import.meta.env.VITE_BACKEND_URL
  const [DomainList,setDomainList]=useState([])
  const [selectedDomain,setSelectedDomain]=useState()
  const optionList=[2,3];
  const navigate=useNavigate()
  console.log(selectedDomain,"ganja")

  useEffect(()=>{
    if(user)
    {
        axios.get(`${backurl}/api/domain/student`,
        {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }
        )
        .then((res)=>{
            console.log(res)
            setDomainList(res.data.data);
        //   console.log(DomainList)
        })
        .catch((err)=>{
            console.log(err)
            // return toast.error(err.response)
        })
    }
  },[user])

  const handleSubmit=(e)=>{
    e.preventDefault();
    let form=new FormData(formElement)
    let formData={}
    for(let [key,value] of form.entries())
    {        
        if(key==="domain_id")
        {
            formData[key]=value
        }
        else{
            formData[key]=value
        }
    }
    const updatedForm={};
    if(selectedSize==2)
    {
        updatedForm['remaining_roll_numbers']=[formData.roll2];
    }
    else if(selectedSize==3){
        updatedForm['remaining_roll_numbers']=[formData.roll2,formData.roll3];
    }
    updatedForm['domain_id']=selectedDomain;
     console.log(updatedForm);
     const backurl=import.meta.env.VITE_BACKEND_URL
     setloading(true)
     axios.post(`${backurl}/api/group/create`,updatedForm,
        {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }
        )
        .then((res)=>{
            console.log(res)
            setloading(false)
            setTimeout(() => {
                navigate("/student/chat")
            }, 1000);
            toast.success(res.data.message)
        })
        .catch((err)=>{
            setloading(false)
            console.log(err)
            toast.error(err.response.data.message)
        })
  }
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
    <div className=" h-screen bg-[#B4C7ED]">
    <div className='flex justify-end p-2'>
     <button onClick={handleLogout} className='text-xl bg-black text-white rounded-3xl px-5 py-2 cursor-pointer ml-auto hover:bg-gray-600'>LogOut</button>
    </div>
    <div className='flex flex-col items-center justify-center mt-20 bg-[#B4C7ED]'>
        <h1 className='text-3xl font-bold my-5'>Create Group </h1>
        <Toaster/>
        {/* <Loading/> */}
        {loading && <Loading/>}
        <form id='formElement' className="bg-[#E8EDFA] shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col items-center justify-center">
            <div className='mb-2 w-full'>
                    
                    <select
                        className={`px-1 py-2 w-full text-xl bg-[#e8effd] outline-none rounded-lg shadow-lg hover:bg-white`}
                        // value={selectedTeacher}
                        onChange={(e) =>{setSelectedSize(e.target.value);console.log(e.target.value,"->>>")}}    
                    >
                    <option value="" >Select Size Of Group</option>
                    {optionList!==null && optionList.map((option) => (
                        <option key={option} value={option}  className=" bg-[#e8effd] shadow-xl ">
                            {option}    
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-2 w-full">
                <label className="block  text-black text-xl font-bold mb-1" htmlFor="password">
                    Student 1:
                </label>
                <input
                    className="text-lg w-full shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-not-allowed"
                    id="roll1"
                    name="roll1"
                    type="text"
                    disabled
                    placeholder={user?.student?.roll_number}
                />
            </div>

            <div className={`mb-2 w-full`}>
                <label className="block text-black text-xl font-bold mb-1" htmlFor="password">
                    Student 2:
                </label>
                <input
                    className="text-lg  shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="roll2"
                    name="roll2"
                    type="text"
                    required
                    placeholder="Roll No. of student 2"
                />
            </div>

            <div className={`${selectedSize<3 ? " hidden" : ""  } mb-2 w-full`}>
                <label className="block text-black text-xl font-bold mb-1" htmlFor="password">
                    Student 3:
                </label>
                <input
                    className="text-lg shadow appearance-none border w-full rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="roll3"
                    name="roll3"
                    type="text"
                    placeholder="Roll No. of student 3"
                />
            </div>       
            <div className="mt-2 mb-2 flex w-full">
                <select
                    className="py-2 w-full text-xl bg-[#e8effd] cursor-pointer outline-none rounded-lg shadow-lg hover:bg-white "
                    value={selectedDomain}
                    onChange={(e) =>{setSelectedDomain(e.target.value);console.log(e.target.value,"->>>")}}    
                >
                    {
                        selectedDomain ? <option value="" disabled >All Domains</option> :
                        <option value="" >Select Domain</option>
                    }
                    {DomainList.map((domain) => (
                        <option key={domain.id} value={domain.id} className=" bg-[#e8effd] shadow-xl">
                            {domain.domain_name}{` (${domain.id})`}
                        </option>
                    ))}
                </select>
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
    </div>
  )
}

export default AddAllStudent