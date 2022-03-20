let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();

// connect to our model 
let Provider = require("../models/provider");

module.exports.displayProviderList = ( req , res , next ) =>
{
    Provider.find((err, list) => 
    {
        if (err)
        {
            return console.error(err);
        }
        else 
        {
            res.render ("provider/list" , 
            {
                title: "Providers List",
                list: list, 
                displayName: req.user ? req.user.displayName : ''
            });
        }
    })
}


module.exports.displayAddPage = ( req , res , next ) =>
{
    let newProvider = Provider();
    
    res.render('provider/add', 
    {
        title: 'Add a provider info',
        list: newProvider,
        displayName: req.user ? req.user.displayName : ''  
    })
    //  console.log(newProvider);
}


module.exports.processAddPage = ( req , res , next ) =>
{   
    let newProvider = Provider
    ({    
    "name": req.body.name,
    "qualifications": req.body.qualifications,
    "contact_number": req.body.contact_number,    
    "email": req.body.email
    });
    
    Provider.create(newProvider, (err,list)=>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(newProvider);
            res.redirect('/provider');
        }
    });
}


module.exports.displayEditPage = ( req , res , next ) => 
{
    let id = req.params.id;
    Provider.findById(id,(err,providerToEdit)=>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('provider/edit', 
            {
                title: "Edit a provider", 
                provider: providerToEdit,
                displayName: req.user ? req.user.displayName : ''
            });
            console.log(providerToEdit);
        }
    });
}



module.exports.processEditPage = ( req , res , next ) => 
{
    let id = req.params.id

    let updatedProvider = Provider
    ({
        "_id": req.body.id,   
        "name": req.body.name,
        "qualifications": req.body.qualifications,
        "contact_number": req.body.contact_number,    
        "email": req.body.email
    });

    // console.log(updatedProvider);

    Provider.updateOne({_id:id}, updatedProvider , (err) =>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // console.log(req.body)
            res.redirect("/provider");
        }
    })    
}



module.exports.performDelete = ( req , res , next ) => 
{
    let id = req.params.id;
    Provider.remove({_id:id}, (err) =>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(req.body)
            res.redirect("/provider");
        }
    })
    
}














