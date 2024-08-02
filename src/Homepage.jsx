import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Apidata from "./create-context"
export default function Homepage() {
const location=useNavigate()  
const blogs=useContext(Apidata)
const [search,changesearch]=useState([])
const Searchdata=(e)=>{
  const data=blogs.filter((data)=>data.Title.toUpperCase().includes(e.target.value.toUpperCase()))
  changesearch(data)
}
  return (
    <div className='w-full overflow-y-scroll h-dvh p-4 relative '>
      {
        blogs.length!==search.length?
      
      <div className='w-60 pl-2 pt-1 absolute right-0 top-14  bg-slate-300 search1 '> 
        {
          search.map((data,key)=>{return(
            <div className='flex cursor-pointer mb-3 mr-1' key={key}>
              <img className='w-20 h-14 pr-2' src={data.Photo} alt=''  onClick={()=>{localStorage.setItem("blogimfo",JSON.stringify(data));location("/blogpage")}}/>
              <div>
                <p className='h-7 overflow-hidden font-semibold'>{data.Title}</p>
                <p className='mt-0 text-sm'>By:- {data.PostedBy}</p>
              </div>
            </div>
          )})
        }
      </div>
      :<p className=' hidden'></p>
      }
      <div className='flex justify-between p-3 mb-8'>
        <p className=' font-bold text-2xl '>Our Stories</p>
        <input type='text' placeholder='Enter Your Keyword?' className='search outline-none' onChange={Searchdata}/>
      </div>

        <div className=' grid grid-cols-3 Homepage'>
          {
            blogs.map((data,key)=>{return(
              <div className=' w-80 h-80 overflow-hidden p-1 card-component' key={key}>
                 <img className=' cursor-pointer rounded w-full   h-52' src={data.Photo} alt='' onClick={()=>{localStorage.setItem("blogimfo",JSON.stringify(data));location("/blogpage")}}/>
                 <p className=' text-green-800 h-8 overflow-hidden font-semibold'>{data.Title}</p>
                 <div className='flex justify-between text-sm'>
                    <p>By {data.PostedBy}</p>
                    <p>{data.Date}</p>
                 </div>
                <p className='text-gray-600 text-sm mt-3'>{data.Discription}</p>
              </div>

            )})
          }
      </div>
    </div>
  )
}
