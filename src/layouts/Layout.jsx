import React from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate, Outlet } from 'react-router-dom';
import Bar from '../components/Bar';

const Layout = () => {
  return (
    <div className='d-flex flex-column flex-md-row flex-nowrap'>
        <Bar />
        <div className='d-flex vh-100 w-100'>
            <div className='w-full h-full  overflow-y-scroll w-100' >
                <Outlet />
            </div>
        </div>



    </div>
  )
}

export default Layout