const express = require('express');
const router = express.Router();

const {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productoController');

// Consultar productos
router.get('/', obtenerProductos);

// Registrar producto
router.post('/', crearProducto);

// Actualizar producto
router.put('/:id', actualizarProducto);

// Eliminar producto
router.delete('/:id', eliminarProducto);

module.exports = router;
