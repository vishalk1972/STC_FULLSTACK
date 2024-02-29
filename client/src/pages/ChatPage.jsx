import React, {  useContext, useEffect, useState } from 'react';
import ProfilePage from './ProfilePage';
import Groups from '../components/Groups';
import { Link, useParams } from 'react-router-dom';
import ChatData from '../components/ChatData';
import ChatHeader from '../components/ChatHeader';
import { IoArrowBackSharp } from "react-icons/io5";
import axios from 'axios';
import { userContext } from '../App';

const ChatPage = () => {
   const [OpenProfile,setOpenProfile]=useState(false)
   const [Back,setBack]=useState(false)
   const [hideSide,sethideSide]=useState(false)
   const {user}=useContext(userContext)
   const [allGroups,setAllGroups]=useState()
  
   const backurl=import.meta.env.VITE_BACKEND_URL;
   const {id}=useParams();
   
      useEffect(()=>{

            // axios.get(`${backurl}/api/${user?.type}Dashboard/${user?.type}Groups`,
            // {
            //    headers:{
            //       Authorization:`Bearer ${user?.token}`
            //    }
            // })
            // .then((res)=>{
            //    console.log(res)
            //    setAllGroups(res.data.data)
            // })
            // .catch((err)=>{
            //    console.log(err);
            // })
      },[user]);
      

   const handleBack=()=>{
      setBack(x=>!x)
      {OpenProfile ? setOpenProfile(false) : ""}
      sethideSide(false)
   }

   const handleGroupClick=()=>{
      setBack(false)
      const isMediumOrLarger = window.innerWidth >= 768; // Adjust the breakpoint as needed
      // Update state based on the screen size
      if (isMediumOrLarger) {
         sethideSide(false);
      } else {
         sethideSide(true);
      }
   }

  return (
    <div className='flex h-screen overflow-hidden'>
         {/* Profile Image */}
         <div className={`w-[4.75%] bg-[#eff5ff] min-w-24 border-r cursor-pointer flex flex-col items-center md:visible overflow-hidden ${hideSide ? "hidden" : ""}`}>
            <img  onClick={()=>setOpenProfile(x=>!x)} className="h-fit p-2 rounded-full w-full "src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3IwnFoJ9Fw5d_q5rHVElUqeHTWeHTaWuIQ&usqp=CAU'/>
            <img  onClick={()=>setOpenProfile(x=>!x)} className="h-fit p-2 rounded-full w-full "src='https://play-lh.googleusercontent.com/_bh6XK3B7TAk7kBXC1GHC0j9eS9cw9wQo2K7fiP7FDGAQlcOqgUPT2lx3WgZ0JlOJh8'/>
         </div>

         {/* Group and Open Profile */}
         {
            OpenProfile ? <ProfilePage type={OpenProfile}/>: 
            <div className={`${Back ? "visible w-full " : "hidden "} md:w-[30.25%]  md:flex flex-col h-full`}>
                <div className='bg-[#F5F7FD] h-[10%] py-4 border-r-4'>
                     <h1 className='text-2xl text-center md:mt-5 mt-3 font-semibold'>STC GROUPS</h1>
                </div>
                
                <div className='md:h-[90%] flex flex-col gap-2 bg-[#E8EDFA]  border-r-4'>
                     {
                       user &&  allGroups && allGroups.map((group)=>(
                           <Link onClick={handleGroupClick} to={`group/${group.id}`} key={group.group_id}  >
                              <Groups group={group} id1={id}/>
                           </Link>
                        ))
                     }
                </div>
            </div>
         }

         {/* Chat Section */} 
         
         <div className={`${Back || OpenProfile ? "hidden" : "visible"} md:w-[65%]  md:block w-full bg-white border-x-1 `}>

            {/* Group Header */}
            <div className={`border bg-[#F5F7FD] h-[10%] flex justify-center gap-8 ${!id ? "hidden":""}`}>
                     <button className={`p-2 rounded-full bg-gray-200 h-10 w-10 text-2xl mt-5 md:hidden ${Back ? " hidden" : ""}`} onClick={handleBack}><IoArrowBackSharp /></button>
                     <ChatHeader/>
            </div>  
            {/* Group chats actual */}
            <div className={`border bg-gray-100 h-[90%] relative ${!id ? "hidden h-[100%]":""}`}>
                  <ChatData/>
            </div>

         </div>
    </div>
  )
}

export default ChatPage