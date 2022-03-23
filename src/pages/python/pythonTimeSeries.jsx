import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { useQuery,useMutation } from '@apollo/client';
import {Table,Button,Container,Modal,ModalBody,ModalHeader,ModalFooter,FormGroup} from 'reactstrap'
/* import 'react-toastify/dist/ReactToastify.css'; */

import { GET_CODIGOS } from '../../graphql/python/queries.ts';
import { EDITAR_CODIGO } from '../../graphql/python/mutations.ts';


const PythonTimeSeries= () => {

    
    const data =[
        {clave:'time',descripcion:'alas',codigo:'codigo1'},
        {clave:'series',descripcion:'patas',codigo:'codigo2'},
    ]
    
    const[dataTable,setDataTable]=useState(data)
    
/*     useEffect(()=>{
        if(data){
            console.log('me ejecuto al principio y cuando abro el modal')
            setDataTable(data)
        }
    },[data]) */


    const[modalEditar,setModalEditar]=useState(false)

    const[datoSeleccionado,setDatoSeleccionado]=useState({
        clave:'',
        descripcion:'',
        codigo:'',
    })

  
    const seleccionarDato=(elemento,caso)=>{
        setDatoSeleccionado(elemento);
        (caso==='Editar')&&setModalEditar(true)    
    }
  
    const handleChange=e=>{
        const {name,value}=e.target;
        setDatoSeleccionado((prevState)=>({
          ...prevState,
          [name]:value
      })) 
        /* Esto hace que el datoSeleccionado venga con todos los campos y el campo editado, si se quita el prevState, solo sale el campo editado */
    }

    const editar=()=>{
        var dataNueva=dataTable; /* en este punto coge los datos actuales */
        console.log("los datos actuales son:",dataNueva)
        console.log("dato seleccionado",datoSeleccionado)
        dataNueva.map(cd=>{
            if(cd.clave===datoSeleccionado.clave){
                cd.descripcion=datoSeleccionado.descripcion
                cd.codigo=datoSeleccionado.codigo
            }
      }) /* aqui mapea los datos nuevos que se ingresaron, el if del id es necesario para encontrar el elemento de la tabla que se selecciono*/
      
      setDataTable(dataNueva)
      setModalEditar(false)
    }
    

  /* console.log('la datatable es',dataTable) */
  
  

  return (
    <div>
        <h1 className='text-center'>Codigos de python </h1>
        <Button color='primary'> Insertar nuevo codigo</Button>
        <table className="table table-striped table-bordered table-hover table-sm tabla-css">
          <thead>
            <tr className='table-primary'>
              <th>Clave</th>
              <th>Descripcion</th>
              <th>Codigo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
                {dataTable.map((u)=> {
                    return(
                    <tr key={u._id} className='table-light'>
                        <td>{u.clave}</td>
                        <td>{u.descripcion}</td>
                        <td><pre>{u.codigo}</pre></td>
                        <td>
                            <button className='btn btn-primary' onClick={()=> seleccionarDato(u,'Editar')}>Editar</button> 
                            <button className='btn btn-danger'>Eliminar</button>
                        </td>
                    </tr>
                    )
              })}
          </tbody>
        </table>

        <Modal isOpen={modalEditar}>
              <ModalHeader>
                  <div>
                      <h3>Editar codigo</h3>
                  </div>
              </ModalHeader>

              <ModalBody>
                  <div className="form-group">
                    <label>Clave</label>
                    <input
                        className='form-control'
                        type="text"
                        name="clave"
                        value={datoSeleccionado && datoSeleccionado.clave}
                        onChange={handleChange}
                    />

                    <label>Descripcion</label>
                    <input
                        className='form-control'
                        type="text"
                        name="descripcion"
                        value={datoSeleccionado && datoSeleccionado.descripcion}
                        onChange={handleChange}
                    />

                    <label>Codigo</label>
                    <input
                        className='form-control'
                        type="text"
                        name="codigo"
                        value={datoSeleccionado && datoSeleccionado.codigo}
                        onChange={handleChange}
                    />
                  </div>
              </ModalBody>
              <ModalFooter>
                  <button className='btn btn-primary' onClick={()=>editar()}> Actualizar</button>
                  <button className='btn btn-danger' onClick={()=>setModalEditar(false)}> Cancelar</button>
              </ModalFooter>

        </Modal>
    </div>
  )
}

export default PythonTimeSeries