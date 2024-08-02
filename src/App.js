import { useEffect, useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Apicontext from "./Apicontext";
import './App.css';
import Homepage from "./Homepage";
import Newpost from "./Newpost";
import Signup from "./Signup";
import Blogpage from "./blogpage";
import Contact from "./contact";
import icon from "./images/icon.png";
import Myblog from "./myblog";
import ProtectedComponent from "./private";
import Register from "./register";
function App() {
  const [hider,changehider]=useState(false)
  const [handlebar,changebar]=useState("sidebar")
  const Location=useNavigate()
  const localdata=JSON.parse(localStorage.getItem("userimfo"))
  const logouthandle=()=>{
    localStorage.removeItem("userimfo")
    window.location.assign("/")
  }
  useEffect(()=>{
    if(window.location.pathname==="/signup"){
      changehider(true)
    }
    else if(
      window.location.pathname==="/"){
        changehider(true)
      }
    else{
      changehider(false)
    }  
    },[Location])

  return (
    <Apicontext>
      {
        hider===false?
      <div className="hidden handlebar">
      <div className='w-full p-3  absolute flex justify-between ' style={{backgroundColor:"#000421" ,height:"60px",zIndex:"999" }}>
          <h1 className="Logo text-sm">LOGO</h1>
          <img className="" src={icon} alt=""  onClick={()=>{
            handlebar==="sidebar"?changebar("sidebar1"):changebar("sidebar")
          }}/>
      </div>
      </div>
      :<p></p>}
     
    <div className=" responsive" >
      {
        hider===false?
      
  <div className={`p-3 flex flex-col justify-between ${handlebar}`} style={{backgroundColor:"#000421"  }}>
      <div>
        <h1 className="Logo text-sm">LOGO</h1>
        <NavLink to={"/homepage"}><p className='router-container'>HOMEPAGES</p></NavLink>
        <NavLink to={"/myblog"}><p className='router-container'>MY BLOG</p></NavLink>
        <NavLink to={"/newpost"}><p className='router-container'>CREATE NEW BLOG</p></NavLink>
        <NavLink to={"/contact"}><p className='router-container'>CONTACT US</p></NavLink>
      </div>
      <div className="p-6 text-white flex justify-between">
        <p className=" cursor-pointer" >Hello { localdata!==null? localdata[0].name :<div></div> } </p>
        <p className="cursor-pointer " style={{color:"red"}} onClick={logouthandle}> LogOut</p>
      </div>
      </div>
      :<div></div>}

      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route element={<ProtectedComponent/>}>
        <Route path="/homepage" element={<Homepage/>}/>
        <Route path="/myblog" element={<Myblog/>}/>
        <Route path="/newpost" element={<Newpost/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/blogpage" element={<Blogpage/>}/>
        <Route path="*" element={<Homepage/>}/>
        </Route>
        <Route path="/signup" element={<Signup/>}/>
       
      </Routes>
    </div>
    
    </Apicontext>
  );
}

export default App;
