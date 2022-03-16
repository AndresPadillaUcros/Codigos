import React from 'react'
import './../styles/style.css'

const Bar = () => {
  return (
    <div className="d-flex flex-column flex-md-row flex-nowrap"> 
 
        <nav id="sidebar" className='vh-100'>
            <div className="sidebar-header">
                <h3>Andres</h3>
            </div>

            <ul className="list-unstyled components">
                <p> </p>

                <li className="active">
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Python</a>
                    <ul className="collapse list-unstyled" id="homeSubmenu">
                        <li>
                            <a href="/python">Exploring</a>
                        </li>
                        <li>
                            <a href="/python">Filtering</a>
                        </li>
                        <li>
                            <a href="/python">Time series</a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Desarrollo Web</a>
                    <ul className="collapse list-unstyled" id="pageSubmenu">
                        <li>
                            <a href="/desarrollo">Front</a>
                        </li>
                        <li>
                            <a href="/desarrollo">Back</a>
                        </li>

                    </ul>
                </li>

                <li>
                    <a href="/github">Github</a>
                </li>

                <li>
                    <a href="/proyectos">Proyectos</a>
                </li>

            </ul>

        </nav>     
    </div>

  )
}

export default Bar