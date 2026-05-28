const pool = require('../config/db');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const registro = async (req, res) => {
    try {

        const {
            nombres,
            apellidos,
            correo,
            telefono,
            zona_residencia,
            dias_disponibles,
            contrasena
        } = req.body;

        const contrasenaHash = await bcrypt.hash(contrasena, SALT_ROUNDS);

        const query = `
            INSERT INTO rubrica.usuarios
            (
                nombres,
                apellidos,
                correo,
                telefono,
                zona_residencia,
                dias_disponibles,
                contrasena
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7)
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
            contrasenaHash
        ];

        const result = await pool.query(query, values);

        res.status(201).json(result.rows[0]);

    } catch (error) {
        res.status(500).json(error.message);
    }
};

const login = async (req, res) => {
    try {

        const { correo, contrasena } = req.body;

        const query = `
            SELECT *
            FROM rubrica.usuarios
            WHERE correo = $1
        `;

        const result = await pool.query(query, [correo]);

        if (result.rows.length === 0) {
            return res.status(401).json({
                mensaje: 'Credenciales invalidas'
            });
        }

        const usuario = result.rows[0];
        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!contrasenaValida) {
            return res.status(401).json({
                mensaje: 'Credenciales invalidas'
            });
        }

        delete usuario.contrasena;

        res.json(usuario);

    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    registro,
    login
};
