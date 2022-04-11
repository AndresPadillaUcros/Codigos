import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom';
import Bar from '../components/Bar';

const Layout = () => {
  return (
    <div className='d-flex flex-column h-auto flex-md-row flex-nowrap'>
        <Bar />
        <div className='d-flex vh-100 vw-100 '>
            <div className='h-100 w-100 overflow-auto' >
                <Outlet />
            </div>
        </div>



    </div>
  )
}

export default Layout