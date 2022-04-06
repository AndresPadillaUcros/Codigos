import {gql} from '@apollo/client'

const GET_CODIGOS= gql`
    query GetCodigos($filtro: FiltroCodigos) {
    getCodigos(filtro: $filtro) {
        _id
        clave
        descripcion
        codigo
    }
    }
`;



export {GET_CODIGOS};