import React from 'react'

const Shimmer = ({type,className}) => {
  return (
    <div className='flex flex-col items-center py-14 gap-5 h-screen bg-gray-300'>
        <h1 className='text-2xl mb-1'>{type}</h1>
        <h1 className={className}>

        </h1>
        <h1 className={className}>

        </h1>
        <h1 className={className}>

        </h1>
        <h1 className={className}>

        </h1>
        <h1 className={className}>

        </h1>
        {/* <h1 className='text-center  w-[20%] h-12 flex items-center justify-between p-3 rounded-2xl shadow-xl bg-gradient-to-r from-slate-400 to-slate-300'>

        </h1>
        <h1 className='text-center  w-[20%] h-12 flex items-center justify-between p-3 rounded-2xl shadow-xl bg-gradient-to-r from-slate-400 to-slate-300'>

        </h1>
        <h1 className='text-center  w-[20%] h-12 flex items-center justify-between p-3 rounded-2xl shadow-xl bg-gradient-to-r from-slate-400 to-slate-300'>

        </h1>
        <h1 className='text-center  w-[20%] h-12 flex items-center justify-between p-3 rounded-2xl shadow-xl bg-gradient-to-r from-slate-400 to-slate-300'>

        </h1> */}
    </div>
  )
}

export default Shimmer