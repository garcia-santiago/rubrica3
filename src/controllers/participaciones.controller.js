const pool = require('../config/db');

const registrarParticipacion = async (req, res) => {

    const {
        id_usuario,
        id_tarea,
        horas_trabajadas
    } = req.body;

    const query = `
        INSERT INTO rubrica.participaciones
        (
            id_usuario,
            id_tarea,
            horas_trabajadas
        )
        VALUES ($1,$2,$3)
        RETURNING *
    `;

    const result = await pool.query(query, [
        id_usuario,
        id_tarea,
        horas_trabajadas
    ]);

    res.status(201).json(result.rows[0]);
};

const actualizarParticipacion = async (req, res) => {

    const { id } = req.params;
    const {
        id_usuario,
        id_tarea,
        horas_trabajadas
    } = req.body;

    const query = `
        UPDATE rubrica.participaciones
        SET
            id_usuario = COALESCE($1, id_usuario),
            id_tarea = COALESCE($2, id_tarea),
            horas_trabajadas = COALESCE($3, horas_trabajadas)
        WHERE id = $4
        RETURNING *
    `;

    const result = await pool.query(query, [
        id_usuario,
        id_tarea,
        horas_trabajadas,
        id
    ]);

    if (result.rows.length === 0) {
        return res.status(404).json({
            mensaje: 'Participacion no encontrada'
        });
    }

    res.json(result.rows[0]);
};

const eliminarParticipacion = async (req, res) => {

    const { id } = req.params;

    const result = await pool.query(`
        DELETE FROM rubrica.participaciones
        WHERE id = $1
        RETURNING id
    `, [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({
            mensaje: 'Participacion no encontrada'
        });
    }

    res.json({
        mensaje: 'Participacion eliminada correctamente'
    });
};

module.exports = {
    registrarParticipacion,
    actualizarParticipacion,
    eliminarParticipacion
};
