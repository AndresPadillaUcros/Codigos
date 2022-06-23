import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';


const Layout = () => {

  


  return (
    
      <div className='d-flex flex-column h-auto '>
          <NavBar />
          <div className='d-flex flex-row vh-100'>
              <div className='h-100 w-100 ' >
                    <Outlet />
              </div>
          </div>
      </div>
   
  )
}

export default Layout