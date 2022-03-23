import {gql} from '@apollo/client'

const GET_CODIGOS= gql`
    query GetCodigos {
    getCodigos {
        _id
        clave
        descripcion
        codigo
    }
    }
`;



export {GET_CODIGOS};