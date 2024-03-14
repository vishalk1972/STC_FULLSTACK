import { useContext, useState , useEffect } from "react"
import { userContext } from "../../App"
import axios from "axios"
import { Toaster,toast } from "react-hot-toast"

const AssignGroups = () => {
    const [DomainList,setDomainList]=useState([])
    const [teacherUnderDomain,setTeacherUnderDomain]=useState([])
    const [selectedDomain,setSelectedDomain]=useState(null)
    const [selectedTeacher,setSelectedTeacher]=useState(null)
    const [groupsLeft,setGroupsLeft]=useState([])
    const {admin}=useContext(userContext);
    const backurl=import.meta.env.VITE_BACKEND_URL
    const [allchecked, setAllChecked] = useState([]);
    const [showDetail,setShowDetail]=useState()
    const [showDetailData,setShowDetailData]=useState()

    const handleCheck=(e)=>{
        if (e.target.checked) {
            setAllChecked([...allchecked, e.target.value]);
         } else {
            setAllChecked(allchecked.filter((item) => item !== e.target.value));
         }
    }

    const handleShow=(id)=>{
        if(showDetail)
        {
            setShowDetail(null)
        }
        else{
            
            axios.get(`${backurl}/api/adminDashboard/getStudentInGroups/${id}`,
            {
                headers:{
                    Authorization: `Bearer ${admin.token}`
                }
            }
            )
            .then((res)=>{
                console.log(res)
                setShowDetail(id);
                setShowDetailData(res.data.data);
                //   console.log(DomainList)
            })
            .catch((err)=>{
                console.log(err)
                // return toast.error(err.response)
            })
        }
    }

    const handleAssign=(e)=>{
        // setLoading(true)
        e.preventDefault();
        let formData={}
        let first=allchecked[0];
        formData['groupId']=first
        formData['teacherId']=selectedTeacher
        console.log(formData)
        axios.post(`${backurl}/api/adminAllocation/allocateTeacher`,formData,
        {
            headers:{
                Authorization: `Bearer ${admin.token}`
            }
        }
        )
        .then((res)=>{
            // setLoading(false)
            console.log(res)
            return toast.success(res.data.message)
        })
        .catch((err)=>{
            // setLoading(false)
            console.log(err)
            return toast.error(err.response.data.message)
        })
        
    }

    useEffect(()=>{
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
              setDomainList(res.data.data);
            //   console.log(DomainList)
          })
          .catch((err)=>{
              console.log(err)
              // return toast.error(err.response)
          })
        }
        if(selectedDomain)
        {
            axios.get(`${backurl}/api/adminDashboard/getDomainTeacher/${selectedDomain}`,
            {
                headers:{
                    Authorization: `Bearer ${admin.token}`
                }
            }
            )
            .then((res)=>{
                console.log(res)
                setTeacherUnderDomain(res.data.data);
                // console.log(TeacherList)
            })
            .catch((err)=>{
                console.log(err)
                // return toast.error(err.response)
            })
        }
        if(selectedDomain && admin?.token)
        {
            axios.get(`${backurl}/api/adminAllocation/groupNotDomainTeacher/${parseInt(selectedDomain)}`,
                {
                    headers:{
                        Authorization: `Bearer ${admin?.token}`
                    }
                }
            )
            .then((res)=>{
                console.log(res,"final expected")
                setGroupsLeft(res.data.data)
            })
            .catch((err)=>{
                console.log(err,"final expected")
                
            })
        }

    },[admin,selectedDomain,selectedTeacher,groupsLeft])
    // console.log(teacherUnderDomain,"okkkkkkk")
  return (
    <div className="bg-[#c3d3fa] min-h-screen flex flex-col">
        {/* DROPDOWN */}
        <Toaster/>
        <div className="flex">
            <div className="w-fit mt-20 px-10 ml-44 bg-[#aeb1f7] shadow-md py-6 h-fit rounded-xl">
                <label className="text-black text-2xl font-bold mb-1 mr-1">
                        Select Domain : 
                </label>
                <select
                    className="px-1 py-2 text-xl bg-[#e8effd] cursor-pointer outline-none mx-1 rounded-lg shadow-lg hover:bg-white "
                    value={selectedDomain}
                    onChange={(e) =>{setSelectedDomain(e.target.value);console.log(e.target.value,"->>>")}}    
                >
                    {
                        selectedDomain ? <option value="" disabled >All Domains</option> :
                        <option value="" >All Domains</option>
                    }
                    {DomainList.map((domain) => (
                        <option key={domain.id} value={domain.id} className=" bg-[#e8effd] shadow-xl">
                            {domain.domain_name}{` (${domain.id})`}
                        </option>
                    ))}
                </select>
            </div>
            {
                selectedDomain &&
                <div className="w-fit mt-20 px-10 py-6 ml-5 h-fit bg-[#aeb1f7] shadow-md rounded-xl">
                    <label className="text-black text-2xl font-bold mb-1 mr-1">
                            Select Teacher :
                    </label>
                    <select
                        className="px-1 py-2 text-xl bg-[#e8effd] cursor-pointer outline-none mx-1 rounded-lg shadow-lg hover:bg-white"
                        value={selectedTeacher}
                        onChange={(e) =>{setSelectedTeacher(e.target.value);console.log(e.target.value,"->>>")}}    
                    >
                        <option value="" >All Teacher</option>
                        {teacherUnderDomain.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}  className=" bg-[#e8effd] shadow-xl">
                                {teacher.name}
                            </option>
                        ))}
                    </select>
                    {/* {
                        selectedTeacher &&
                        teacherUnderDomain.map((teacher)=>{
                            return teacher.id==selectedTeacher ? 
                            <div className=' shadow-2xl border p-6 rounded-xl text-xl mt-5 '>
                                <h1 className='text-2xl'>id: {teacher.id}</h1>
                                <h1 className='text-2xl'>{teacher.designation} {teacher.name}</h1>
                                <h1 className='text-2xl'>{teacher.email}</h1>
                            </div>
                            :""
                    })
                    } */}
                    {
                        selectedTeacher && allchecked.length>0 &&  <button onClick={(e)=>handleAssign(e)} className='bg-[#041643] text-white font-semibold py-2 hover:bg-slate-600 px-6 text-xl rounded-xl ml-2 focus:outline-none focus:shadow-outline ' >Assign</button>
                    }
                </div>
            }
        </div>
        <div className='ml-40 pt-24 px-10 flex flex-wrap' >
            {/* {
                selectedTeacher &&
                groupsLeft.map((group)=>{ 
                    return <div htmlFor={group.id} className='mt-5 gap-1 flex flex-col items-center justify-center' >
                        <div className={`bg-gradient-to-r from-[#7579fd] to-[#aeb1f7]  rounded-xl shadow-xl ${showDetail ? " p-7": " p-4"} border-b-2  border-white`}>
                            <div className="flex items-center justify-between gap-5 text-2xl p-3">
                                <input
                                    id={group.id}
                                    value={group.id}
                                    type='checkbox'
                                    className='text-4xl'
                                    onChange = {handleCheck}
                                    style={{ width: '20px', height: '20px' }}
                                />
                                <label
                                    htmlFor={group.id}
                                    className='text-xl mr-auto block text-gray-100 font-semibold cursor-pointer'
                                >
                                    {group.group_name.toUpperCase()}
                                </label>
                            </div>
                            <div className="flex flex-col items-center justify-center  ">
                            {
                                showDetail===group.id && showDetailData.length>0 && <div className=" shadow-sm rounded-xl ">
                                    {
                                        showDetailData.map((student)=>{
                                            return <div className="bg-gradient-to-r from-[#7579fd] to-[#aeb1f7] text-2xl text-gray-100 font-semibold p-4 rounded-xl mb-2">
                                                <h1>{student.roll_number} | { student.first_name } { student.last_name}</h1>
                                            </div>  
                                            
                                        })
                                    }
                                </div>
                            }
                            </div>
                        </div>
                        
                        <button className="text-lg bg-[#dfe8fb] text-black shadow-xl rounded-3xl py-1 px-3" onClick={()=>handleShow(group.id)}>{showDetail ? "Hide Details" :"Show Details"}</button>
                    </div>
                })
            } */}
            { selectedTeacher && groupsLeft.length>0 &&
                <div className='md:flex md:justify-center md:items-center my-1 min-w-screen mx-2'>
                    <table className="border rounded-xl bg-[#e9ebf0] ">
                    <thead className=''>
                        <tr className='bg-[#7579fd] text-gray-50'> 
                            <th className="border-b border-r-2 border-gray-300 md:p-3 p-2 md:text-2xl text-xl">Select</th>
                            <th className="border-b border-r-2 border-gray-300 md:p-3 p-2 md:text-2xl text-xl">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupsLeft.map(({ group_name,id},index) => (
                        <tr key={id} className={`${index%2==0 ? "bg-gray-100" :"bg-[#bed0fd]"}`}>
                            <td className="border-b border-r-2 border-gray-400  md:p-4 p-2 md:text-xl text-lg"><input
                                    id={id}
                                    value={id}
                                    type='checkbox'
                                    className='text-4xl'
                                    onChange = {handleCheck}
                                    style={{ width: '20px', height: '20px' }}
                                /></td>
                            <td className="border-b border-r-2 border-gray-400  md:p-4 p-2 md:text-xl text-lg">{group_name.toUpperCase()}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            }
            {
                selectedDomain && selectedTeacher && groupsLeft.length===0 && <div className="text-2xl p-4 text-center">
                    No Groups Left In This Domain For Allocation
                </div>
            }
        </div>
    </div>
  )
}

export default AssignGroups