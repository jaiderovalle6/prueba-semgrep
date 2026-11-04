import axios from 'axios';

const API_URL = 'http://localhost:3000/api/productos';

// Consultar productos
export const obtenerProductos = async () => {
    const respuesta = await axios.get(API_URL);
    return respuesta.data;
};

// Registrar producto
export const crearProducto = async (producto) => {
    const respuesta = await axios.post(API_URL, producto);
    return respuesta.data;
};

// Actualizar producto
export const actualizarProducto = async (id, producto) => {
    const respuesta = await axios.put(`${API_URL}/${id}`, producto);
    return respuesta.data;
};

// Eliminar producto
export const eliminarProducto = async (id) => {
    const respuesta = await axios.delete(`${API_URL}/${id}`);
    return respuesta.data;
};
