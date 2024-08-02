import React, { useState } from 'react'
import url from "./globle"
import image from "./images/admin.png"
export default function Blogpage() {
    const localemail=JSON.parse(localStorage.getItem("userimfo"))[0].email
    const[blog,updateblog]=useState({
        Date:"",
        Discription:"",
        Photo:"",
        PostedBy:"",
        Title:"",
        email:"",
        _id:"",
        Comments:[]
    })

    const [comment,changecomment]=useState("")
    const blogdata=JSON.parse(localStorage.getItem("blogimfo"))
    useState(()=>{
        updateblog(blogdata)
    })

    const deleteblog=async(id)=>{
       console.log(id)
       await fetch(`${url}deleteblog`,{
        method:"POST",
        body:JSON.stringify({id}),
        headers:{
            'content-type':'application/json'
        }
       })
       .catch((err)=>console.log(err))
       .then(
        window.setTimeout(function(){
        window.location.href = "/homepage";
        }, 2500))
        
    }

    const changehandle=(e)=>{
        changecomment(e.target.value)   
    }


    const Addcomment=async()=>{     
        const id=blog._id
        await fetch(`${url}comment`,{
            method:"POST",
            body:JSON.stringify({comment,id}),
            headers:{
                "content-type":"application/json"
            }
        })
        .then(async(res)=>await res.json())
        .then((data)=>console.log(data))
        .then(
        window.setTimeout(function(){
        window.location.href = "/homepage";
        }, 2500))
        .catch((err)=>console.log(err))
    }
    
  return (
    <div className='w-full h-dvh overflow-y-scroll relative flex blogpage' style={{scrollbarWidth:"none"}}>
        <div className='w-3/4 p-5 blogpage1'>
           <div className='flex justify-between'>
              <p className=' font-bold text-2xl  text-fuchsia-950'>{blog.Title}</p>
              {
                localemail===blog.email?<p className='p-2 h-10 bg-red-600 cursor-pointer text-white' onClick={()=>deleteblog(blog._id)}>Delete</p>:
                <div></div>
              }
           </div>
           <img className='w-full h-80 mt-4' src={blog.Photo} alt='' />
           <div className='flex justify-between'>
             <p className=' font-semibold mt-4'>Author:- {blog.PostedBy}</p>
             <p className='mt-4 text-red-950'>Posted on {blog.Date}</p>
           </div>
           <p className='mt-6 font-extralight'><i>{blog.Discription}</i></p>
        </div>


        <div className='w-1/5  fixed right-0 comment '>
            <div className=' border border-b-amber-500 flex p-5 '>
                <input type='text' placeholder='Add comment... ' onChange={changehandle} className=' outline-none border-black border-b-0 text '/>
                <button className=' text-blue-800 cursor-pointer' onClick={Addcomment}>Post</button>
            </div>
            <div className=' mt-3   '>
                {
                    blog.Comments.map((data)=>{
                        return(
                            <div className='flex items-center mb-3'>
                                 <img className='w-10 h-10 mr-2 rounded-[50%]' style={{border:"1px solid black"}} src={image} alt=''/>
                                 <p>{data}</p>
                            </div>
                        )
                    })
                }             
            </div>
        </div>
    </div>
  )
}
