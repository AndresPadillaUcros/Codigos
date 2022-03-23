import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'

const Github = () => {


  const [tableData,setTableData]=useState([
    {clave:'Datetime',descripcion:'sacar el mes',codigo:'alasss'},
    {clave:'Filter',descripcion:'filtrar comunes',codigo:'bebeees'}
  ])
  const columnas=[
    {title:'Clave',field:'clave'},
    {title:'Descripcion',field:'descripcion'},
    {title:'Codigo',field:'codigo'},
  ];



  return (
    <div>
        <MaterialTable columns={columnas} data={tableData} />
    </div>
  )
}

export default Github