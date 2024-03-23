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
   const [activeGroup, setActiveGroup] = useState(false);
   const navigate=useNavigate()
   const [finalUploadPanel,setfinalUploadPanel]=useState(false);
   const backurl=import.meta.env.VITE_BACKEND_URL;
   const {id}=useParams();
   
      useEffect(()=>{
            if(!id)
            {
               setActiveGroup(false);
               sethideSide(false)
            }
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
            
      },[user,id]);
      

   const handleBack=()=>{
      // setBack(x=>!x)
      {OpenProfile ? setOpenProfile(false) : ""}
      sethideSide(false)
      setActiveGroup(false);
      // activeGroup(false)
      if (isMediumOrLarger) {
         sethideSide(false);
      } else {
         setBack(false);
         // sethideSide(true);
      }
   }
   const handleBlur=()=>{
      // setTimeout(()=>{
         // console.log(" bc xxxxxxxx")
         //  setfinalUploadPanel(false)
      // },200)
  }
  console.log(activeGroup,"activegrp")
  console.log(Back,"Back")

  

   const onGroupClick=(group)=>{
      // setActiveGroup({ id: group.id, name: group.group_name });
      // console.log(group,"here")
      // setBack(false)
      
      const isMediumOrLarger = window.innerWidth >= 768; // Adjust the breakpoint as needed
      // Update state based on the screen size
      if (isMediumOrLarger) {
         // sethideSide(false);
      } else {
         setActiveGroup(x=>!x);
         sethideSide(true);
      }
   }

   const handleBannerUpload = (e) => {
      
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
          console.log(res);
          toast.success("Upload Succesfully...")
        })
        .catch((err) => {
         console.log(err,"bc plz")
          toast.error("Upload Error" || err.response.data.message)
        })
        
    }

  return (
    <div className='flex h-screen overflow-hidden'>
         {/* Profile Image */}
         
         <div className={`md:w-[4.75%] w-[4%] min-w-20  bg-[#eff5ff] md:min-w-24 border-r cursor-pointer flex flex-col items-center md:visible overflow-hidden ${hideSide ? "hidden":""}`}>
            <img  onClick={()=>{setOpenProfile(x=>!x);setOpenNotice(false)}} className="h-fit p-2 rounded-full w-full hover:shadow-xl hover:shadow-blue-200  "src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3IwnFoJ9Fw5d_q5rHVElUqeHTWeHTaWuIQ&usqp=CAU'/>
            <img  onClick={()=>{setOpenNotice(x=>!x);setOpenProfile(false)}} className="md:h-24 p-2 rounded-full w-full hover:shadow-xl hover:shadow-blue-200 "src='https://cdn1.iconfinder.com/data/icons/twitter-ui-glyph/48/Sed-23-512.png'/>
         </div>

         {/* Group and Open Profile */}
         {
            
            OpenProfile ? <ProfilePage type={OpenProfile}/>  : OpenNotice ? <NoticePage/> : 
            
            <div className={`md:w-[30.25%]  flex flex-col h-full w-full ${activeGroup ? " hidden ":""} `}>
                <div className={`bg-[#F5F7FD] h-[10%] border-r-4 text-center flex ${activeGroup ? " hidden ":""}`}>
                     
                     <h1 className={`md:text-2xl text-xl text-center ${user.type==="student"? " ml-auto ":" mx-auto "} py-8  font-semibold`}>STC GROUPS</h1>
                     {/* <div className='flex'> */}
                     { user?.type==='student' &&  allGroups.length>0 && <CiMenuKebab onClick={()=>setfinalUploadPanel(x=>!x)}  className={`ml-auto inline mt-8 w-10 h-10 relative ${finalUploadPanel ? "shadow-xl rounded-xl p-1 bg-blue-100" :""}`} /> }
                     {/* </div> */}
                     {
                        
                           <div tabIndex={0} onBlur={handleBlur}>
                              {
                                 finalUploadPanel && <div tabIndex={0} onBlur={handleBlur}  className='rounded-lg absolute md:translate-x-0 -translate-x-28 text-xl translate-y-16  bg-white shadow-xl z-10 py-2 px-2 hover:bg-slate-200 cursor-pointer'>
                                       <label htmlFor="uploadBanner" className='cursor-pointer'>
                                          Final Document Upload
                                          <input
                                             id="uploadBanner"
                                             type="file"
                                             // accept=".png, .jpg, .jpeg, .pdf, .ppt, .pptx, .doc, .docx"
                                             accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                             onChange={handleBannerUpload}
                                             hidden
                                          />
                                       </label>
                                 </div>
                              }
                           </div> 
                           
                     }
                </div>
                
                <div onClick={()=>setfinalUploadPanel(false)} className={`h-[90%] flex flex-col gap-2 bg-[#E8EDFA] md:visible  border-r-4 ${activeGroup ? " hidden ": " "}`}>
                     {
                       user && allGroups && allGroups.length>0 && allGroups[0].fk_teacher ? allGroups.map((group)=>(
                           // <Link  to={`group/${user?.type=="teacher" ? group.id : group.fk_group}`} key={user?.type==="teacher" ? group.id :group.fk_group}  >

                           //    <Groups group={group} onClick={()=>setActiveGroup(true)} id1={id}/>
                           // </Link>
                           <Link  to={`group/${user?.type=="teacher" ? group.id : group.fk_group}`} key={user?.type==="teacher" ? group.id :group.fk_group}  >
                              {/* <Groups group={group} onClick={()=>setActiveGroup(true)} id1={id}/> */}
                              <div onClick={onGroupClick} className={`w-full text-center mb-2  text-xl rounded-sm shadow-xl p-6 hover:bg-[#d1dbfb] ${user.type==="student" ? (id==group.fk_group ? " bg-[#d1dbfb] shadow-2xl " : "bg-[#e6ebfa]") : (id==group.id ? " bg-[#d1dbfb] shadow-2xl " : "bg-[#e6ebfa]")}`}>
                                 <h1 className='md:text-xl text-lg'>{group.group_name.toUpperCase().slice(0,3)} {group.group_name.slice(3)}</h1>
                                 {/* <h1>{teacher}</h1> */}
                              </div>
                           </Link>
                           
                        ))
                        :<div className="flex flex-col justify-center items-center"><p className="p-4 text-2xl font-bold ">No { user && user?.type === 'student' ? 'teacher is' : 'students are'} assigned yet.<br></br> Wait Until Teacher Is Assigned To Your Group</p></div>
                     }
                </div>
            </div>
         }

         {/* Chat Section */} 
         {/* <Toaster/> */}
         <div onClick={()=>setfinalUploadPanel(false)} className={`${activeGroup==false || OpenProfile || OpenNotice ? " hidden " : " visible "} md:w-[65%]  md:block w-full bg-white border-x-1 `}>
            {/* Group Header */}
            <div className={`border bg-[#F5F7FD] h-[10%] flex justify-center gap-8 ${!id ? "hidden":""}`}>
                     <button className={`p-2 rounded-full bg-gray-200 h-10 w-10 text-2xl mt-5 md:hidden`} onClick={handleBack}><IoArrowBackSharp /></button>
                     
                     <ChatHeader activeGroup={activeGroup}/>
            </div>  
            {/* Group chats actual */}
            <div className={`border bg-gray-100 md:h-[90%] h-[80%] relative ${!id ? "hidden h-[100%]":""}`}>
                  <ChatData/>
            </div>
            <div className={`border bg-gray-100 text-2xl md:visible hidden font-extralight h-[100%] md:flex justify-center items-center  relative ${!id ? "":" md:hidden "}`}>
                  SELECT GROUP TO START COMMUNICATION
            </div>
         </div>
    </div>
  )
}

export default ChatPage

