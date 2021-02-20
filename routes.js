const { Router } = require('express');
//const { Country, City, Language } = require('./db');
const router = Router();



router.get('/', async (req, res) => {

  res.render('index.ejs')
});


router.post('/', async (req, res) => {

  res.render('index.ejs')
});



module.exports = router;