import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { useQuery,useMutation } from '@apollo/client';
import {Table,Button,Container,Modal,ModalBody,ModalHeader,ModalFooter,FormGroup} from 'reactstrap'
/* import 'react-toastify/dist/ReactToastify.css'; */

import { GET_CODIGOS } from '../../graphql/python/queries.ts';
import { CREAR_CODIGO, EDITAR_CODIGO, ELIMINAR_CODIGO } from '../../graphql/python/mutations.ts';
import TextareaAutosize from 'react-textarea-autosize';

const PythonFiltering = () => {

    const {data,loading}=useQuery(GET_CODIGOS)

    const [editarCodigo, {data:mutationData, loading:mutationLoading, error:mutationError}] = useMutation(EDITAR_CODIGO,
        {refetchQueries:[{query:GET_CODIGOS} ] } );
    
    const [eliminarCodigo, {data:mutationDataEliminar, loading:mutationLoadingEliminar, error:mutationErrorEliminar}] = useMutation(ELIMINAR_CODIGO,
        {refetchQueries:[{query:GET_CODIGOS} ] } );
      
    const [crearCodigo, {data:mutationDataCrear, loading:mutationLoadingCrear}] = useMutation(CREAR_CODIGO, 
        {refetchQueries:[{query:GET_CODIGOS} ]} );


  
    const[modalEditar,setModalEditar]=useState(false)
    const[modalEliminar,setModalEliminar]=useState(false)
    const[modalInsertar,setModalInsertar]=useState(false)
    const[datoSeleccionado,setDatoSeleccionado]=useState({ })

    const seleccionarDato=(elemento,caso)=>{
        setDatoSeleccionado(elemento);
        (caso==='Editar')?setModalEditar(true):setModalEliminar(true)
              
    }
 
    const handleChange=e=>{
        const {name,value}=e.target;
        setDatoSeleccionado((prevState)=>({
          ...prevState,
          [name]:value
      })) 
    }
    
    const editar=()=>{
        var dataNueva=data.getCodigos; /* en este punto coge los datos actuales */
        const obj = {};
        dataNueva.map((cd)=>{
            if(cd._id===datoSeleccionado._id){
                obj._id=datoSeleccionado._id
                obj.clave=datoSeleccionado.clave
                obj.descripcion=datoSeleccionado.descripcion
                obj.codigo=datoSeleccionado.codigo
            }})      
        /* aqui mapea los datos nuevos que se ingresaron, el if del id es necesario para encontrar el elemento de la tabla que se selecciono*/

        editarCodigo({variables:obj})
        setModalEditar(false)
    }

    

    const insertar=()=>{
        crearCodigo({variables:datoSeleccionado})
        setModalInsertar(false)
    }

    const confirmarEliminacion=()=>{
        eliminarCodigo({variables:{_id:datoSeleccionado._id}})  
        setModalEliminar(false)
    }

    const abrirModalInsertar=()=>{
        setDatoSeleccionado(null)
        setModalInsertar(true)
    }






  if (loading) return <div> Cargando codigos...</div>

  return (
    <div>
        <h1 className='text-center'>Codigos de python </h1>
        <div className='d-flex justify-content-center mt-3'>
            <Button color='primary' onClick={()=>abrirModalInsertar()}> Insertar nuevo codigo</Button>
        </div>
        <table className="table table-striped table-bordered table-hover table-sm tabla-css mt-3">
          <thead>
            <tr className='table-primary'>
              <th>Clave</th>
              <th>Descripcion</th>
              <th>Codigo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
                {data.getCodigos.map((u)=> {
                    return(
                    <tr key={u._id} className='table-light'>
                        <td>{u.clave}</td>
                        <td><pre>{u.descripcion}</pre></td>
                        <td><pre>{u.codigo}</pre></td>
                        <td>
                            <button className='btn btn-primary' onClick={()=> seleccionarDato(u,'Editar')}>Editar</button> 
                            <button className='btn btn-danger' onClick={()=> seleccionarDato(u,'Eliminar')}>Eliminar</button>
                        </td>
                    </tr>
                    )
              })}
          </tbody>
        </table>

        <Modal isOpen={modalEditar} size ="lg" style={{maxWidth: '1000px', width: '100%'}}>
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
                    <TextareaAutosize 
                        className='form-control'
                        type="text"
                        name="descripcion"
                        value={datoSeleccionado && datoSeleccionado.descripcion}
                        onChange={handleChange}
                    />

                    <label>Codigo</label>
                    <TextareaAutosize 
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
        
        <Modal isOpen={modalEliminar} >
            <ModalBody>
              Confirmar eliminacion?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>confirmarEliminacion()}> Si </button>
              <button className="btn btn-secondary" onClick={()=>setModalEliminar(false)}> No </button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={modalInsertar} size ="lg" style={{maxWidth: '1000px', width: '100%'}}>
            <ModalHeader>
              Insertar Codigo
            </ModalHeader>
            <ModalBody>
                  <div className="form-group">
                    <label>Clave</label>
                    <input
                        className='form-control'
                        type="text"
                        name="clave"
                        onChange={handleChange}
                    />

                    <label>Descripcion</label>
                    <input
                        className='form-control'
                        type="text"
                        name="descripcion"
                        onChange={handleChange}
                    />

                    <label>Codigo</label>
                    <input
                        className='form-control'
                        type="text"
                        name="codigo"
                        onChange={handleChange}
                    />
                  </div>
              </ModalBody> 
              <ModalFooter>
                  <button className='btn btn-primary' onClick={()=>insertar()}> Insertar</button>
                  <button className='btn btn-danger' onClick={()=>setModalInsertar(false)}> Cancelar</button>
              </ModalFooter>    
        </Modal>


    </div>
  )
}

export default PythonFiltering