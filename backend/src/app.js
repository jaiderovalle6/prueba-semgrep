const express = require('express');
const cors = require('cors');

const app = express();

const productoRoutes = require('./routes/productoRoutes');

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/productos', productoRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Bienvenido a la API de MiniStock'
    });
});

// Iniciar servidor
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});