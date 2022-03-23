import React, { useState, useEffect } from 'react'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableCell,
  TableContainer,
  TableRowColumn,
  TableHead,
  Paper,
  TableSortLabel
} from "@material-ui/core";



const Proyectos = () => {

  function createData(number, item, qty, price) {
    return { number, item, qty, price };
   }
    
   const rows = [
    createData(1, "Apple", 5, 3 ),
    createData(2, "Orange", 2, 2 ),
    createData(3, "Grapes", 3, 1 ),
    createData(4, "Tomato", 2, 1.6 ),
    createData(5, "Mango", 1.5, 4 )
   ];

  const [rowData, setRowData] = useState(rows);
  const [orderDirection, setOrderDirection] = useState("asc");

  const sortArray = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.price > b.price ? 1 : b.price > a.price ? -1 : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.price < b.price ? 1 : b.price < a.price ? -1 : 0
        );
    }
  };
  
  const handleSortRequest = () => {
    setRowData(sortArray(rows, orderDirection));
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };

  useEffect(()=>{
    if (rows){
        console.log('nuevo orden es:',rows)
    }
  },[handleSortRequest])

    return (
        <TableContainer component={Paper} className='tabla-mui'>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell align="center">Item</TableCell>
                <TableCell>Quantity (kg)</TableCell>
                <TableCell align="center" onClick={handleSortRequest}>
                  <TableSortLabel active={true} direction={orderDirection}>
                    Price ($)
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((u) => (
                <TableRow key={u.number}>
                  <TableCell component="th" scope="row">{u.number} </TableCell>
                  <TableCell align="right">{u.item}</TableCell>
                  <TableCell align="right">{u.qty}</TableCell>
                  <TableCell align="right">{u.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  )
}


export default Proyectos

