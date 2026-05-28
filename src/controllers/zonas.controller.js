const pool = require('../config/db');

const obtenerZonas = async (req, res) => {

    const result = await pool.query(`
        SELECT *
        FROM rubrica.zonas_cultivo
        ORDER BY id
    `);

    res.json(result.rows);
};

const crearZona = async (req, res) => {

    const {
        nombre,
        tamano,
        tipo_cultivo,
        estado,
        id_responsable
    } = req.body;

    const query = `
        INSERT INTO rubrica.zonas_cultivo
        (
            nombre,
            tamano,
            tipo_cultivo,
            estado,
            id_responsable
        )
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *
    `;

    const values = [
        nombre,
        tamano,
        tipo_cultivo,
        estado,
        id_responsable
    ];

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
};

const actualizarZona = async (req, res) => {

    const { id } = req.params;
    const {
        nombre,
        tamano,
        tipo_cultivo,
        estado,
        id_responsable
    } = req.body;

    const query = `
        UPDATE rubrica.zonas_cultivo
        SET
            nombre = COALESCE($1, nombre),
            tamano = COALESCE($2, tamano),
            tipo_cultivo = COALESCE($3, tipo_cultivo),
            estado = COALESCE($4, estado),
            id_responsable = COALESCE($5, id_responsable)
        WHERE id = $6
        RETURNING *
    `;

    const values = [
        nombre,
        tamano,
        tipo_cultivo,
        estado,
        id_responsable,
        id
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
        return res.status(404).json({
            mensaje: 'Zona no encontrada'
        });
    }

    res.json(result.rows[0]);
};

const eliminarZona = async (req, res) => {

    const { id } = req.params;

    const result = await pool.query(`
        DELETE FROM rubrica.zonas_cultivo
        WHERE id = $1
        RETURNING id
    `, [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({
            mensaje: 'Zona no encontrada'
        });
    }

    res.json({
        mensaje: 'Zona eliminada correctamente'
    });
};

module.exports = {
    obtenerZonas,
    crearZona,
    actualizarZona,
    eliminarZona
};
