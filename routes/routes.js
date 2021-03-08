/**
 * Acá dejamos las rutas internas (rutas que asumen que el usuario ya se logueo a nuestra App)
 */
const { Router } = require('express');
const router = Router();

// Middleware: Verifica si el usuario está logueado.
// en caso de que no, lo mandamos al login
function checkLogin(req, res, next) {
  if (req.session.user == null) {
    res.redirect('/login');
  }
  res.locals.user = req.session.user;
  /* si llegamos hasta acá, esntonces estamos seguros
   que si existe req.session.user */
  next();
}


router.get('/', checkLogin, async (req, res) => {
  res.render('index.ejs');
});


module.exports = router;