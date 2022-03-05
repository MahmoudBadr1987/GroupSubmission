let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();

// connect to our model 
let Contact = require("../models/contact");

module.exports.displayContactList = ( req , res , next ) =>
{
    Contact.find((err, list) => 
    {
        if (err)
        {
            return console.error(err);
        }
        else 
        {
            res.render ("contact/list" , 
            {
                title: "Contact List",
                list: list, 
                displayName: req.user ? req.user.displayName : ''
            });
        }
    })
}


module.exports.displayAddPage = ( req , res , next ) =>
{
    let newContact = Contact();
    
    res.render('contact/add', 
    {
        title: 'Add a contact info',
        list: newContact,
        displayName: req.user ? req.user.displayName : ''  
    })
    //  console.log(newContact);
}


module.exports.processAddPage = ( req , res , next ) =>
{   
    let newContact = Contact
    ({
    // "_id": req.body.id,    
    "name": req.body.name,
    "contact_number": req.body.contact_number,    
    "email": req.body.email
    });
    
    Contact.create(newContact, (err,list)=>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(newContact);
            res.redirect('/contact');
        }
    });
}


module.exports.displayEditPage = ( req , res , next ) => 
{
    let id = req.params.id;
    Contact.findById(id,(err,contactToEdit)=>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('contact/edit', 
            {
                title: "Edit a contact", 
                contact:contactToEdit,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
}



module.exports.processEditPage = ( req , res , next ) => 
{
    let id = req.params.id

    let updatedContact = Contact
    ({
        "_id": req.body.id,   
        "name": req.body.name,
        "contact_number": req.body.contact_number,    
        "email": req.body.email
    });

    // console.log(updatedContact);

    Contact.updateOne({_id:id}, updatedContact , (err) =>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // console.log(req.body)
            res.redirect("/contact");
        }
    })    
}



module.exports.performDelete = ( req , res , next ) => 
{
    let id = req.params.id;
    Contact.remove({_id:id}, (err) =>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(req.body)
            res.redirect("/contact");
        }
    })
    
}














