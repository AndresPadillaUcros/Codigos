import {gql} from '@apollo/client'

const GET_CODIGOS= gql`
    query GetCodigosGithub {
    getCodigosGithub {
        _id
        descripcion
        codigo
    }
    }
`;



export {GET_CODIGOS};