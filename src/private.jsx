import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedComponent=()=>{
    const auth=localStorage.getItem("userimfo")
    return auth ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedComponent