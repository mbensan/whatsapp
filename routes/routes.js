/**
 * Acá dejamos las rutas internas (rutas que asumen que el usuario ya se logueo a nuestra App)
 */
const { Router } = require('express');
const { Keeper } = require('../db');
const router = Router();


router.get('/', async (req, res) => {
  res.render('index.ejs')
});


router.post('/', async (req, res) => {
  try {
    // acá coloco lo que intento hacer
    await Keeper.create(req.body);

  } catch (err) {
    // acá coloco lo que haré si ocurre algún error
    req.flash('errors', err.errors[key].message);
  }
  res.redirect('/');
});

module.exports = router;