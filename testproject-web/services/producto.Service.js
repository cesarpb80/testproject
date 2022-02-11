import fetchWrapper from '../helpers/fetch-wrapper';
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
//const api = "http://localhost:8091"
//const api = "http://host.docker.internal:8091"
const api = "http://host.docker.internal:9090/servicio-ws"
const APIPRODUCTO = `${api}/productos`;

const productoService = {
    getProductos: async() => {        
        return await (fetchWrapper.get(`${APIPRODUCTO}`));
    },
    getProductosByCondicion: async(edad, residencia, ingreso) => {        
        return await (fetchWrapper.get(`${APIPRODUCTO}/productosbycondicion?edad=${edad}&residencia=${residencia}&ingreso=${ingreso}`));
    },
    insertProducto: async(data) => {        
        return await (fetchWrapper.post(`${APIPRODUCTO}`, data));
    },
    updateProducto: async(data) => {        
        return await (fetchWrapper.put(`${APIPRODUCTO}`, data));
    },
    deleteProducto: async(id) => {
        return await (fetchWrapper.delete(`${APIPRODUCTO}/${id}`));
    }
}

export default productoService;
