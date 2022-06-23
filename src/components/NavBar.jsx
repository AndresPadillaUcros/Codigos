import React, { useState, useEffect } from 'react';
import RenderIf from './RenderIf';

const NavBar = () => {

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
        return <div className='color-accesso mt-0'> Tienes acceso para editar </div>

    }
    const ContraseñaIncorrecta=()=>{
        return <div className='color-accesso mt-0'> Contraseña incorrecta </div>
    }
    

  return (
    <>
      <header className='header'>
        <nav className='my-navbar'>
          <span  className='logo navbar-link'>Andres Padilla</span>
          <div>
                <div className='d-flex flex-row pt-2'>
                    Contraseña para editar: 
                    <br /><br />
                    <form onSubmit={Upload} className='ml-3'>
                        <input type="text" name="clave" defaultValue={contraseña} />
                        <input type="submit" value="Go"  /> 
                    </form>
                </div>
     
                <RenderIf isTrue={contraseña==process.env.REACT_APP_CLAVE }>
                    <ConAcceso />
                </RenderIf>
                
                <RenderIf isTrue={ (contraseña) && (contraseña!=process.env.REACT_APP_CLAVE) }>
                    <ContraseñaIncorrecta/>
                </RenderIf>
            </div>


          <ul className='navbar-menu'>
            <li className='navbar-menu-item'>
              <a href="/python" data-offset="100" className='navbar-menu-link navbar-link'>Python</a>
            </li>
            <li className='navbar-menu-item'>
              <a href="/github" className='navbar-menu-link navbar-link'>Github</a>
            </li>


          </ul>

        </nav>
      </header>
    
    </>



  )
}


export default NavBar