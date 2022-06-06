import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';


const Layout = () => {

  


  return (
    
      <div className='d-flex flex-column h-auto flex-md-row flex-nowrap'>
          <SideBar />
          <div className='d-flex vh-100 vw-100 '>
              <div className='h-100 w-100 overflow-auto' >
                    <Outlet />
              </div>
          </div>
      </div>
   
  )
}

export default Layout