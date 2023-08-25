const AdminModel = require('../../model/AdminM')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AdminController{
    static Dashboard = async (req,res)=>{
        try{
            const {username , email} = req.admin
            res.render('admin/dashboard.ejs',{n:username,e:email})
        }catch(error){
            console.log(error)
        }
    }

    static Admininsert = async (req,res)=>{
        try{
            const{ username , password , email , confpassword } = req.body
            const admin = await AdminModel.findOne({email:email})
            if(admin){
                req.flash('error','email already exist')
                res.redirect('/registration')
            }else{
                if(username && email && password && confpassword){
                    if(password == confpassword){
                        try{
                            const hashpassword = await bcrypt.hash(password,10)
                            const data = await AdminModel({
                                username:username,
                                password:hashpassword,
                                email:email,
                            })
                            await data.save()
                            req.flash('success','Registration successfully you can login here')
                            res.redirect('/login')
                        }catch(error){
                            console.log(error)
                        }
                    }else{
                        req.flash('error','Password and con pass does nor match')
                        res.redirect('/registration')
                    }
                }else{
                    req.flash('error','All feilds are required')
                    res.redirect('/registration')
                }
            }
        }catch(error){
            console.log(error)
        }
    }

    static verifylogin = async(req,res)=>{
        try{
            //console.log(req.body)
            const {email,password } =req.body
            if(email && password){
                const admin = await AdminModel.findOne({email:email})
                if(admin != null){
                    const match = await bcrypt.compare(password,admin.password)
                    if((admin.email == email) && match){
                        //token generate
                        const token = jwt.sign({ adminid : admin._id }, 'shashankshivhare08');
                        //console.log(token)
                        res.cookie('token',token)
                        res.redirect('/dashboard')
                    }else{
                        req.flash('error','invalid admin')
                        res.redirect('/login')
                    }
                }else{
                    req.flash('error','you are not registered admin')
                    res.redirect('/login')
                }
            }else{
                req.flash('error','all input are required')
                res.redirect('/login')
            }
        }catch(error){
            console.log(error)
        }
    }

    static adminlogout = async(req,res)=>{
        try{
            res.clearCookie('token')
            res.redirect('/login')
        }catch(error){
            console.log(error)
        }
    }
}


module.exports = AdminController