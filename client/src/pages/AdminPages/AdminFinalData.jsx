import React, { useContext, useState } from 'react'
import axios from 'axios'
import { userContext } from '../../App'
import { useEffect } from 'react'

const AdminFinalData = () => {
  const [dataList,setDataList]=useState([])
  const backurl=import.meta.env.VITE_BACKEND_URL
  const {admin}=useContext(userContext)

  const fileDownload = (link) => {
    let link_clean = link.slice(2, -2);
    const isEdge = window.navigator.userAgent.includes("microsoft-edge");
    if (isEdge) {
      window.location.href = link_clean; 
    } else {
      window.open(link_clean, '_blank');
    }
  }

  useEffect(()=>{
    if(admin)
    {
      axios.get(`${backurl}/api/adminDashboard/getAbstract`,
      {
          headers:{
              Authorization: `Bearer ${admin.token}`
          }
      }
      )
      .then((res)=>{
          setDataList(res.data.data);
          // console.log(res)
      })
      .catch((err)=>{
          // console.log(err)
          // return toast.error(err.response)
      })
    }
},[admin,dataList])
  return (
    <div className='min-h-screen bg-[#e8effd] p-8'>
        { dataList.length===0 ? <h1 className='text-3xl text-center '>There are No Final Documents Available</h1>:
        <div className='flex flex-col justify-center items-center mt-10'>
            <h1 className='text-2xl mb-4 font-semibold'>Final Abstract's Uploaded</h1>
            <table className="border rounded-xl bg-[#e9ebf0]">
                <thead className=''>
                    <tr className='bg-[#4076fe] text-gray-50'> 
                    <th className="border-b border-r-2 border-gray-300 md:p-4 p-2 md:text-2xl text-xl">Sr</th>
                    <th className="border-b border-r-2 border-gray-300 md:p-4 p-2 md:text-2xl text-xl">Group Id</th>
                    <th className="border-b border-r-2 border-gray-300 md:p-4 p-2 md:text-2xl text-xl">Download</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map(({ id,fk_group,data, },index) => (
                    <tr key={id} className={`${index%2==0 ? "bg-gray-100" :"bg-[#bed0fd]"}`}> 
                    <td className="border-b border-r-2 border-gray-400  md:p-6 p-2 md:text-xl text-lg">{index+1}</td>
                        <td className="border-b border-r-2 border-gray-400  md:p-8 md:text-xl text-lg ">{fk_group}</td>
                        <td onClick={()=>fileDownload(data)} className="border-b border-r-2 border-gray-400  md:p-4 p-2 md:text-xl text-lg underline text-blue-400 cursor-pointer">Download</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    }
    </div>
  )
}

export default AdminFinalData