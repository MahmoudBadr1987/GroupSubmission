let mongoose = require("mongoose");

// Create model class 
let providerModel = mongoose.Schema(
    {
        name : String ,
        qualifications : String,
        contact_number: Number,
        email: String
    },
    {
    collection : "providers"

    })

module.exports= mongoose.model('Provider', providerModel);