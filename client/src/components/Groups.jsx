import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { userContext } from '../App';
const Groups = ({group}) => {
    const {id:id1,group_name,fk_group}=group
    const {user}=useContext(userContext)
    const {id}=useParams();
    console.log(id,"->");
    console.log(id1,"->")
    // let a= (id==id1 ? " bg-[#d1dbfb] shadow-2xl " : "bg-[#e6ebfa]")
    let a=user.type==="student" ? (id==fk_group ? " bg-[#d1dbfb] shadow-2xl " : "bg-[#e6ebfa]") : (id==id1 ? " bg-[#d1dbfb] shadow-2xl " : "bg-[#e6ebfa]")

  return (
    <div className={`w-full text-center mb-2  text-xl rounded-sm shadow-xl p-6 hover:bg-[#d1dbfb] ${a}`}>
        <h1 className='text-xl'>{group_name.toUpperCase().slice(0,3)} {group_name.slice(3)}</h1>
        {/* <h1>{teacher}</h1> */}
    </div>
  )
}

export default Groups