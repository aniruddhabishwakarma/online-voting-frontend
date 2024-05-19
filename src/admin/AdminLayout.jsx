import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'

const AdminLayout = () => {
  return (
    <>
    <Sidebar/>
    <Outlet/>
    </>
  )
}

export default AdminLayout