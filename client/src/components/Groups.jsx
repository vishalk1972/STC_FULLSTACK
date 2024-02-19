import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
const Groups = ({group}) => {
    const {id:id1,group_id}=group
    const {id}=useParams();
    console.log(id,"->");
    console.log(id1,"->")
    let a= (id==id1 ? " md:bg-slate-50 bg-slate-200 " : " bg-slate-200 ")

  return (
    <div className={`w-full text-center mb-2  text-xl rounded-sm shadow-xl p-6 hover:bg-slate-100 ${a}`}>
        <h1>{group_id}</h1>
        {/* <h1>{teacher}</h1> */}
    </div>
  )
}

export default Groups