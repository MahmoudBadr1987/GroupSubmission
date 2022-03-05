var express = require('express');
var router = express.Router();
let indexController = require('../controllers/index'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home'});
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home'});
});

/* GET About Us page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About'});
});

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects'});
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services'});
});

/* GET Contact Me page. */
router.get('/contact_me', function(req, res, next) {
  res.render('contact_me', { title: 'Contact Me'});
});



// get route to display the login page
router.get('/login',indexController.displayLoginPage );

// post route for processing the login page
router.post('/login',indexController.processLoginPage );


// get route to display the register page
router.get('/register',indexController.displayRegisterPage );

// post route for processing the register page
router.post('/register',indexController.processRegisterPage );


 /* Get to perform UserLogout */
 router.get('/logout',indexController.performLogout );

module.exports = router;
