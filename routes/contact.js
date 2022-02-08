var express = require('express');
var router = express.Router();

/* GET contact me page. */
router.get('/contact', function(req, res, next) {
    res.render('index', { title: 'Contact Me' });
    res.render('contact');
  });

  module.exports = router;