import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import url from "./globle"
export default function Signup() {
  const location=useNavigate()
  const [error,seterror]=useState("")
  const [userdata,updateuserdata]=useState({
    email:"",
    password:""
  })
  const userchange=(e)=>{
    updateuserdata({...userdata,[e.target.name]:e.target.value})
  }

  const login=async(e)=>{
    e.preventDefault();
    await fetch(`${url}login`,{
      method:"POST",
      body:JSON.stringify(userdata),
      headers:{
        "content-type":"application/json"
      }
    })
    .then(async(res)=>await res.json())
    .then((data)=>{
      if(data==="login failed"){
        seterror("Login failed X")
      }
      else{
        localStorage.setItem("userimfo",JSON.stringify(data))
        location("/homepage")
      }
    })
    .catch((err)=>console.log(err))

    
  }
  return (
    <div className='w-full  bg-black h-dvh flex flex-col justify-center items-center'>
        <p className=' text-4xl text-green-500'>Login Now</p>
        <form className=' p-6 flex flex-col w-2/5 registeer' onSubmit={login}>
            <input className=' h-10 mt-3 p-2 outline-none' type='text' placeholder='Enter Email' name='email' onChange={userchange}/>
            <input className=' h-10 mt-3 p-2 outline-none' type='text' placeholder='Enter password'name='password' onChange={userchange}/>
            <input className=' bg-green-500 text-white mt-3 p-2 cursor-pointer ' type='submit' value={"login"}/>
            <p className=' mt-3 cursor-pointer text-green-500' onClick={()=>location("/")}>New user ? register now</p>
            <p className=' mt-3 cursor-pointer text-red-500' onClick={()=>seterror("")}>{error}</p>
        </form>
    </div>
  )
}
