const { Timestamp } = require('bson')
const mongoose = require('mongoose')

const adminschema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
},{timestamps:true})

const AdminModel = mongoose.model('beautyadmin',adminschema)
module.exports = AdminModel