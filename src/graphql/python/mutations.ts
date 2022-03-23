import {gql} from '@apollo/client'

const EDITAR_CODIGO = gql`
    mutation EditarCodigo(
    $_id: String!, 
    $clave: String!, 
    $descripcion: String!, 
    $codigo: String!
    ) {
        editarCodigo(
        _id: $_id, 
        clave: $clave, 
        descripcion: $descripcion, 
        codigo: $codigo
        ) {
        _id
        clave
        descripcion
        codigo
        }
    }
`;

const ELIMINAR_CODIGO = gql`
    mutation EliminarCodigo(
    $_id: String
    ) {
        eliminarCodigo(
        _id: $_id
            ) {
            _id
            clave
            descripcion
            codigo
    }
    }
`;

const CREAR_CODIGO = gql`
    mutation CrearCodigo(
    $clave: String!, 
    $descripcion: String!, 
    $codigo: String!
    ) {
        crearCodigo(
        clave: $clave, 
        descripcion: $descripcion, 
        codigo: $codigo
        ) {
        _id
        clave
        descripcion
        codigo
        }
    }
`;




export {EDITAR_CODIGO,ELIMINAR_CODIGO, CREAR_CODIGO  };


/*  deben ir los campos que se van actualizar  la base de datos en las ultimas llavesen */