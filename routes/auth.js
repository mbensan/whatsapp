/**
 * Acá van las rutas que manejan la autentificación de nuestra App
 */
const { Router } = require('express');
const { User } = require('../db');
const router = Router();

// 1. Cargar los formularios para login y register
router.get('/login', async (req, res) => {
  res.render('login.ejs');
});

// 2. Ruta para registrar nuevos usuarios (formulario de registro)

// 3. Ruta para que los usuarios que ya existen, entren a la plataforma (formulario de login)

// 4. Ruta para cerrar sesión


module.exports = router;
