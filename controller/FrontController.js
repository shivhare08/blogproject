const BlogModel = require('../model/BlogM')
const CategoryModel = require('../model/CategoryM')
const AdminModel = require('../model/AdminM')


class FrontController{
    static Home = async (req,res)=>{
        try{
            const result = await BlogModel.find().sort({_id:-1}).limit(8)
            // console.log(result)
            res.render('practisefile/home.ejs',{d:result})
        }
        catch(error){
            console.log(error)
        }
    }

    static About =(req,res)=>{
        res.render('practisefile/about.ejs')
    }

    static Blog = async (req,res)=>{
        try{
            const blogdata = await BlogModel.find()
            res.render('practisefile/blog.ejs',{blogdata:blogdata})
        }catch(error){
            console.log(error)
        }
    }

    static Contact = async (req,res)=>{
        try{
            res.render('practisefile/contact.ejs')
        }catch(error){
            console.log(error)
        }
    }

    static Category = async(req,res)=>{
        try{
            const catdata = await CategoryModel.find()
            res.render('practisefile/category.ejs',{catdata:catdata})
        }catch(error){
            console.log(error)
        }
    }

    static Login = (req,res)=>{
        res.render('practisefile/login.ejs',{message : req.flash('success') , errmsg : req.flash('error')})
    }

    static Registration =  (req,res)=>{
        res.render('practisefile/registration.ejs',{message: req.flash('error')})
    }

    static Readmore = async (req,res)=>{
        try{
            const data = await BlogModel.findById(req.params.id) //find for a partucular id
            const catdata = await CategoryModel.find().limit(3)           //find for all the data
            const recentblog = await BlogModel.find().limit(2)
            res.render('practisefile/readmore.ejs',{r:data,c:catdata,rb:recentblog})
        }catch(error){
            console.log(error)
        }
    }

    static viewcat = async (req,res) =>{
        try{
            const viewcategory = await CategoryModel.findById(req.params.id)
            res.render('practisefile/readmoreview.ejs',{vc:viewcategory})
        }catch(error){
            console.log(error)
        }
    }

    static viewblog = async (req,res) =>{
        try{
            const viewblog = await BlogModel.findById(req.params.id)
            res.render('practisefile/readmoreblogview.ejs',{vb:viewblog})
        }catch(error){
            console.log(error)
        }
    }    
}

module.exports = FrontController