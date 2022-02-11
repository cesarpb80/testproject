import fetchWrapper from '../helpers/fetch-wrapper';
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
//const api = "http://localhost:8091"
//const api = "http://host.docker.internal:8091"
const api = "http://host.docker.internal:9090/servicio-ws"
const APISERVICIOS = `${api}/servicios`;

const servicioService = {
    getServiciosPorCliente: async(id) => {
        return await (fetchWrapper.get(`${APISERVICIOS}/${id}`));
    }, 
    setServiciosPorCliente: async(data) => {
        return await (fetchWrapper.post(`${APISERVICIOS}`, data));
    }
}

export default servicioService;