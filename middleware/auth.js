const jwt = require('jsonwebtoken')
const AdminModel = require('../model/AdminM')


const admin_auth = async(req,res,next)=>{
    try{
        // console.log('hlo auth')
        const {token} = req.cookies
        // console.log(token)
        const verifytoken = jwt.verify(token,'shashankshivhare08')
        // console.log(verifytoken)
        const admindata = await AdminModel.findOne({adminid :verifytoken._id})
        // console.log(admindata)
        req.admin = admindata    
        next()
    }catch(error){
        res.redirect('/login')
    }
}

module.exports = admin_auth