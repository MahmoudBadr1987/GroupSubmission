var express = require('express');
var router = express.Router();

/* GET about me page. */
router.get('/about', function(req, res, next) {
    res.render('index', { title: 'About Me' });
    res.render('about');
  });

  module.exports = router;