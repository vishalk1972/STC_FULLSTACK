import React, { useContext} from 'react'
import axios from "axios"
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../App';
import {Toaster,toast} from "react-hot-toast"
const DomainCard = ({Domain}) => {
  const navigate=useNavigate();
  const backurl=import.meta.env.VITE_BACKEND_URL
  const {admin}=useContext(userContext)
  const {id,domain_name}=Domain;
  
  //////
  const handleDelete=(domain_name)=>{
    const data={}
    data["domain_name"]=domain_name;
    console.log(data)
    if(admin)
      {
        axios.delete(`${backurl}/api/domain/delete/${domain_name}`,
        {
            headers:{
                Authorization: `Bearer ${admin.token}`
            }
        }
        )
        .then((res)=>{
            console.log(res)
            setTimeout(() => {
              return toast.success(`${domain_name} Deleted Successfully`)
            }, 1000);  
        })
        .catch((err)=>{

            console.log(err)
            return toast.error(err.response)
        })
      }

  }
  return (
    <>
    <Toaster/>
    <div className='text-center border-b-2 w-[20%] flex items-center justify-between p-3 rounded-2xl shadow-xl bg-gradient-to-r from-slate-400 to-slate-300' >
        <h1>{id}</h1>
        <h1 className='mx-auto text-xl'>{domain_name}</h1>
        <div className='text-xl cursor-pointer' onClick={()=>handleDelete(domain_name)}>
            <RiDeleteBin6Line/>
        </div>
        
    </div>
    </>
  )
}

export default DomainCard