import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "react-chat-elements/dist/main.css";
import { TiAttachmentOutline } from "react-icons/ti";
import { LuSend } from "react-icons/lu";
import {
  ChatItem,
  MessageBox,
  SystemMessage,
  MessageList,
  ChatList,
  Input,
  Button,
  Popup,
  SideBar,
  Navbar,
  Dropdown,
  Avatar
} from "react-chat-elements";

import axios from 'axios';
import { userContext } from '../App';
import PdfPreview from './PdfPreview';

const img2 = "https://i.snipboard.io/LYNi6y.jpg";
const ChatData = () => {
    const {id}=useParams()
    const [suggestion_text,setSuggestion_text]=useState("")
    const backurl=import.meta.env.VITE_BACKEND_URL;
    const [allTeacherChats,setallTeacherChats]=useState([])
    const {user}=useContext(userContext)
    const handleBannerUpload=(e)=>{
      let img=e.target.files[0];
      console.log(img)
      axios.post(`${backurl}/api/uploadFile/file`)
    }
    // console.log(user?.token)
    // console.log(id)
  //  const {id}=useParams();
    useEffect(()=>{
      axios.get(`${backurl}/api/teacherChat/group/${parseInt(id)}`,{
        headers:{
          Authorization: `Bearer ${user?.token}`
        }
      })
      .then((res)=>{
        console.log(res,"upload.............")
        setallTeacherChats(res.data.data);
      })
      .catch((err)=>{
        console.log(err);
      })
    },[user,allTeacherChats,id])
    const handleSend=()=>{
      const data={
        fk_group:parseInt(id),
        suggestion_text:suggestion_text
      }
      axios.post(`${backurl}/api/teacherSuggestions/create`,data,{
        headers:{
          Authorization: `Bearer ${user?.token}`
        }
      })
      .then((res)=>{
        console.log(res)
        setSuggestion_text("")
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  return (
   <div className={`text-2xl p-4 h-[87%]  ${!id ? "hidden" : ""}`}>
            <div className='h-full overflow-auto scroll-smooth'>
                {
                   allTeacherChats && allTeacherChats.map((chat)=>(
                      <MessageBox
                        className="bg-gradient-to-r from-blue-500 to-blue-200 p-2 "
                        position={chat.teacher_uploaded ? "right" : "left"}
                        type={"text"}
                        text={chat.data_link}
                        data={{
                          uri: img2,
                          status: {
                            click: false,
                            loading: 0
                          }
                        }}
                          
                    />
                   ))
                }
                <div>
                  {/* <PdfPreview file="/home/vishal_kuwar/Desktop/STC/client/In_House.docx (1).pdf"/> */}
                </div>
            </div>
         {/* Input */}
         <div className='border border-t-gray-300 bg-gray-100 h-[20%] flex justify-between px-6 gap-5 items-center mb-1 relative'>
                 {/* <button onClick={handleAttach}><TiAttachmentOutline className='w-9 h-9'/></button> */}
                 <label htmlFor="uploadBanner">
                    <TiAttachmentOutline className='w-9 h-9 cursor-pointer'/>
                    <input
                        id="uploadBanner"
                        type="file"
                        // accept=".png, .jpg, .jpeg, .pdf, .ppt, .pptx, .doc, .docx"
                        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                        onChange={handleBannerUpload}
                        hidden
                    />
                 </label>
                 <div className='w-full'>
                    <textarea
                        className='w-full py-4 rounded-xl px-2 text-xl border-l-4 bg-gray-200 overflow-hidden resize-none'
                        type='text'
                        placeholder='Enter your message.....'
                        rows={2}
                        value={suggestion_text}
                        onChange={(e)=>setSuggestion_text(e.target.value)}
                    />
                 </div>
                 <button onClick={handleSend}><LuSend className='w-9 h-9'/></button>
        </div>
    </div>  
  )
}

export default ChatData