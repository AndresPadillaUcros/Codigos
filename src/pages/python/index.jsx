import React, { useState, useEffect } from 'react';
import { useQuery,useMutation } from '@apollo/client';
import {Button,Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap'
import useFormData from '../../hook/useFormData';
import { Loading } from 'react-loading-dot'
/* import 'react-toastify/dist/ReactToastify.css'; */
import { GET_CODIGOS } from '../../graphql/python/queries.ts';
import { CREAR_CODIGO, EDITAR_CODIGO, ELIMINAR_CODIGO } from '../../graphql/python/mutations.ts';

import Tooltip from '@material-ui/core/Tooltip';
import TextareaAutosize from 'react-textarea-autosize';
import DropDown from '../../components/Dropdown.jsx'
import { Enum_Clave } from '../../utils/enums';


const PythonExploring = () => {


  

  const clave=localStorage.getItem('contraseña')

  const{form, formData,updateFormData} = useFormData(null);

  const {data,loading,refetch}=useQuery(GET_CODIGOS)

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
  const[dropDownOption, setdropDownOption] = useState();
  const [isButtondisabled, setIsButtonDisabled] = useState(true)

  const seleccionarDato=(elemento,caso)=>{
      setDatoSeleccionado(elemento);
      (caso==='Editar')?setModalEditar(true):setModalEliminar(true)      
  }

  const submitFormEditar = (e)=>{
        e.preventDefault(); 
        editarCodigo({
            variables:{_id:datoSeleccionado._id ,...formData}
        })
        setModalEditar(false)
  };

  const submitFormInsertar = (e)=>{
    e.preventDefault(); 
    crearCodigo({
        variables:{...formData}
    })
    setModalInsertar(false)
    refetch({ filtro: { clave: dropDownOption}})

};

  const confirmarEliminacion=()=>{
    eliminarCodigo({variables:{_id:datoSeleccionado._id}})  
    setModalEliminar(false)
    refetch({ filtro: { clave: dropDownOption}})
}

  const abrirModalInsertar=()=>{
    setDatoSeleccionado(null)
    setModalInsertar(true)
  
  }

  function changeDropBoxOption(e) {
    refetch({ filtro: { clave: e.target.value }})
    setdropDownOption(e.target.value);
  }

  useEffect ( ()=>{
       
        if (clave===process.env.REACT_APP_CLAVE){

          setIsButtonDisabled(false);
        }else{

          setIsButtonDisabled(true);
        }
  },[loading,clave])



  if (loading) return <div> <Loading background="blue" /></div>


  return (
    <div>
        <h1 className='text-center'>Codigos de python </h1>

        <div className='d-flex justify-content-center mt-3'>
          <Button color='primary' onClick={()=>abrirModalInsertar()}> Insertar nuevo codigo</Button>
        </div>
        <div onChange={changeDropBoxOption}>
          <DropDown
                label='Tipo de codigo:'
                name='estado'
                required={true}
                options={Enum_Clave}
          />
        </div>

        <table className="table table-striped table-bordered table-hover table-sm tabla-css mt-3">
          <thead>
            <tr className='table-primary'>
              <th>Tipo</th>
              <th>Descripcion</th>
              <th>Codigo</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
                {data.getCodigos.map((u)=> {
                    return(
                    <tr key={u._id} className='table-light'>
                        <td width="25%">{u.tipo}</td>
                        <td width="35%"><pre>{u.descripcion}</pre></td>
                        <td width="35%"><pre>{u.codigo}</pre></td>
                        <td width="5%">
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
                      <label>Tipo</label>
                      <TextareaAutosize 
                          className='form-control'
                          type="text"
                          name="tipo"
                          defaultValue={datoSeleccionado && datoSeleccionado.tipo}
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
                    <button id="boton-actualizar" className='btn btn-primary mr-2' type='submit' disabled={isButtondisabled}  > Actualizar</button>
                    <button className='btn btn-danger'type='button' onClick={()=>setModalEditar(false)}> Cancelar</button>
                </form>
              </ModalBody>
        </Modal>
            
        <Modal isOpen={modalEliminar}>
              <ModalBody>
                Confirmar eliminacion?
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-danger" onClick={()=>confirmarEliminacion() } disabled={isButtondisabled} > Si </button>
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
                          defaultValue={dropDownOption}
                      >
                          {Object.entries(Enum_Clave).map((o) => {
                            return (
                              <option  value={o[0]} >
                                {o[0]}
                              </option>
                            );
                          })}
                      </select>

                      <label>Tipo</label>
                      <TextareaAutosize 
                          className='form-control'
                          type="text"
                          name="tipo"
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
                    <button className='btn btn-primary mr-2' type='submit' > Insertar</button>
                    <button className='btn btn-danger'type='button' onClick={()=>setModalInsertar(false)}> Cancelar</button>
                </form>
              </ModalBody>      
        </Modal>
    </div>
  )
  }


export default PythonExploring