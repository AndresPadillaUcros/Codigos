import {useUser} from '../context/userContext';
import React, { useState, useEffect } from 'react';
import RenderIf
 from './RenderIf';

const SideBar = () => {

    const {userData,setUserData} =useUser()


    const Upload=(e)=>{
        e.preventDefault();
        const clave=e.target[0].value;
        setUserData({clave:clave})    
        localStorage.setItem('contraseña', clave)
    }

    const ConAcceso =()=>{
        return <div className='color-accesso'> Tienes acceso para editar </div>

    }
    const ContraseñaIncorrecta=()=>{
        return <div className='color-accesso'> Contraseña incorrecta </div>
    }
    
    const clave =localStorage.getItem('contraseña')

    


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
            <div>
                Contraseña para editar:
                <br /><br />
                <form onSubmit={Upload} >
                    <input type="text" name="clave" defaultValue={clave} />
                    <input type="submit" value="Go"  /> 
                </form>
     
                <RenderIf isTrue={clave==process.env.REACT_APP_CLAVE }>
                    <ConAcceso />
                </RenderIf>
                
                <RenderIf isTrue={ (clave) && (clave!=process.env.REACT_APP_CLAVE) }>
                    <ContraseñaIncorrecta/>
                </RenderIf>





            </div>
        </nav>   
        
        <div >
                <div >
                    <button type="button" id="sidebarCollapse" className="btn btn-info">
                        <i className="fas fa-arrow-left"></i>
                    </button>
                </div>
        </div>


    </div>


    

  )
}

export default SideBar