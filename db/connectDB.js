const mongoose = require('mongoose')
const live_url = 'mongodb+srv://shivhares2002:everything08@cluster0.5nvbe8j.mongodb.net/blogproject?retryWrites=true&w=majority'
const local_url = 'mongodb://127.0.0.1:27017/BeautyBlogWebsite'

const connectDB =()=>{
    return mongoose.connect(live_url)

    .then(()=>{
        console.log('connection succesfully')
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDB