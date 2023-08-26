const BlogModel = require('../../model/BlogM')
var cloudinary = require('cloudinary').v2;



cloudinary.config({ 
    cloud_name: 'daa5rkqdc', 
    api_key: '843127716237467', 
    api_secret: 'vmk7PCGmjeisM9miWLQWIqazHhs',
    //secure: true
  });



class BlogController{
    static blogDisplay = async (req,res)=>{
        // const data = await BlogModel.find()
        // console.log(data)
        try{
            const data = await BlogModel.find()
            res.render('admin/blog/blogdisplay.ejs',{d:data , message:req.flash('success')})
        }catch(error){
            console.log(error)
        }
        
    }



    static addblog = (req,res)=>{
        res.render('admin/blog/addblog.ejs')
    }




    // static fillblogdata = async (req,res)=>{
    //     try{
            //console.log(req.body)
            // const result = await BlogModel.create(req.body)
            //console.log(result)
    //         const result = new BlogModel({
    //             title : req.body.title,
    //             name : req.body.name,
    //             description : req.body.description
    //         })
    //         await result.save()
    //         res.redirect('/admin/blogdisplay')
    //     }catch(error){
    //         console.log(err)
    //     }
    // }


    ///////Image ke sath
    static fillblogdata = async (req,res)=>{
        try{
            // console.log(req.files.image)
            // console.log(req.body)
            // console.log(req.params.id)
            const file = req.files.image
            const myfile = await cloudinary.uploader.upload(file.tempFilePath,{
                folder : 'blogimages'
            })
            const result = new BlogModel({
                title:req.body.title,
                name:req.body.name,
                description:req.body.description,
                image:{
                    public_id: myfile.public_id,
                    url: myfile.secure_url
                },
            })
            await result.save()
            req.flash('success','blog has been added')
            res.redirect('/admin/blogdisplay')

        }catch(error){
            console.log(error)
        }
    }


    static viewblog = async (req,res)=>{
        try{
            const data = await BlogModel.findById(req.params.id)
            res.render('admin/blog/view.ejs',{v:data})
        }catch(error){
            console.log(error)
        }
    }

    static deleteblog = async (req,res)=>{
        try{
           const imgdelete = await BlogModel.findById(req.params.id)
           const imageid = imgdelete.image.public_id
           await cloudinary.uploader.destroy(imageid) 
           const datadelete = await BlogModel.findByIdAndDelete(req.params.id)
           res.redirect('/admin/blogdisplay')
        }catch(error){
        console.log(error)
        }
    }

    static editblog = async (req,res)=>{
        try{
            const editdata = await BlogModel.findById(req.params.id)
            res.render('admin/blog/edit.ejs',{e:editdata})
        }catch(error){
            console.log(error)
        }
    }

    static updateblog = async (req,res)=>{
        try{
            // console.log(req.body)
            // console.log(req.params.id)
            const img = await BlogModel.findByIdAndUpdate(req.params.id)
            const imgid = img.image.public_id
            const myfile = req.files.image
            const updtimg = await cloudinary.uploader.upload(myfile.tempFilePath,{
                folder : 'blogupdateimg'
            })
            // console.log(myfile)
            // console.log(imgid)
            await cloudinary.uploader.destroy(imgid)
            
            const updata = await BlogModel.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                name:req.body.name,
                description:req.body.description,
                image:{
                    public_id : updtimg.public_id,
                    url : updtimg.secure_url,
                },
            })
            await updata.save()
            res.redirect('/admin/blogdisplay')
        }catch(error){
            console.log(error)
        }
    }


}

module.exports = BlogController