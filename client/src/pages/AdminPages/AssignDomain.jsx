import React, { useContext, useState , useEffect } from 'react'
import { userContext } from '../../App'
import axios from 'axios'
import { Toaster,toast } from 'react-hot-toast'
const AssignDomain = () => {
    const {admin}=useContext(userContext)
    const [selectedTeacher,setSelectedTeacher]=useState(null)
    const [selectedTeacherComplete,setSelectedTeacherComplete]=useState({})
    const [teacherList,setTeacherList]=useState([])
    const [domainList,setDomainList]=useState([])
    const [loading,setLoading]=useState(false)
    const [allchecked, setAllChecked] = useState([]);
    const [domainTeacher, setDomainTeacher] = useState({
        domains_id: allchecked,
        teacher_id: selectedTeacher,
    });

    // ${loading ? " cursor-pointer ":" cursor-pointer"}
    const backurl=import.meta.env.VITE_BACKEND_URL

    const handleCheck=(e)=>{
        if (e.target.checked) {
            setAllChecked([...allchecked, e.target.value]);
         } else {
            setAllChecked(allchecked.filter((item) => item !== e.target.value));
         }
    }

    const handleAssign=(e)=>{
        // setLoading(true)
        e.preventDefault();
        let formData={}
        formData['domains_id']=allchecked
        formData['teacher_id']=selectedTeacher
        console.log(formData)
        axios.post(`${backurl}/api/adminAllocation/doaminTeacherAllocation`,formData,
        {
            headers:{
                Authorization: `Bearer ${admin.token}`
            }
        }
        )
        .then((res)=>{
            // setLoading(false)
            console.log(res)
            // return toast.success("Allocation Succesfull....")
        })
        .catch((err)=>{
            // setLoading(false)
            console.log(err)
            // return toast.error(err.response)
        })
        
    }

    useEffect(()=>{
        setLoading(true);
        if(admin)
        {
            axios.get(`${backurl}/api/adminDashboard/teachers`,
            {
                headers:{
                    Authorization: `Bearer ${admin.token}`
                }
            }
            )
            .then((res)=>{
                setLoading(false)
                // console.log(res)
                setTeacherList(res.data.data);
                // console.log(TeacherList)
            })
            .catch((err)=>{
                setLoading(false)
                console.log(err)
                // return toast.error(err.response)
            })
        }
        if(admin)
        {
            axios.get(`${backurl}/api/domain`,
            {
                headers:{
                    Authorization: `Bearer ${admin.token}`
                }
            }
            )
            .then((res)=>{
                setLoading(false)
                // console.log(res)
                setDomainList(res.data.data);
                // console.log(domainList," okkkkkkk ")
            })
            .catch((err)=>{
                setLoading(false)
                console.log(err)
                // return toast.error(err.response)
            })
        }
        
    },[admin,teacherList,domainList,selectedTeacher])
  return (
    <div className='bg-[#c9d6f8] min-h-screen flex gap-60 '>
        <Toaster/>
        <div className="pt-10 px-10 ml-auto">
                
                <label className="text-black text-2xl font-bold mb-1 ">
                        Select Teacher : 
                </label>
                <select
                    className={`px-1 py-2 text-xl bg-[#e8effd] outline-none mx-2 rounded-lg shadow-lg hover:bg-white`}
                    value={selectedTeacher}
                    onChange={(e) =>{setSelectedTeacher(e.target.value);console.log(e.target.value,"->>>")}}    
                >
                    <option value="" >All Teacher</option>
                    {teacherList.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}  className=" bg-[#e8effd] shadow-xl ">
                            {teacher.designation} {teacher.name}    
                        </option>
                    ))}
                </select>
                <div className='flex flex-col'>
                {
                    teacherList.map((teacher)=>{
                        {teacher.id===selectedTeacher ? selectedTeacherComplete(teacher) : ""}
                        return teacher.id==selectedTeacher ? 
                        <div className='bg-[#9bbbfa] shadow-xl p-6 rounded-xl text-xl mt-5 '>
                            <h1 className='text-2xl'>id: {teacher.id}</h1>
                            <h1 className='text-2xl'>{teacher.designation} {teacher.name}</h1>
                            <h1 className='text-2xl'>{teacher.email}</h1>
                        </div>
                        :" "
                    })
                }
                {
                    selectedTeacher && allchecked.length>0 &&  <button onClick={(e)=>handleAssign(e)} className='bg-[#041643] text-white font-semibold py-2 hover:bg-slate-600 px-6 text-xl rounded-xl focus:outline-none focus:shadow-outline mt-4' >Assign</button>
                }
                </div>
        </div>
        <div className='pt-10 mr-auto' >
            {
                selectedTeacher &&
                domainList.map((domain)=>{ 
                    return <div htmlFor={domain.domain_name} className='bg-[#9bbbfa] shadow-xl p-6 rounded-xl text-xl mt-5 flex items-center justify-between gap-5' >
                        <input
                            id={domain.domain_name}
                            value={domain.id}
                            type='checkbox'
                            className='text-4xl'
                            onChange = {handleCheck}
                            style={{ width: '20px', height: '20px' }}
                        />
                        <label
                            htmlFor={domain.domain_name}
                            className='text-xl mr-auto'
                        >
                            {domain.domain_name}
                        </label>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default AssignDomain