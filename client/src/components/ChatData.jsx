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
import { Toaster,toast } from 'react-hot-toast';

const img2 = "https://i.snipboard.io/LYNi6y.jpg";
const img ="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/1200px-Google_Chrome_icon_%28September_2014%29.svg.png";
const ChatData = () => {
  const { id } = useParams()
  const [suggestion_text, setSuggestion_text] = useState("")
  const backurl = import.meta.env.VITE_BACKEND_URL;
  const [allChats, setallChats] = useState([])
  const { user } = useContext(userContext)
  // console.log(allChats);
  const fileDownload = (link) => {
    let link_clean = link.slice(2, -2);
    // const anchor = document.createElement('a');
    // anchor.href = link_clean;
    // anchor.target = '_blank';
    // anchor.click();
    // const firebaseLink = link_clean;
    
    // Check if the user is using Microsoft Edge
    const isEdge = window.navigator.userAgent.includes("Edge");

    // Use specific method for Microsoft Edge or fallback to window.open
    if (isEdge) {
      // You can use Microsoft Edge-specific methods here
      window.location.href = link_clean; // or any other Edge-specific method
    } else {
      // Fallback to window.open for other browsers
      window.open(link_clean, '_blank');
    }

  }
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
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })

  }


  let url = `${backurl}/api/studentChat/group`
  if (user?.type === "teacher") {
    url = `${backurl}/api/teacherChat/group/${parseInt(id)}`
  }

  ///fetching all chats
  useEffect(() => {
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    })
    .then((res) => {
      // console.log(res,"upload.............")
      setallChats(res.data.data);
    })
    .catch((err) => {
      console.log(err);
      toast.err(err.response.data.message)
    })
  }, [user, allChats, id])
  const reply=()=>{
    console.log('reply')
  }
  const handleSend = () => {
    setSuggestion_text("")
    let url = `${backurl}/api/studentSuggestions/create`
    const data = {
      suggestion_text: suggestion_text
    }
    if (user?.type === "teacher") {
      url = `${backurl}/api/teacherSuggestions/create`
      data['fk_group'] = parseInt(id)
    }
    axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        toast.err(err.response.data.message || "Upload Error")
      })
  }
  // console.log(allChats)
  // console.log(first)
  return (
    <div className={`text-2xl h-[87%]  ${!id ? "hidden" : ""}`}>
      <Toaster/>
      <div className='h-full overflow-auto scroll-smooth bg-slate-200'>
        {
          allChats && allChats.map((chat) => (
            <MessageBox
              className=""
              onClick={(e)=>console.log(e)}
              avatar={img}
              title={chat.uploader_name}
              position={chat.teacher_uploaded && user?.type === "teacher" || chat.teacher_uploaded === false && user?.type === "student" ? "right" : "left"}
              type={chat.is_file_data ? "file" : "text"}
              text={chat.is_file_data ? chat.data_link.substring(
                chat.data_link.indexOf('_') + 1,
                chat.data_link.indexOf('?')
              ) : chat.data_link}
              data={{
                uri: img2,
                status: {
                  click: false,
                  loading: 0
                }
              }}
              date={chat.uploaded_at}
              onDownload={() => { fileDownload(chat.data_link) }}
              replyButton
  
            />
          ))
        }

      </div>
      {/* Input */}
      <div className='border border-t-gray-300 bg-gray-100 h-[20%] flex justify-between px-6 gap-5 items-center mb-1 relative'>
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
            className='w-full py-4 rounded-xl px-2 text-xl border-l-4 bg-gray-200 overflow-hidden resize-none'
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