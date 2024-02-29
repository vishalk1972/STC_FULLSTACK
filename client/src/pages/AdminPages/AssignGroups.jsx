import { useContext, useState , useEffect } from "react"
import { userContext } from "../../App"
import axios from "axios"

const AssignGroups = () => {
    const [DomainList,setDomainList]=useState([])
    const [teacherUnderDomain,setTeacherUnderDomain]=useState(['a','b','c'])
    const [selectedDomain,setSelectedDomain]=useState(null)
    const [selectedTeacher,setSelectedTeacher]=useState(null)
    const {admin}=useContext(userContext);
    const backurl=import.meta.env.VITE_BACKEND_URL
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
        // if(selectedDomain)
        // {
        //     axios.get(`${backurl}/api/adminDashboard/getDomainTeacher/${selectedDomain}`,
        //     {
        //         headers:{
        //             Authorization: `Bearer ${admin.token}`
        //         }
        //     }
        //     )
        //     .then((res)=>{
        //         console.log(res)
        //         setTeacherUnderDomain(res.data.data);
        //         // console.log(TeacherList)
        //     })
        //     .catch((err)=>{
        //         console.log(err)
        //         // return toast.error(err.response)
        //     })
        // }
    },[admin,DomainList,teacherUnderDomain,selectedDomain])
    // console.log(teacherUnderDomain,"okkkkkkk")
  return (
    <div className="bg-[#c3d3fa] min-h-screen flex">
        {/* DROPDOWN */}
        <div className="w-[25%] pt-10 px-10">
            <label className="text-black text-2xl font-bold mb-1">
                    Select Domain:
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
            <div className="w-[45%] pt-10 px-10">
                <label className="text-black text-2xl font-bold mb-1">
                        Select Teacher:
                </label>
                <select
                    className="px-1 py-2 text-xl bg-[#e8effd] cursor-pointer outline-none mx-1 rounded-lg shadow-lg hover:bg-white"
                    value={selectedTeacher}
                    onChange={(e) =>{setSelectedTeacher(e.target.value);console.log(e.target.value,"->>>")}}    
                >
                    <option value="" >All Teacher</option>
                    {teacherUnderDomain.map((teacher) => (
                        <option key={teacher} value={teacher}  className=" bg-[#e8effd] shadow-xl">
                            {teacher}
                        </option>
                    ))}
                </select>
            </div>
            
        }
    </div>
  )
}

export default AssignGroups