import React, { useState, useEffect } from 'react';
import RenderIf from './RenderIf';
import axios from 'axios';



const SideBar = () => {

    const [contraseña,setContraseña]=useState(null)

    useEffect(()=>{
        setContraseña(localStorage.getItem('contraseña'))
    },[])

    

    const Upload=async(e)=>{
        e.preventDefault();
        const clave=e.target[0].value;
        
        setContraseña(clave)
        console.log(contraseña)
        localStorage.setItem('contraseña', clave)

        /*         const options={
                    method:'POST',
                    url:'http://localhost:4000/password',
                    headers:{'Content-Type':'application/json'},
                    data:{contraseña:clave}
                }

                await axios.request(options).then(function(response){
                    console.log(response.data)
                })
                    .catch(function(error){
                        console.error(error)
                    })    */
    }

    const ConAcceso =()=>{
        return <div className='color-accesso'> Tienes acceso para editar </div>

    }
    const ContraseñaIncorrecta=()=>{
        return <div className='color-accesso'> Contraseña incorrecta </div>
    }
    


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
                    <input type="text" name="clave" defaultValue={contraseña} />
                    <input type="submit" value="Go"  /> 
                </form>
     
                <RenderIf isTrue={contraseña==process.env.REACT_APP_CLAVE }>
                    <ConAcceso />
                </RenderIf>
                
                <RenderIf isTrue={ (contraseña) && (contraseña!=process.env.REACT_APP_CLAVE) }>
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