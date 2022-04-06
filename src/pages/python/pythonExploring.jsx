import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { useQuery,useMutation } from '@apollo/client';
import {Table,Button,Container,Modal,ModalBody,ModalHeader,ModalFooter,FormGroup} from 'reactstrap'
import useFormData from '../../hook/useFormData';
/* import 'react-toastify/dist/ReactToastify.css'; */
import { GET_CODIGOS } from '../../graphql/python/queries.ts';
import { CREAR_CODIGO, EDITAR_CODIGO, ELIMINAR_CODIGO } from '../../graphql/python/mutations.ts';

import Tooltip from '@material-ui/core/Tooltip';
import TextareaAutosize from 'react-textarea-autosize';
import DropDown from '../../components/Dropdown.jsx'
import { Enum_Clave } from '../../utils/enums';

const PythonExploring = () => {

  const{form, formData,updateFormData} = useFormData(null);

  function useCodigoFilters(){
    const[filters,setFilter]=useState({
      clave:undefined
    })

    const updateFilter=(filterType,value)=>{
      setFilter({
        [filterType]:value,
      });
      console.log(value)
    }

    return{
      models:{filters},
      operations:{updateFilter}
    }
  }

  const {operations,models}=useCodigoFilters()

  const {data,loading,refetch}=useQuery(GET_CODIGOS, {variables:{filtro:{clave:"String"}}})

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


/* const newData=data.getCodigos.find((a)=>a.clave=='Exploring')

console.log('la data filtrada es ',newData)

if(!newData){
  newData=data
} */

  return (
    <div>
        <h1 className='text-center'>Codigos de python </h1>
        <div className='d-flex justify-content-center mt-3'>
          <Button color='primary' onClick={()=>abrirModalInsertar()}> Insertar nuevo codigo</Button>
        </div>
        <div onChange={(e)=>operations.updateFilter("clave", e.target.value)} type='String'>
          <DropDown
                label='Tipo de codigo:'
                name='estado'
                defaultValue={1}
                required={true}
                options={Enum_Clave}
          />
          <button onClick={() => refetch({ filtro: { clave: models.filters.clave },}) }>
            Go
          </button>
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
                          <Tooltip title='Editar'>
                            <i className='fas fa-pen text-warning cursor-pointer' role="button" onClick={()=> seleccionarDato(u,'Editar')} />
                          </Tooltip>

                          <Tooltip title='Eliminar'>
                            <i className='fas fa-trash text-dark px-2' role="button" onClick={()=> seleccionarDato(u,'Eliminar')}/>
                          </Tooltip>
                        </td>

                    </tr>
                    )
              })}
          </tbody>
        </table>

        <Modal isOpen={modalEditar}  size ="lg" style={{maxWidth: '1000px', width: '100%'}}>
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
                      <select
                          name="clave"
                          className='form-select'
                          defaultValue={datoSeleccionado && datoSeleccionado.clave}
                      >
                          {Object.entries(Enum_Clave).map((o) => {
                            return (
                              <option  value={o[0]} >
                                {o[0]}
                              </option>
                            );
                          })}
                      </select>
                      

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

        <Modal isOpen={modalInsertar}  size ="lg" style={{maxWidth: '1000px', width: '100%'}}>
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
                      <select
                          name="clave"
                          className='form-select'
                          defaultValue={datoSeleccionado && datoSeleccionado.clave}
                      >
                          {Object.entries(Enum_Clave).map((o) => {
                            return (
                              <option  value={o[0]} >
                                {o[0]}
                              </option>
                            );
                          })}
                      </select>

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