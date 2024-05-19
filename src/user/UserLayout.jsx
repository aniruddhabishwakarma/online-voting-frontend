import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'

const UserLayout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}

export default UserLayout;