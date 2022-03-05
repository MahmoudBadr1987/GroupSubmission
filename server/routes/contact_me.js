var express = require('express');
var router = express.Router();

/* GET contact me page. */
router.get('/contact_me', function(req, res, next) {
    res.render('index', { title: 'Contact Me' });
    res.render('contact_me');
  });

  module.exports = router;