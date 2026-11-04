
import { useEffect, useState } from 'react';
import './App.css';

import ProductoFormulario from './components/ProductoFormulario';

import {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from './services/productoService';

function App() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [productoEditar, setProductoEditar] = useState(null);
    const [error, setError] = useState('');

    // Cargar productos
    const cargarProductos = async () => {
        try {
            setError('');
            const datos = await obtenerProductos();
            setProductos(datos);
        } catch (error) {
            console.error(error);
            setError('No fue posible cargar los productos.');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    // Guardar producto nuevo o actualizado
    const guardarProducto = async (producto) => {
        try {
            if (productoEditar) {
                await actualizarProducto(productoEditar.id, producto);
            } else {
                await crearProducto(producto);
            }

            setMostrarFormulario(false);
            setProductoEditar(null);
            await cargarProductos();
        } catch (error) {
            console.error(error);
            setError(
                error.response?.data?.mensaje ||
                'No fue posible guardar el producto.'
            );
        }
    };

    // Preparar formulario de edición
    const editarProducto = (producto) => {
        setProductoEditar(producto);
        setMostrarFormulario(true);
    };

    // Eliminar producto
    const borrarProducto = async (id) => {
        const confirmar = window.confirm(
            '¿Estás seguro de eliminar este producto?'
        );

        if (!confirmar) return;

        try {
            await eliminarProducto(id);
            await cargarProductos();
        } catch (error) {
            console.error(error);
            setError('No fue posible eliminar el producto.');
        }
    };

    // Cerrar formulario
    const cancelarFormulario = () => {
        setMostrarFormulario(false);
        setProductoEditar(null);
    };

    const totalUnidades = productos.reduce(
        (total, producto) => total + producto.stock,
        0
    );

    return (
        <div className="app">
            <aside className="sidebar">
                <h2>MiniStock</h2>

                <nav>
                    <a className="active" href="#">Inventario</a>
                    <a href="#">Productos</a>
                    <a href="#">Configuración</a>
                </nav>
            </aside>

            <main className="main-content">
                <header>
                    <div>
                        <h1>Inventario</h1>
                        <p>Administra los productos de tu negocio.</p>
                    </div>

                    <button onClick={() => {
                        setProductoEditar(null);
                        setMostrarFormulario(true);
                    }}>
                        + Nuevo producto
                    </button>
                </header>

                <section className="stats">
                    <div className="stat-card">
                        <span>Total de productos</span>
                        <h2>{productos.length}</h2>
                    </div>

                    <div className="stat-card">
                        <span>Unidades disponibles</span>
                        <h2>{totalUnidades}</h2>
                    </div>
                </section>

                {error && <p className="error-message">{error}</p>}

                {mostrarFormulario && (
                    <ProductoFormulario
                        productoEditar={productoEditar}
                        onGuardar={guardarProducto}
                        onCancelar={cancelarFormulario}
                    />
                )}

                <section className="products-section">
                    <h2>Productos registrados</h2>

                    {cargando ? (
                        <p>Cargando productos...</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {productos.map((producto) => (
                                    <tr key={producto.id}>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.categoria}</td>
                                        <td>
                                            ${producto.precio.toLocaleString('es-CO')}
                                        </td>
                                        <td>{producto.stock}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    onClick={() => editarProducto(producto)}
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    className="delete-button"
                                                    onClick={() => borrarProducto(producto.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;