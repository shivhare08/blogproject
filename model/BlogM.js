const { Timestamp } = require('bson')
const mongoose = require('mongoose')

//2nd defining Schema
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
},{timestamps:true})


//1st Creating Collection
const BlogModel = mongoose.model('BeautyBlog',blogSchema)
module.exports = BlogModel