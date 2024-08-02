import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Apidata from './create-context'
export default function Myblog() {
  const location=useNavigate()
  const blogs=useContext(Apidata)
  const localdata=JSON.parse(localStorage.getItem("userimfo"))
  const Uemail=localdata[0].email
  const filteredblog=blogs.filter((data)=>data.email===Uemail)
  return (
    <div className='w-full h-dvh overflow-y-scroll p-4 myblog'>
      <div className='flex justify-between p-3 mb-8'>
        <p className=' font-bold text-2xl'>Your Blogs</p>
        <input type='text' placeholder='Enter Your Keyword?' className=' outline-none hidden' />
      </div>
      <div className=' grid grid-cols-3 Homepage'>
          {
            filteredblog.map((data)=>{return(
              <div className=' w-80 h-80 overflow-hidden p-1 card-component relative'>
                 <img className=' rounded w-full  h-52 cursor-pointer'  src={data.Photo} alt='' onClick={()=>{localStorage.setItem("blogimfo",JSON.stringify(data));location("/blogpage")}}/>
                 <p className=' text-green-800 h-7 overflow-hidden font-semibold'>{data.Title}</p>
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
