/**
 * Acá van las rutas que manejan la autentificación de nuestra App
 */
const { Router } = require('express');
const { User } = require('../db');
const bcrypt = require('bcrypt');
const router = Router();

// 1. Cargar los formularios para login y register
router.get('/login', async (req, res) => {
  const errors = req.flash('errors');
  res.render('login.ejs', {errors: errors});
});

  // 2. Ruta para registrar nuevos usuarios (formulario de registro)
router.post('/register', async (req, res) => {
  // Primero encriptamos la contraseña
  const password_encrypted = await bcrypt.hash(req.body.password, 10);

  try {
    console.log('pass', password_encrypted);
    // Después intentamos ingresar el nuevo usuario
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: password_encrypted
    });
    // guardamos el usuario creado en session
    req.session.user = user;

  } catch(err) {
    // En el caso de algún error, guardamos los errores en "errors", y redirigimos al formulario
    for (var key in err.errors) {
      req.flash('errors', err.errors[key].message);
    }
    return res.redirect('/login');
  };
  // si la validación es correcta, redirigimos al usuario al HOME
  res.redirect('/');
});

// 3. Ruta para que los usuarios que ya existen, entren a la plataforma (formulario de login)
router.get('/logout', async (req, res) => {
  req.session.user = null;
  res.redirect('/login');
});


// 4. Ruta para cerrar sesión


module.exports = router;
