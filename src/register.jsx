import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import url from "./globle"
export default function Register() {
  const [massage,setmassage]=useState("")
  const [error,seterror]=useState("")
  const location=useNavigate()
  const [user,updateuser]=useState({
    Name:"",
    email:"",
    password:""
  })
  const userchange=(e)=>{
    updateuser({...user,[e.target.name]:e.target.value})
  }

  const usersubmit=async(e)=>{
    e.preventDefault()
    await fetch(`${url}user`,{
      method:"POST",
      body:JSON.stringify(user),
      headers:{
        "content-type":"application/json"
      }
    })
    .then(async(res)=>await res.json())
    .then((data)=>setmassage(data))
    .catch((err)=>seterror(err))
  }
  return (
    <div className='w-full  bg-black h-dvh flex flex-col justify-center items-center'>
        <p className=' text-4xl text-green-500'>Register Now</p>
        <form className=' p-6 flex flex-col w-2/5 registeer' onSubmit={usersubmit}>
            <input className=' h-10 mt-3 p-2 outline-none' type='text' name='Name' placeholder='Enter Full Name' onChange={userchange}/>
            <input className=' h-10 mt-3 p-2 outline-none' type='text' name='email' placeholder='Enter Email'onChange={userchange}/>
            <input className=' h-10 mt-3 p-2 outline-none' type='text' placeholder='Enter Country'/>
            <input className=' h-10 mt-3 p-2 outline-none' type='text' name='password' placeholder='Enter password'onChange={userchange}/>
            <input className=' bg-green-500 text-white mt-3 p-2 cursor-pointer ' type='submit' value={"Sign up"}/>
            <p className=' mt-3 cursor-pointer text-green-500' onClick={()=>location("/signup")}>already register? login now</p>
            <p className=' mt-3 cursor-pointer text-red-500' onClick={()=>seterror("")}>{error}</p>
            <p className=' mt-3 cursor-pointer text-blue-500' onClick={()=>setmassage("")} >{massage}</p>
        </form>
    </div>
  )
}
