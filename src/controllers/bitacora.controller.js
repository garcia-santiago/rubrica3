const pool = require('../config/db');

const obtenerBitacoraUsuario = async (req, res) => {

    const { id_usuario } = req.params;

    const result = await pool.query(`
        SELECT
            p.id AS id_participacion,
            p.id_usuario,
            p.id_tarea,
            p.horas_trabajadas,
            t.titulo,
            t.descripcion,
            t.tipo_tarea,
            t.fecha_tarea,
            t.id_zona,
            z.nombre AS zona_nombre
        FROM rubrica.participaciones p
        INNER JOIN rubrica.tareas t
            ON p.id_tarea = t.id
        LEFT JOIN rubrica.zonas_cultivo z
            ON t.id_zona = z.id
        WHERE p.id_usuario = $1
        ORDER BY t.fecha_tarea DESC, p.id DESC
    `, [id_usuario]);

    res.json(result.rows);
};

const obtenerResumenBitacoraUsuario = async (req, res) => {

    const { id_usuario } = req.params;

    const result = await pool.query(`
        SELECT
            p.id_usuario,
            COUNT(p.id) AS total_participaciones,
            COALESCE(SUM(p.horas_trabajadas), 0) AS total_horas
        FROM rubrica.participaciones p
        WHERE p.id_usuario = $1
        GROUP BY p.id_usuario
    `, [id_usuario]);

    if (result.rows.length === 0) {
        return res.json({
            id_usuario: Number(id_usuario),
            total_participaciones: '0',
            total_horas: '0'
        });
    }

    res.json(result.rows[0]);
};

module.exports = {
    obtenerBitacoraUsuario,
    obtenerResumenBitacoraUsuario
};
