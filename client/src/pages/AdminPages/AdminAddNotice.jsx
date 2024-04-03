import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { userContext } from '../../App';
import { Toaster,toast } from 'react-hot-toast';
import Loading from '../../Common/Loading';
import { MdDelete } from "react-icons/md";
const AdminAddNotice = () => {
    const [Title,setTitle]=useState();
    const [Post,setPost]=useState()
    const [loading,setloading]=useState(false)
    const backurl=import.meta.env.VITE_BACKEND_URL
    const [NoticeFeched,setNoticeFeched]=useState([])
    const {admin}=useContext(userContext);
    const formData={};
    formData['title']=Title
    formData['message']=Post
    // console.log(admin?.token)
    const PostNotice=()=>{
        setloading(true)
        axios.post(`${backurl}/api/adminDashboard/createBroadcast`,formData,
            {
                headers:{
                    Authorization: `Bearer ${admin.token}`
                }
            }
            )
            .then((res)=>{
                setPost("");
                setTitle("")
                // console.log(res)
                setloading(false)
                toast.success(`Notice Sent Succesfully`)
            })
            .catch((err)=>{
                setloading(false)
                // console.log(err)
                toast.error(err.response.data.message)
            })
    }
    useEffect(() => {
        let url = `${backurl}/api/adminDashboard/getBroadcasts`;
        // setloading(true);
        axios.get(url, {
            headers:{
                Authorization: `Bearer ${admin?.token}`
            }
        })
        .then((res) => {
            setNoticeFeched(res.data.data);
            // console.log(res);
            setloading(false);
        })
        .catch((err) => {
            setloading(false);
            // console.log(err);
        });
    }, [admin,NoticeFeched]);
    const handleDelete=(delNoticeId)=>{
        if(window.confirm("Are You Sure ! You Want To Delete this Notice")){
        axios.delete(`${backurl}/api/adminDashboard/deleteBroadcast/${delNoticeId}`,
            {
                headers:{
                    Authorization: `Bearer ${admin.token}`
                }
            }
            )
            .then((res)=>{
                // console.log(res)
                setloading(false)
                toast.success(`Notice Deleted Successfully!!!`)
            })
            .catch((err)=>{
                setloading(false)
                // console.log(err)
                toast.error(err.response.data.message)
            })
        }
    }
  return (
    <>
     {loading && <div className=''><Loading/></div>}
    <div className='bg-[#d5e0fb] min-h-screen flex '>
        <div className='w-[60%] p-10 border-r-2 border-gray-600'>
           
            <Toaster/>
            <h1 className='text-center text-2xl my-7 font-semibold'>Create A Notice </h1>
            <input 
                className='block rounded-full w-full py-4 px-4 text-xl border-x shadow-md' 
                type='text' 
                placeholder='Title Of Notice........'
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
            >
            </input>
            <textarea
            className='rounded-lg w-full py-4 px-4 text-xl mt-2'
            type='text'
            placeholder='Enter your Post.....'
            rows={20}
            value={Post}
            onChange={(e) => setPost(e.target.value)}
          />
          <button onClick={PostNotice} className='bg-[#01081c] text-white py-2 text-xl px-4 hover:bg-[#041952] rounded-xl mt-2'>POST NOTICE</button>
        </div>
        <div className='w-[40%] p-10 '>
            <h1 className='text-center text-2xl my-7 font-semibold'>Previous Notices</h1>
            {NoticeFeched.length==0 && <h1 className='text-center text-xl font-bold'>NO NEW NOTICES TO SHOW !!!!</h1>}
            <div className='w-full' style={{ overflowWrap: 'break-word' }}>
            {
                NoticeFeched.map((Notice)=>{
                return <div className='bg-[#b4c7f7] shadow-md rounded-lg p-4 my-4 relative whitespace-pre-line '>
                        <div className=' absolute ml-auto block right-4 cursor-pointer'>
                            <MdDelete onClick={()=>handleDelete(Notice.id)} className='h-8 w-8 block' />
                        </div>
                        <div className='text-center mr-10 '>
                            <h1 className='text-center text-2xl font-bold mb-2'>{Notice.title}</h1>
                            <p className='text-xl '>{Notice.message}</p>
                        </div>
                    </div>
                })
            }
            </div>
        </div>
    </div>
    </>
  )
}

export default AdminAddNotice