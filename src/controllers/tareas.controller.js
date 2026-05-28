const pool = require('../config/db');

const obtenerTareas = async (req, res) => {

    const result = await pool.query(`
        SELECT *
        FROM rubrica.tareas
        ORDER BY id
    `);

    res.json(result.rows);
};

const crearTarea = async (req, res) => {

    const {
        id_zona,
        id_usuario_asignado,
        titulo,
        descripcion,
        tipo_tarea,
        fecha_tarea
    } = req.body;

    const query = `
        INSERT INTO rubrica.tareas
        (
            id_zona,
            id_usuario_asignado,
            titulo,
            descripcion,
            tipo_tarea,
            fecha_tarea
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *
    `;

    const values = [
        id_zona,
        id_usuario_asignado,
        titulo,
        descripcion,
        tipo_tarea,
        fecha_tarea
    ];

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
};

const actualizarTarea = async (req, res) => {

    const { id } = req.params;
    const {
        id_zona,
        id_usuario_asignado,
        titulo,
        descripcion,
        tipo_tarea,
        fecha_tarea
    } = req.body;

    const query = `
        UPDATE rubrica.tareas
        SET
            id_zona = COALESCE($1, id_zona),
            id_usuario_asignado = COALESCE($2, id_usuario_asignado),
            titulo = COALESCE($3, titulo),
            descripcion = COALESCE($4, descripcion),
            tipo_tarea = COALESCE($5, tipo_tarea),
            fecha_tarea = COALESCE($6, fecha_tarea)
        WHERE id = $7
        RETURNING *
    `;

    const values = [
        id_zona,
        id_usuario_asignado,
        titulo,
        descripcion,
        tipo_tarea,
        fecha_tarea,
        id
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
        return res.status(404).json({
            mensaje: 'Tarea no encontrada'
        });
    }

    res.json(result.rows[0]);
};

const eliminarTarea = async (req, res) => {

    const { id } = req.params;

    const result = await pool.query(`
        DELETE FROM rubrica.tareas
        WHERE id = $1
        RETURNING id
    `, [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({
            mensaje: 'Tarea no encontrada'
        });
    }

    res.json({
        mensaje: 'Tarea eliminada correctamente'
    });
};

module.exports = {
    obtenerTareas,
    crearTarea,
    actualizarTarea,
    eliminarTarea
};
