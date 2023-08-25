const mongoose = require('mongoose')

const contactschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
},{timestamps:true})

const ContactModel = mongoose.model('BeautyContact',contactschema)
module.exports = ContactModel