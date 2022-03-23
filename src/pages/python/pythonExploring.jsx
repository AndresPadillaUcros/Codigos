import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { useQuery,useMutation } from '@apollo/client';
import {Table,Button,Container,Modal,ModalBody,ModalHeader,ModalFooter,FormGroup} from 'reactstrap'
import useFormData from '../../hook/useFormData';
/* import 'react-toastify/dist/ReactToastify.css'; */
import { GET_CODIGOS } from '../../graphql/python/queries.ts';
import { CREAR_CODIGO, EDITAR_CODIGO, ELIMINAR_CODIGO } from '../../graphql/python/mutations.ts';

import TextareaAutosize from 'react-textarea-autosize';

const PythonExploring = () => {

  const{form, formData,updateFormData} = useFormData(null);

  const {data,loading}=useQuery(GET_CODIGOS)

  const [editarCodigo, {data:mutationDataEditar, loading:mutationLoadingEditar, error:mutationErrorEditar}] = useMutation(EDITAR_CODIGO,
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

  const submitFormEditar = (e)=>{
        e.preventDefault(); 
        console.log("fg",formData)
        editarCodigo({
            variables:{_id:datoSeleccionado._id ,...formData}
        })
        setModalEditar(false)
  };

  const submitFormInsertar = (e)=>{
    e.preventDefault(); 
    console.log("fg",formData)
    crearCodigo({
        variables:{...formData}
    })
    setModalInsertar(false)
};

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
      <Button color='primary' onClick={()=>abrirModalInsertar()}> Insertar nuevo codigo</Button>
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

      <Modal isOpen={modalEditar}>
            <ModalHeader>
                <div>
                    <h3>Editar codigo</h3>
                </div>
            </ModalHeader>

            <ModalBody>
              <form
                onSubmit={submitFormEditar}
                onChange={updateFormData}
                ref={form}
              >
                  <div className="form-group">
                    <label>Clave</label>
                    <input
                        className='form-control'
                        type="text"
                        name="clave"
                        defaultValue={datoSeleccionado && datoSeleccionado.clave}
                    />

                    <label>Descripcion</label>
                    <TextareaAutosize 
                        className='form-control'
                        type="text"
                        name="descripcion"
                        defaultValue={datoSeleccionado && datoSeleccionado.descripcion}
                    />

                    <label>Codigo</label>
                    <TextareaAutosize 
                        className='form-control'
                        type="text"
                        name="codigo"
                        defaultValue={datoSeleccionado && datoSeleccionado.codigo}
                    />
                  </div>  
                  <button className='btn btn-primary mr-2' type='submit'> Actualizar</button>
                  <button className='btn btn-danger'type='button' onClick={()=>setModalEditar(false)}> Cancelar</button>
              </form>
            </ModalBody>
      </Modal>
          
      <Modal isOpen={modalEliminar}>
            <ModalBody>
              Confirmar eliminacion?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>confirmarEliminacion()}> Si </button>
              <button className="btn btn-secondary" onClick={()=>setModalEliminar(false)}> No </button>
            </ModalFooter>
      </Modal>

      <Modal isOpen={modalInsertar}>
            <ModalHeader>
              Insertar Codigo
            </ModalHeader>
            <ModalBody>
              <form
                onSubmit={submitFormInsertar}
                onChange={updateFormData}
                ref={form}
              >
                  <div className="form-group">
                    <label>Clave</label>
                    <input
                        className='form-control'
                        type="text"
                        name="clave"
                    />

                    <label>Descripcion</label>
                    <TextareaAutosize 
                        className='form-control'
                        type="text"
                        name="descripcion"
                    />

                    <label>Codigo</label>
                    <TextareaAutosize 
                        className='form-control'
                        type="text"
                        name="codigo"
                    />
                  </div>  
                  <button className='btn btn-primary mr-2' type='submit'> Insertar</button>
                  <button className='btn btn-danger'type='button' onClick={()=>setModalInsertar(false)}> Cancelar</button>
              </form>
            </ModalBody>      
      </Modal>
  </div>
)
}


export default PythonExploring