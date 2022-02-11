import fetchWrapper from '../helpers/fetch-wrapper';
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
//const api = "http://localhost:8092"
//const api = "http://host.docker.internal:8092"
const api = "http://host.docker.internal:9090/cliente-ws"
const APICLIENTE = `${api}/clientes`;

const clienteService = {
    getClientes: async() => {        
        return await (fetchWrapper.get(`${APICLIENTE}`));
    },
    getClientePorCedula: async(cedula) => {
        return await (fetchWrapper.get(`${APICLIENTE}/clientebycedula?cedula=${cedula}`));
    },
    insertCliente: async(data) => {        
        return await (fetchWrapper.post(`${APICLIENTE}`, data));
    },
    updateCliente: async(data) => {
        return await (fetchWrapper.put(`${APICLIENTE}`, data));
    },
    deleteCliente: async(id) => {
        return await (fetchWrapper.delete(`${APICLIENTE}/${id}`));
    }
}

export default clienteService;