import React, { useState } from 'react'
import url from "./globle"
export default function Newpost() {
  const localdata=JSON.parse(localStorage.getItem("userimfo"))
  const [loader,changeloader]=useState("submit")
  const date=new Date()
  const [blog,changeblog]=useState({
    PostedBy:localdata[0].name,
    email:localdata[0].email,
    Title:"",
    Discription:"",
    Images:"",
    comments:[],
    Dates:date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()
  })


  const ChangeHandle=(e)=>{
    changeblog({...blog,[e.target.name]:e.target.value})
  }
  
  const ImgTostr=(e)=>{
    const reader=new FileReader(e)
    reader.readAsDataURL(e.target.files[0])
    reader.onload=()=>{
      changeblog({...blog,Images:reader.result})
      
   }
  }

  const Submitblog=async(e)=>{
    e.preventDefault()
    changeloader("Wait...")
    await fetch(`${url}postblog`,{
      method:"POST",
      body:JSON.stringify(blog),
      headers:{
        "content-type":"application/json"
      }
    })
    .then(async(res)=>await res.json())
    .then((data)=>{
      if(data==="Blog Posted Successfully"){
        window.location.assign("/homepage")
      }
    })
    .then(changeloader("Submit"))
    .catch((err)=>console.log(err))
  }
  
  return (
    <div className='w-full flex flex-col items-center justify-center h-dvh bg-black '>
      <p className='text-slate-700 text-4xl'>Upload New Blog</p>
        <form className=' bg-black p-6 flex flex-col w-2/4 NewBlog' onSubmit={Submitblog}>
            <input className=' h-10 mt-3 p-2 outline-none' type='text' placeholder='Enter Title' name="Title" onChange={ChangeHandle}/>
            <textarea className=' h-56 mt-3 p-2 outline-none' placeholder='Enter discription'name="Discription" onChange={ChangeHandle}/>
            <input type='file' className='mt-3' onChange={ImgTostr}/>
            <input className=' bg-slate-600 text-white mt-3 p-2 cursor-pointer ' type='submit' value={loader}/>
        </form>
    </div>
  )
}
