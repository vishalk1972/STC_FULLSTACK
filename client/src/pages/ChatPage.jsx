import React, {  useContext, useEffect, useState } from 'react';
import ProfilePage from './ProfilePage';
import Groups from '../components/Groups';
import { Link, useParams,useNavigate, useActionData  } from 'react-router-dom';
import ChatData from '../components/ChatData';
import ChatHeader from '../components/ChatHeader';
import { IoArrowBackSharp } from "react-icons/io5";
import axios from 'axios';
import { userContext } from '../App';
import NoticePage from './NoticePage';
import { CiMenuKebab } from "react-icons/ci";
import { Toaster,toast } from 'react-hot-toast';

const ChatPage = () => {
   const [OpenProfile,setOpenProfile]=useState(false)
   const [OpenNotice,setOpenNotice]=useState(false)
   const [Back,setBack]=useState(false)
   const [hideSide,sethideSide]=useState(false)
   const {user}=useContext(userContext)
   const [allGroups,setAllGroups]=useState([])
   const [activeGroup, setActiveGroup] = useState({ id: null, name: null });
   const navigate=useNavigate()
   const [finalUploadPanel,setfinalUploadPanel]=useState(false);
   const backurl=import.meta.env.VITE_BACKEND_URL;
   const {id}=useParams();
   
      useEffect(()=>{
            if(user)
            {
               axios.get(`${backurl}/api/${user?.type}Dashboard/${user?.type}Groups`,
               {
                  headers:{
                     Authorization:`Bearer ${user?.token}`
                  }
               })
               .then((res)=>{
                  // console.log(res)
                  setAllGroups(res.data.data)
                  res.data.data.length === 0 && user.type === 'student' ? navigate('/student/addAll') : ''  
               })
               .catch((err)=>{
                  // console.log(err);
               })
            }
            
      },[user]);
      

   const handleBack=()=>{
      setBack(x=>!x)
      {OpenProfile ? setOpenProfile(false) : ""}
      sethideSide(false)
   }
   const handleBlur=()=>{
      // setTimeout(()=>{
         // console.log(" bc xxxxxxxx")
          setfinalUploadPanel(false)
      // },200)
  }

  

   const onGroupClick=(group)=>{
      setActiveGroup({ id: group.id, name: group.group_name });
      // console.log(group,"here")
      setBack(false)
      
      const isMediumOrLarger = window.innerWidth >= 768; // Adjust the breakpoint as needed
      // Update state based on the screen size
      if (isMediumOrLarger) {
         sethideSide(false);
      } else {
         sethideSide(true);
      }
   }

   const handleBannerUpload = (e) => {
      // console.log(e,"bccccccccccccccccccccccccc aai")
      let file = e.target.files[0];
      const formData = {}
      formData["file"] = file;
      let url = `${backurl}/api/uploadFile/abstract`
      console.log(formData)
      axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type ": "multipart/form-data"
        }
      })
        .then((res) => {
         //  console.log(res);
          toast.success("Upload Succesfully...")
        })
        .catch((err) => {
         // console.log(err)
          toast.error(err.response.data.message)
        })
        
    }

  return (
    <div className='flex h-screen overflow-hidden'>
         {/* Profile Image */}
         
         <div className={`w-[4.75%] bg-[#eff5ff] min-w-24 border-r cursor-pointer flex flex-col items-center md:visible overflow-hidden ${hideSide ? "hidden" : ""}`}>
            <img  onClick={()=>{setOpenProfile(x=>!x);setOpenNotice(false)}} className="h-fit p-2 rounded-full w-full hover:shadow-xl hover:shadow-blue-200  "src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3IwnFoJ9Fw5d_q5rHVElUqeHTWeHTaWuIQ&usqp=CAU'/>
            <img  onClick={()=>{setOpenNotice(x=>!x);setOpenProfile(false)}} className="h-24 p-2 rounded-full w-full hover:shadow-xl hover:shadow-blue-200 "src='https://cdn1.iconfinder.com/data/icons/twitter-ui-glyph/48/Sed-23-512.png'/>
         </div>

         {/* Group and Open Profile */}
         {
            
            OpenProfile ? <ProfilePage type={OpenProfile}/>  : OpenNotice ? <NoticePage/> : 
            
            <div className={`${Back ? "visible w-full " : "hidden "} md:w-[30.25%]  md:flex flex-col h-full`}>
                <div className='bg-[#F5F7FD] h-[10%] border-r-4 text-center flex'>
                     
                     <h1 className={`text-2xl text-center ${user.type==="student"? " ml-auto ":" mx-auto "} py-8  font-semibold`}>STC GROUPS</h1>
                     {/* <div className='flex'> */}
                     { user?.type==='student' &&  allGroups.length>0 && <CiMenuKebab onClick={()=>setfinalUploadPanel(x=>!x)}  className={`ml-auto inline mt-8 w-10 h-10 relative ${finalUploadPanel ? "shadow-xl rounded-xl p-1 bg-blue-100" :""}`} /> }
                     {/* </div> */}
                     {
                        
                           <div tabIndex={0} onBlur={handleBlur}>
                              {
                                 finalUploadPanel && <div tabIndex={0}  className='rounded-lg absolute translate-x-0 text-xl translate-y-16 bg-white shadow-xl z-10 py-2 px-2 hover:bg-slate-200 cursor-pointer'>
                                       <label htmlFor="uploadBanner" className='cursor-pointer'>
                                          Final Document Upload
                                          <input
                                             id="uploadBanner"
                                             type="file"
                                             // accept=".png, .jpg, .jpeg, .pdf, .ppt, .pptx, .doc, .docx"
                                             accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                             onChange={(e)=>handleBannerUpload(e)}
                                             hidden
                                          />
                                       </label>
                                 </div>
                              }
                           </div> 
                           
                     }
                </div>
                
                <div  className={`md:h-[90%] flex flex-col gap-2 bg-[#E8EDFA]  border-r-4`}>
                     {
                       user && allGroups && allGroups.length>0 && allGroups[0].fk_teacher ? allGroups.map((group)=>(
                           <Link  to={`group/${user?.type=="teacher" ? group.id : group.fk_group}`} key={user?.type==="teacher" ? group.id :group.fk_group}  >
                              <Groups group={group} onGroupClick={onGroupClick} id1={id}/>
                           </Link>
                        ))
                        :<div className="flex flex-col justify-center items-center"><p className="p-4 text-2xl font-bold ">No { user && user?.type === 'student' ? 'teacher is' : 'students are'} assigned yet.<br></br> Wait Until Teacher Is Assigned To Your Group</p></div>
                     }
                </div>
            </div>
         }

         {/* Chat Section */} 
         {/* <Toaster/> */}
         <div  className={`${Back || OpenProfile ? "hidden" : "visible"} md:w-[65%]  md:block w-full bg-white border-x-1 `}>

            {/* Group Header */}
            <div className={`border bg-[#F5F7FD] h-[10%] flex justify-center gap-8 ${!id ? "hidden":""}`}>
                     <button className={`p-2 rounded-full bg-gray-200 h-10 w-10 text-2xl mt-5 md:hidden ${Back ? " hidden" : ""}`} onClick={handleBack}><IoArrowBackSharp /></button>
                     
                     <ChatHeader activeGroup={activeGroup}/>
            </div>  
            {/* Group chats actual */}
            <div className={`border bg-gray-100 h-[90%] relative ${!id ? "hidden h-[100%]":""}`}>
                  <ChatData/>
            </div>
            <div className={`border bg-gray-100 text-2xl font-extralight h-[100%] flex justify-center items-center  relative ${!id ? "":"hidden"}`}>
                  SELECT GROUP TO START COMMUNICATION
            </div>
         </div>
    </div>
  )
}

export default ChatPage

