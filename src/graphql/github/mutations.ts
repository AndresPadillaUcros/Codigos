import {gql} from '@apollo/client'

const EDITAR_CODIGO = gql`
    mutation EditarCodigoGithub(
    $_id: String!, 
    $descripcion: String, 
    $codigo: String!
    ) {
        editarCodigoGithub(
        _id: $_id, 
        descripcion: $descripcion, 
        codigo: $codigo
        ) {
        _id
        descripcion
        codigo
        }
    }
`;

const ELIMINAR_CODIGO = gql`
    mutation EliminarCodigoGithub(
    $_id: String
    ) {
        eliminarCodigoGithub(
        _id: $_id
            ) {
            _id
            descripcion
            codigo
    }
    }
`;

const CREAR_CODIGO = gql`
    mutation CrearCodigoGithub(
    $descripcion: String!, 
    $codigo: String!
    ) {
        crearCodigoGithub(
        descripcion: $descripcion, 
        codigo: $codigo
        ) {
        _id
        descripcion
        codigo
        }
    }
`;


export {EDITAR_CODIGO,ELIMINAR_CODIGO, CREAR_CODIGO  };


/*  deben ir los campos que se van actualizar  la base de datos en las ultimas llavesen */