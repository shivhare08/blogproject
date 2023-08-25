const mongoose = require('mongoose')


//defining Schema
const categorySchema = new mongoose.Schema({
    catrelated:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        public_id:{
            type:String,
        },
        url:{
            type:String
        }

    }
},{timestapms:true})

const CategoryModel = mongoose.model('BeautyCategory',categorySchema)
module.exports = CategoryModel