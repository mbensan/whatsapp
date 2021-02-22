const { Router } = require('express');
const { Keeper } = require('./db');
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

// GET (traer datos)
// POST (crear nuevos datos)
// PUT (modificar datos)
// DELETE (borrar datos)
module.exports = router;