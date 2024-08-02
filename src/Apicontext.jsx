import React, { useState } from 'react'
import Apidata from './create-context'
import url from './globle'

export default function Apicontext(prop) {
    const [api,changeapi]=useState([])
    useState(()=>{
    const fetchdata=async()=>{
        await fetch(`${url}blogs`,{
            method:"GET"
        }).then(async(res)=>await res.json())
        .then((data)=>changeapi(data))
        .catch((err)=>console.log(err))
    }
    fetchdata()
}
)
  return (
    <Apidata.Provider value={api}>
        {prop.children}
    </Apidata.Provider>
  )
}
