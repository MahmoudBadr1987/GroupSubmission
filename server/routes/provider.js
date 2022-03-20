var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let User = require ('../models/user');

// connect to our model 
let Provider = require("../models/provider");
let providerController = require ("../controllers/provider");


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
//  GET Route for the provider list
router.get('/',providerController.displayProviderList );


/////////////////////////////////////////// CREATE Operation /////////////////////////////////
//  GET Route for the provider list - CREATE Operation

router.get('/add',requireAuth,providerController.displayAddPage);

//  POST Route for the provider list - CREATE Operation
router.post('/add',requireAuth,providerController.processAddPage );


/////////////////////////////////////////// UPDATE Operation /////////////////////////////////
//  GET Route for the provider list - UPDATE Operation
router.get('/edit/:id',requireAuth, providerController.displayEditPage);

router.post('/edit/:id', requireAuth,providerController.processEditPage);


////////////////////////////////////////////// DELETE Operation /////////////////////////////

router.get('/delete/:id',requireAuth, providerController.performDelete);




module.exports = router;

