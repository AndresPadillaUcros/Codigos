import React from 'react'


const SideBar = () => {
  return (
    <div className="d-flex flex-column h-100 flex-md-row flex-nowrap "> 
 
        <nav id="sidebar" className='vh-100 '>
            <div className="sidebar-header">
                <h3>Andres</h3>
            </div>

            <ul className="list-unstyled components">
                <p> </p>

                <li>
                    <a href="/python">Python</a>
                </li>

                <li>
                    <a href="/github">Github</a>
                </li>


            </ul>

        </nav>   
        
        <div >
                <div >
                    <button type="button" id="sidebarCollapse" class="btn btn-info">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                </div>
        </div>


    </div>


    

  )
}

export default SideBar