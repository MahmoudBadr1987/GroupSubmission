let mongoose = require("mongoose");

// Create model class 
let contactModel = mongoose.Schema(
    {
        name : String ,
        contact_number : Number,
        email: String
    },
    {
    collection : "contacts"

    })

module.exports= mongoose.model('Contact', contactModel);