const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const zonasRoutes = require('./routes/zonas.routes');
const tareasRoutes = require('./routes/tareas.routes');
const participacionesRoutes = require('./routes/participaciones.routes');
const estadisticasRoutes = require('./routes/estadisticas.routes');
const bitacoraRoutes = require('./routes/bitacora.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/zonas-cultivo', zonasRoutes);
app.use('/tareas', tareasRoutes);
app.use('/participaciones', participacionesRoutes);
app.use('/estadisticas', estadisticasRoutes);
app.use('/bitacora', bitacoraRoutes);

module.exports = app;
