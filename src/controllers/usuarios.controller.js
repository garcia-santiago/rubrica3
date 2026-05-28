const pool = require('../config/db');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const obtenerUsuarios = async (req, res) => {

    const result = await pool.query(`
        SELECT
            id,
            nombres,
            apellidos,
            correo,
            telefono,
            zona_residencia,
            dias_disponibles
        FROM rubrica.usuarios
        ORDER BY id
    `);

    res.json(result.rows);
};

const obtenerUsuario = async (req, res) => {

    const { id } = req.params;

    const result = await pool.query(`
        SELECT
            id,
            nombres,
            apellidos,
            correo,
            telefono,
            zona_residencia,
            dias_disponibles
        FROM rubrica.usuarios
        WHERE id = $1
    `, [id]);

    res.json(result.rows[0]);
};

const actualizarUsuario = async (req, res) => {

    const { id } = req.params;
    const {
        nombres,
        apellidos,
        correo,
        telefono,
        zona_residencia,
        dias_disponibles,
        contrasena
    } = req.body;

    const contrasenaHash = contrasena
        ? await bcrypt.hash(contrasena, SALT_ROUNDS)
        : undefined;

    const query = `
        UPDATE rubrica.usuarios
        SET
            nombres = COALESCE($1, nombres),
            apellidos = COALESCE($2, apellidos),
            correo = COALESCE($3, correo),
            telefono = COALESCE($4, telefono),
            zona_residencia = COALESCE($5, zona_residencia),
            dias_disponibles = COALESCE($6, dias_disponibles),
            contrasena = COALESCE($7, contrasena)
        WHERE id = $8
        RETURNING
            id,
            nombres,
            apellidos,
            correo,
            telefono,
            zona_residencia,
            dias_disponibles
    `;

    const values = [
        nombres,
        apellidos,
        correo,
        telefono,
        zona_residencia,
        dias_disponibles,
        contrasenaHash,
        id
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
        return res.status(404).json({
            mensaje: 'Usuario no encontrado'
        });
    }

    res.json(result.rows[0]);
};

const eliminarUsuario = async (req, res) => {

    const { id } = req.params;

    const result = await pool.query(`
        DELETE FROM rubrica.usuarios
        WHERE id = $1
        RETURNING id
    `, [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({
            mensaje: 'Usuario no encontrado'
        });
    }

    res.json({
        mensaje: 'Usuario eliminado correctamente'
    });
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario
};
