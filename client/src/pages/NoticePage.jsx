import React, { useContext, useState } from 'react'
import { userContext } from '../App';
import { useEffect } from 'react';
import axios from 'axios';


const NoticePage = () => {
  const {user}=useContext(userContext);
  const backurl=import.meta.env.VITE_BACKEND_URL
  const [NoticeFeched,setNoticeFeched]=useState([])
  useEffect(() => {
      if(user){
      let url = `${backurl}/api/${user?.type}Dashboard/getBroadcasts`;
      axios.get(url, {
          headers:{
              Authorization: `Bearer ${user?.token}`
          }
      })
      .then((res) => {
          setNoticeFeched(res.data.data);
          setloading(false);
      })
      .catch((err) => {
          setloading(false);
      });
  }
}, [user,NoticeFeched]);
  return (
    <div className="md:w-[30.5%]  w-[100%]  h-screen bg-[#E8EDFA] flex flex-col  items-center gap-7 mx-1 py-5 transition-transform duration-500 transform translate-x-0  relative" >
        {/* <div className='w-[40%] p-10 '> */}
            <h1 className='text-center text-3xl  my-2 font-semibold'>Notices</h1>
            {NoticeFeched.length==0 && <h1 className='text-center text-xl font-bold'>NO NEW NOTICES TO SHOW !!!!</h1>}
            <div className='top-0 h-[100%] left-0 right-0' style={{ overflowWrap: 'break-word', overflow:'auto' }}>
            {
                NoticeFeched.map((Notice)=>{
                    return <div className='bg-[#b4c7f7] shadow-md rounded-lg p-4 my-4 relative'>
                        <div className='text-center mr-10 '>
                            <h1 className='text-center text-2xl font-bold mb-2'>{Notice.title}</h1>
                            <p className='text-xl '>{Notice.message}</p>
                        </div>
                    </div>
                })
            }
            </div>
        {/* </div> */}
    </div>
  )
}

export default NoticePage