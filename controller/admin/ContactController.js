const ContactModel = require('../../model/ContactM')

class ContactController{
    static contact = async (req,res)=>{
        try{
            const data = await ContactModel.find()
            res.render('admin/contact/contact.ejs',{d:data})
        }catch(error){
            console.log(error)
        }
    }

    static fillcontact =async (req,res)=>{
        // console.log(req.body)
        try{
            const data = await ContactModel({
                name:req.body.name,
                message:req.body.message,
                email:req.body.email,
                phone:req.body.phone,
            })
            await data.save()
            res.redirect('/contact')
        }catch(error){
            console.log(error)
        }

    }

    static deletecontact = async(req,res)=>{
        try{
            const deletecontact = await ContactModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/contact')
        }catch(error){
            console.log(error)
        }
    }

    static viewcontact = async(req,res)=>{
        try{
            const contact = await ContactModel.findById(req.params.id)
            res.render('admin/contact/viewcontact.ejs',{c:contact})
        }catch(error){
            console.log(error)
        }
    }

    static viewmessage = async(req,res)=>{
        try{
            const message = await ContactModel.findById(req.params.id)
            res.render('admin/contact/message.ejs',{m:message})
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = ContactController