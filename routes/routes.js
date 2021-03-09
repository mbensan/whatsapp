const { User, Message } = require('../db');
/**
 * Acá dejamos las rutas internas (rutas que asumen que el usuario ya se logueo a nuestra App)
 */
const { Router, text } = require('express');
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
  const messages = await Message.findAll({
    include: [{ model: User }]
  });
  res.render('index.ejs', {messages});
});


router.post('/message', checkLogin, async (req, res) => {
  console.log('llegamos!');
  await Message.create({
    text: req.body.text,
    time: req.body.time,
    UserId: req.body.UserId
  })
  res.send('OK');
});




module.exports = router;