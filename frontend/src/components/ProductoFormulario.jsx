
import { useEffect, useState } from 'react';

function ProductoFormulario({ productoEditar, onGuardar, onCancelar }) {
    const [formulario, setFormulario] = useState({
        nombre: '',
        categoria: '',
        precio: '',
        stock: ''
    });

    useEffect(() => {
        if (productoEditar) {
            setFormulario({
                nombre: productoEditar.nombre,
                categoria: productoEditar.categoria,
                precio: productoEditar.precio,
                stock: productoEditar.stock
            });
        } else {
            setFormulario({
                nombre: '',
                categoria: '',
                precio: '',
                stock: ''
            });
        }
    }, [productoEditar]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const manejarEnvio = (e) => {
        e.preventDefault();

        onGuardar({
            ...formulario,
            precio: Number(formulario.precio),
            stock: Number(formulario.stock)
        });
    };

    return (
        <form onSubmit={manejarEnvio} className="product-form">
            <h2>
                {productoEditar ? 'Editar producto' : 'Nuevo producto'}
            </h2>

            <label>Nombre</label>
            <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                required
            />

            <label>Categoría</label>
            <input
                type="text"
                name="categoria"
                value={formulario.categoria}
                onChange={manejarCambio}
                required
            />

            <label>Precio</label>
            <input
                type="number"
                name="precio"
                value={formulario.precio}
                onChange={manejarCambio}
                min="0"
                required
            />

            <label>Stock</label>
            <input
                type="number"
                name="stock"
                value={formulario.stock}
                onChange={manejarCambio}
                min="0"
                required
            />

            <div className="form-actions">
                <button type="submit">
                    Guardar
                </button>

                <button
                    type="button"
                    className="cancel-button"
                    onClick={onCancelar}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default ProductoFormulario;