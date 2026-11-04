const productos = require('../data/productos');

// Obtener todos los productos
const obtenerProductos = (req, res) => {
    res.json(productos);
};

// Registrar un producto
const crearProducto = (req, res) => {
    const { nombre, categoria, precio, stock } = req.body;

    if (!nombre || !categoria || precio == null || stock == null) {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        });
    }

    const nuevoProducto = {
        id: productos.length > 0
            ? Math.max(...productos.map(p => p.id)) + 1
            : 1,
        nombre,
        categoria,
        precio: Number(precio),
        stock: Number(stock)
    };

    productos.push(nuevoProducto);

    res.status(201).json({
        mensaje: 'Producto registrado correctamente',
        producto: nuevoProducto
    });
};

// Actualizar un producto
const actualizarProducto = (req, res) => {
    const id = Number(req.params.id);

    const indice = productos.findIndex(
        producto => producto.id === id
    );

    if (indice === -1) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        });
    }

    const { nombre, categoria, precio, stock } = req.body;

    if (!nombre || !categoria || precio == null || stock == null) {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        });
    }

    productos[indice] = {
        id,
        nombre,
        categoria,
        precio: Number(precio),
        stock: Number(stock)
    };

    res.json({
        mensaje: 'Producto actualizado correctamente',
        producto: productos[indice]
    });
};

// Eliminar un producto
const eliminarProducto = (req, res) => {
    const id = Number(req.params.id);

    const indice = productos.findIndex(
        producto => producto.id === id
    );

    if (indice === -1) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        });
    }

    const productoEliminado = productos.splice(indice, 1);

    res.json({
        mensaje: 'Producto eliminado correctamente',
        producto: productoEliminado[0]
    });
};

module.exports = {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
