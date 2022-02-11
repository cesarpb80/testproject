import fetchWrapper from '../helpers/fetch-wrapper';
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
//const api = "http://localhost:8091"
//const api = "http://host.docker.internal:8091"
const api = "http://host.docker.internal:9090/servicio-ws"
const APICATEGORIA = `${api}/categorias`;

const categoriaService = {
    getCategorias: async() => {
        return fetchWrapper.get(`${APICATEGORIA}`);
    }
}

export default categoriaService;