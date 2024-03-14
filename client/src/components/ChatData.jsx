import React, { useContext, useEffect, useState,useRef } from 'react'
import { useParams } from 'react-router-dom'
import "react-chat-elements/dist/main.css";
import { TiAttachmentOutline } from "react-icons/ti";
import { LuSend } from "react-icons/lu";
import { FaFile } from "react-icons/fa";
import { MdDownloading } from "react-icons/md";
import { FaCloudDownloadAlt } from "react-icons/fa";
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
import { formatDistanceToNow , format } from 'date-fns';




// console.log(relativeTime);

import axios, { all } from 'axios';
import { userContext } from '../App';
import { Toaster,toast } from 'react-hot-toast';

const img2 = "https://i.snipboard.io/LYNi6y.jpg";
const img ="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/1200px-Google_Chrome_icon_%28September_2014%29.svg.png";
const ChatData = () => {

  const chatContainerRef = useRef();
  const { id } = useParams()
  const [suggestion_text, setSuggestion_text] = useState("")
  const backurl = import.meta.env.VITE_BACKEND_URL;
  const [allChats, setallChats] = useState([])
  const { user } = useContext(userContext)
  // console.log(allChats);
  // Download File EndPoint
  const fileDownload = (link) => {
    let link_clean = link.slice(2, -2);
    const isEdge = window.navigator.userAgent.includes("Edge");
    if (isEdge) {
      window.location.href = link_clean; 
    } else {
      window.open(link_clean, '_blank');
    }
  }

  // Upload File EndPoint
  const handleBannerUpload = (e) => {
    let file = e.target.files[0];
    const formData = {}
    formData["file"] = file;
    let url = `${backurl}/api/uploadFile/studentFile`
    if (user.type === "teacher") {
      url = `${backurl}/api/uploadFile/file`;
      formData['fk_group'] = id;
    }
    console.log(formData)
    axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type ": "multipart/form-data"
      }
    })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })

  }

  useEffect(()=>{
    if (chatContainerRef.current) {
      // Scroll to the bottom of the chat container
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  },[id])
  ///fetching all chats
  useEffect(() => {
    
    let url = `${backurl}/api/studentChat/group`
    if (user?.type === "teacher") {
      url = `${backurl}/api/teacherChat/group/${parseInt(id)}`
    }
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    })
    .then((res) => {
      //  console.log(res,"upload.............")
      setallChats(res.data.data);
    })
    .catch((err) => {
      // console.log(err);
      return toast.error(err.response.data.message)
    })
    
  }, [user, allChats, id])
  const reply=()=>{
    console.log('reply')
  }
  const handleSend = () => {
    setSuggestion_text("")
    let url = `${backurl}/api/studentSuggestions/create`
    const data = {}
    if (user?.type === "teacher") {
      url = `${backurl}/api/teacherSuggestions/create`
      data['fk_group'] = parseInt(id)
      data["data"]=suggestion_text;
    }
    else{
      data["datas"]=suggestion_text;
    }
    axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    })
      .then((res) => {
        // console.log(res)
      })
      .catch((err) => {
        toast.err(err.response.data.message || "Upload Error")
      })
  }
  // console.log(allChats)
  // console.log(first)
  // console.log(allChats)
  return (
    <div className={`text-2xl h-[87%]  ${!id ? "hidden" : ""}`}>
      <Toaster/>
      <div className='h-full overflow-auto bg-[#dde4f9] ' ref={chatContainerRef}>
        {
          allChats && allChats.map((chat) => (
            // <MessageBox
            //   className="whitespace-pre-line"
            //   key={chat.uploaded_at}
            //   onClick={(e)=>console.log(e)}
            //   avatar={img}
            //   title={chat.uploader_name}
            //   position={chat.teacher_uploaded && user?.type === "teacher" || chat.teacher_uploaded === false && user?.type === "student" ? "right" : "left"}
            //   type={chat.is_file ? "file" : "text"}
            //   text={chat.is_file ? chat.data.substring(
            //     chat.data.indexOf('_') + 1,
            //     chat.data.indexOf('?')
            //   ) : chat.data}
            //   data={{
            //     uri: img2,
            //     status: {
            //       click: false,
            //       loading: 0
            //     }
            //   }}
            //   date={chat.uploaded_at}
            //   onDownload={() => { fileDownload(chat.data) }}
            //   toBottomHeight={true}
            //   replyButton
  
            // />
            
            <div className={`bg-[#f7f8fd] shadow-lg shadow-b shadow-l border-b-2  border-slate-400 w-fit h-fit text-gray-900 ${chat.teacher_uploaded && user?.type === "teacher" || chat.teacher_uploaded === false && user?.type === "student" ? "ml-auto border-l-2 bg-[#c6cefc] " : " mr-auto border-r-2" } ${chat.is_file ? " px-2 ":""} rounded-xl m-2 max-w-[65%] whitespace-pre-line `}>
                <h1 className='mr-auto text-sm font-bold underline mb-1 pt-2 pl-3 pr-5 '>{chat.uploader_name}</h1>
                {
                    chat.is_file ? 
                    <div className='bg-[#dde3fc] rounded flex py-2 px-1 cursor-pointer items-start' onClick={() => { fileDownload(chat.data) }}>
                      <FaFile className='' />
                      <h1 className='pl-3 pr-5  text-xl'>{chat.is_file ? chat.data.substring(chat.data.indexOf('_') + 1,chat.data.indexOf('?')) : chat.data}</h1>
                      <FaCloudDownloadAlt className='w-7 h-8 text-center cursor-pointer'  />
                    </div> : <h1 className='pl-3 pr-5  text-xl'>{chat.is_file ? chat.data.substring(chat.data.indexOf('_') + 1,chat.data.indexOf('?')) : chat.data}</h1>
                }
                
                <h1 className='flex justify-end text-sm px-2 pb-1 text-gray-600'>{formatDistanceToNow(new Date(chat.uploaded_at))}</h1>
            </div>
          ))
        }

      </div>
      {/* Input */}
      <div className='border border-t-gray-300 bg-[#e5e9f5] h-[20%] flex justify-between px-6 gap-5 items-center mb-1 pb-6 relative'>
        {/* <button onClick={handleAttach}><TiAttachmentOutline className='w-9 h-9'/></button> */}
        <label htmlFor="uploadBanner">
          <TiAttachmentOutline className='w-9 h-9 cursor-pointer' />
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
            className='w-full py-4 rounded-xl px-2 text-xl border-l-4 bg-gray-100 overflow-hidden resize-none'
            type='text'
            placeholder='Enter your message.....'
            rows={2}
            value={suggestion_text}
            onChange={(e) => setSuggestion_text(e.target.value)}
          />
        </div>
        <button onClick={handleSend}><LuSend className='w-9 h-9' /></button>
      </div>
    </div>
  )
}

export default ChatData