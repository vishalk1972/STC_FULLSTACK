import { Route, Routes } from "react-router-dom";
import ChatData from "./components/ChatData"
import ChatPage from "./pages/ChatPage"
import HomePage from "./pages/HomePage"
import ChatHeader from "./components/ChatHeader";
import Groups from "./components/Groups";
import { createContext, useEffect, useState } from "react";
import { lookInLocal } from "./assests/local";
import HomePageAdmin from "./pages/AdminPages/HomePageAdmin";
import Dashboard from "./pages/AdminPages/Dashboard";
import AdminAddDomain from "./pages/AdminPages/AdminAddDomain";
import AdminGetDomain from "./pages/AdminPages/AdminGetDomain";
import AdminAddTeacher from "./pages/AdminPages/AdminAddTeacher";
import AdminGetTeacher from "./pages/AdminPages/AdminGetTeacher";
import AdminAddGroup from "./pages/AdminPages/AdminAddGroup";
import AdminGetGroup from "./pages/AdminPages/AdminGetGroup";
import AdminAddStudent from "./pages/AdminPages/AdminAddStudent";
import AdminGetStudent from "./pages/AdminPages/AdminGetStudent";
import AssignGroups from "./pages/AdminPages/AssignGroups";
import AssignDomain from "./pages/AdminPages/AssignDomain";
import AddAllStudent from "./components/AddAllStudent";
import AdminAddNotice from "./pages/AdminPages/AdminAddNotice";
import AdminFinalData from "./pages/AdminPages/AdminFinalData";

export const userContext=createContext({
  user:{},
  SetUser : ()=>{},
  admin:{},
  SetAdmin:()=>{},
})

function App() {
  const [user,SetUser]=useState({})
  const [admin,SetAdmin]=useState(null)

  useEffect(()=>{
    let userinlocal=lookInLocal("user");
    let admininlocal=lookInLocal("admin")    
    if(userinlocal){
      SetUser(JSON.parse(userinlocal))
    }
    if(admininlocal)
    {
      SetAdmin(JSON.parse(admininlocal))
    }
    
  },[])
  return (
    <userContext.Provider value={{user,SetUser,admin,SetAdmin}}>
      <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/group" element={<Groups/>}></Route>
          <Route path="/student" element={<HomePage type="student"/>}></Route>
          <Route path="/student/addAll" element={<AddAllStudent/>}></Route>
          <Route path="/teacher" element={<HomePage type="teacher"/>}></Route>
          <Route path="/admin" element={<HomePageAdmin/>}></Route>
          <Route path="/admin/dashboard" element={<Dashboard/>}></Route>
          <Route path="/admin/dashboard/addDomain" element={<AdminAddDomain/>}></Route>
          <Route path="/admin/dashboard/getDomain" element={<AdminGetDomain/>}></Route>
          <Route path="/admin/dashboard/addTeacher" element={<AdminAddTeacher/>}></Route>
          <Route path="/admin/dashboard/getTeacher" element={<AdminGetTeacher/>}></Route>
          <Route path="/admin/dashboard/addGroup" element={<AdminAddGroup/>}></Route>
          <Route path="/admin/dashboard/getGroup" element={<AdminGetGroup/>}></Route>
          <Route path="/admin/dashboard/addStudent" element={<AdminAddStudent/>}></Route>
          <Route path="/admin/dashboard/getStudent" element={<AdminGetStudent/>}></Route>
          <Route path="/admin/dashboard/assign" element={<AssignGroups/>}></Route>
          <Route path="/admin/dashboard/assignDomain" element={<AssignDomain/>}></Route>
          <Route path="/admin/dashboard/addNotice" element={<AdminAddNotice/>}></Route>
          <Route path="/admin/dashboard/getfinalData" element={<AdminFinalData/>}></Route>
          
          <Route path="/:person/chat" element={<ChatPage/>}>
              <Route path="group/:id" element={<ChatData/>}></Route>
              <Route path="group/:id" element={<ChatHeader/>}></Route>
          </Route>        
      </Routes>
    </userContext.Provider>
  )
}

export default App
