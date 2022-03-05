let express = require('express');
let router = express.Router;
let mongoose = require ('mongoose');
let passport = require ('passport');

//Create the User Model instasnce
let userModel = require('../models/user');
let User = userModel.User; //alias

module.exports.diplayHomePage = (req, res, next) =>
{
res.render('index', {title:'Home'});
}

module.exports.diplayAboutPage = (req, res, next) =>
{
res.render('index', {title:'About'});
}

module.exports.diplayProductsPage = (req, res, next) =>
{
res.render('index', {title:'Products'});
}

module.exports.diplayServicesPage = (req, res, next) =>
{
res.render('index', {title:'Services'});
}

module.exports.diplayContactMePage = (req, res, next) =>
{
res.render('index', {title:'Contact-Me'});
}




module.exports.displayLoginPage = function(req, res, next) 
{
    //check if the user is already logged in
    if(!req.user) //if the user request is not exist 
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName:''//if the user is there, so it will display name, if not , display nothing
        })
    }
    else
    {
        return res.redirect('/');
    }
};




module.exports.processLoginPage = (req,res,next) =>
{
    passport.authenticate('local', (err,user,info) => 
    {
        //server err?
        if(err)
        {
            return next(err);
        }
        //if there a user login error?
        if(!user)
        {
            req.flash('loginMessage','Authentication Error');
            return res.redirect('/login');
        }
        req.login(user,(err)=> 
        {
            //server error?
            if(err)
            {
                return next(err);   
            }


            // const payload = 
            // {
            //     id: user._id,
            //     displayName: user.displayName,
            //     username: user.username,
            //     email: user.email
            // }

            // const authToken = jwt.sign(payload, DB.Secret, {
            //     expiresIn: 604800 // 1 week
            // });

            return res.redirect('/contact');
        });
    })
    (req, res, next);
}



module.exports.displayRegisterPage = (req, res, next) =>
{
        //check if the user is not already logged in
        if(!req.user)
        {
            res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName :''

            });
        }
        else
        {
            return res.redirect('/');
        }
    }


module.exports.processRegisterPage = (req, res, next)=>{
        //instantiate a user object
    let newUser = new User
    ({
        username: req.body.username,
        //password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });
    User.register(newUser, req.body.password, (err)=>
    {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash
                (
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Registration Error!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName :''
            });
        }
        else
        {
            //if no error exists, then registration is successful
            //redirect the user and authenticate them

                
            return passport.authenticate('local')(req, res, () =>
            {
                res.redirect('/contact')
            });
        }

    });
}


module.exports.performLogout= (req, res, next) => 
{
    reg.logout();
    res.redirect('/');
}



