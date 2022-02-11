import fetchWrapper from '../helpers/fetch-wrapper';
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
//const api = "http://localhost:8092"
//const api = "http://host.docker.internal:8092"
const api = "http://host.docker.internal:9090/cliente-ws"
const APIPAIS = `${api}/paises`;

const paisService = {
    getPaises: async() => {
        return fetchWrapper.get(`${APIPAIS}`);
    }
}

export default paisService;