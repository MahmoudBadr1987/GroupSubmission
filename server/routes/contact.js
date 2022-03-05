var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let User = require ('../models/user');

// connect to our model 
let Contact = require("../models/contact");
let contactController = require ("../controllers/contact");


// helper function for guard purpose so that if someone copies and pastes the 
// URL directly, it will ask him to sign in
function requireAuth(req, res, next)
{
    //check if the user logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


///////////////////////////////////////////  Load The List ///////////////////////////////////
//  GET Route for the contact list
router.get('/',contactController.displayContactList );


/////////////////////////////////////////// CREATE Operation /////////////////////////////////
//  GET Route for the contact list - CREATE Operation

router.get('/add',requireAuth,contactController.displayAddPage);

//  POST Route for the contact list - CREATE Operation
router.post('/add',requireAuth,contactController.processAddPage );


/////////////////////////////////////////// UPDATE Operation /////////////////////////////////
//  GET Route for the contact list - UPDATE Operation
router.get('/edit/:id',requireAuth, contactController.displayEditPage);

router.post('/edit/:id', requireAuth,contactController.processEditPage);


////////////////////////////////////////////// DELETE Operation /////////////////////////////

router.get('/delete/:id',requireAuth, contactController.performDelete);




module.exports = router;

