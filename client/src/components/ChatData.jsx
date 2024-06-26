import React, { useContext, useEffect, useState,useRef } from 'react'
import { useParams } from 'react-router-dom'
import "react-chat-elements/dist/main.css";
import { TiAttachmentOutline } from "react-icons/ti";
import { LuSend } from "react-icons/lu";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { formatDistanceToNow , format } from 'date-fns';
import { MdDelete } from "react-icons/md";



// console.log(relativeTime);

import axios, { all } from 'axios';
import { userContext } from '../App';
import { Toaster,toast } from 'react-hot-toast';
import Loading from '../Common/Loading';

const img2 = "https://i.snipboard.io/LYNi6y.jpg";
const img ="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/1200px-Google_Chrome_icon_%28September_2014%29.svg.png";
const ChatData = () => {

  const chatContainerRef = useRef();
  const { id } = useParams()
  const [sid,setsid]=useState(null);
  // setsid(id);
  const [suggestion_text, setSuggestion_text] = useState("")
  const backurl = import.meta.env.VITE_BACKEND_URL;
  const [allChats, setallChats] = useState([])
  const { user } = useContext(userContext)
  const [loading,setloading]=useState(false);
  const prevId = useRef();
  const prevAllChats = useRef(allChats)
  // console.log(allChats);
  // Download File EndPoint
  const fileDownload = (link) => {
    if (link === undefined || link === null) {
      console.error('Invalid link:', link);
      return;
    }

    let link_clean = link.slice(2, -2);
    window.open("microsoft-edge:" + link_clean);
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
    // console.log(formData)
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
    
    if(user){
      let url = `${backurl}/api/studentChat/group`

      if (user.type === "teacher") {
        url = `${backurl}/api/teacherChat/group/${parseInt(id)}`
      }
      // setloading(true)
      // setallChats(null)
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      })
      .then((res) => {
        //  console.log(res,"upload.............")
        // setloading(false)
        setallChats(res.data.data);
      })
      .catch((err)=>{
        // setloading(false)
      })
    }
    
  }, [allChats,id])
  
  const reply=()=>{
    // console.log('reply')
  }
  const handleSend = () => {
    if(suggestion_text==="")
    {
      return;
    }
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
      // setloading(true)
      .then((res) => {
        // console.log(res)
        // setloading(false);
      })
      .catch((err) => {
        // setloading(false);
        toast.err(err.response.data.message || "Upload Error")
      })
  }
  const handleDelete=(id)=>{
    if(window.confirm("Are You Sure ! Want to delete this message "))
    {
      axios.delete(`${backurl}/api/${user.type}Suggestions/delete/${id}`,
      {
          headers:{
              Authorization: `Bearer ${user.token}`
          }
      }
      )
      .then((res)=>{
          // console.log(res)
          // setTimeout(() => {
            return toast.success(`Chat Deleted Successfully`)
          // }, 1000);  
      })
      .catch((err)=>{
          // console.log(err)
          return toast.error(err.response)
      })
    }
  }
  // console.log(allChats)
  // console.log(first)
  // console.log(allChats)
  //bg-[#dde4f9]
  return (
    <div className={`text-2xl md:h-[87%] h-[87%]  ${!id ? "hidden" : ""} `}>
      <Toaster/>
      <div className='h-full overflow-auto bg-[#cfd9f7] p-2' ref={chatContainerRef}>
        {
          loading===false ? allChats && allChats.map((chat) => (
            <div className={`bg-[#f7f8fd] shadow-lg shadow-b shadow-l border-b-2   border-slate-400 w-fit h-fit text-gray-900 ${chat.teacher_uploaded && user?.type === "teacher" || chat.teacher_uploaded === false && user?.type === "student" ? "ml-auto border-l-2  " : " mr-auto border-r-2" } ${chat.is_file ? " px-2 ":""} rounded-xl m-2 max-w-[65%] whitespace-pre-line `}>
                <div className='flex'>
                <h1 className='mr-auto text-sm font-bold  mb-1 pt-2 pl-3 pr-5 '>{chat.uploader_name}</h1>
                {chat.teacher_uploaded && user?.type === "teacher" || chat.teacher_uploaded === false && user?.type === "student" ? <button onClick={()=>handleDelete(chat.id)} className='pr-1'><MdDelete /></button>:""}
                </div>
                {
                    chat.is_file ? 
                    <div className='bg-[#f7f8fd] rounded flex py-2 px-1 cursor-pointer items-start' onClick={() => { fileDownload(chat.data) }}>
                      <FaFile className='' />
                      <h1 className='pl-3 pr-5  text-xl'>{chat.is_file ? chat.data.substring(chat.data.indexOf('_') + 1,chat.data.indexOf('?')) : chat.data}</h1>
                      <FaCloudDownloadAlt className='w-7 h-8 text-center cursor-pointer'  />
                    </div> : <h1 className='pl-3 pr-5  text-xl'>{chat.is_file ? chat.data.substring(chat.data.indexOf('_') + 1,chat.data.indexOf('?')) : chat.data}</h1>
                }
                <h1 className='flex justify-end text-sm px-2 pb-1 text-gray-600'>{formatDistanceToNow(new Date(chat.uploaded_at))}</h1>
            </div>
          ))
          :<Loading/>
        }


      </div>
      {/* Input */}
      <div className='border  border-t-gray-300 bg-[#e5e9f5] md:h-[20%] h-[28%] flex justify-between px-6 gap-5 md:mb-0 items-center md:pb-6 '>
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
        <div className={`w-full`}>
          <textarea
            className='w-full py-4 rounded-xl px-2 text-xl border-l-4 bg-gray-100 overflow-hidden resize-none'
            type='text'
            placeholder='Enter your message.....'
            rows={2}
            value={suggestion_text}
            onChange={(e) => setSuggestion_text(e.target.value)}
          />
        </div>
        <button onClick={handleSend}><LuSend className={`w-9 h-9  ${suggestion_text.length===0 ? "hidden":"" }`} /></button>
      </div>
    </div>
  )
}

export default ChatData