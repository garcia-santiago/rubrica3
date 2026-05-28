const pool = require('../config/db');

const obtenerHoras = async (req, res) => {

    const result = await pool.query(`
        SELECT 
            SUM(horas_trabajadas) AS total_horas
        FROM rubrica.participaciones
    `);

    res.json(result.rows[0]);
};

const obtenerParticipacionZonas = async (req, res) => {

    const result = await pool.query(`
        SELECT
            z.nombre,
            COUNT(t.id) AS total_tareas
        FROM rubrica.zonas_cultivo z
        LEFT JOIN rubrica.tareas t
            ON z.id = t.id_zona
        GROUP BY z.nombre
    `);

    res.json(result.rows);
};

module.exports = {
    obtenerHoras,
    obtenerParticipacionZonas
};