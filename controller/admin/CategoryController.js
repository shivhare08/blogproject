const CategoryModel = require('../../model/CategoryM')
var cloudinary = require('cloudinary').v2;



cloudinary.config({
    cloud_name: 'daa5rkqdc',
    api_key: '843127716237467',
    api_secret: 'vmk7PCGmjeisM9miWLQWIqazHhs',
    //secure: true
});

class CategoryController {
    static categorydisplay = async (req, res) => {
        try {
            const data = await CategoryModel.find()
            res.render('admin/category/categorydisplay.ejs', { d: data, message:req.flash('success') })
        } catch (error) {
            console.log(error)
        }
    }

    static addcategory = (req, res) => {
        res.render('admin/category/addcategory.ejs')
    }

    static fillcatdata = async (req, res) => {
        try {
            const file = req.files.image
            const catimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'categoryImages'
            })
            const result = await CategoryModel({
                title: req.body.title,
                description: req.body.description,
                catrelated: req.body.catrelated,
                image: {
                    public_id: catimage.public_id,
                    url: catimage.secure_url
                }
            })
            await result.save()
            req.flash('success','category has been added')
            res.redirect('/admin/categorydisplay')
        } catch (error) {
            console.log(error)
        }
    }

    static catview = async (req, res) => {
        try {
            const view = await CategoryModel.findById(req.params.id)
            res.render('admin/category/view.ejs', { v: view })
        } catch (error) {
            console.log(error)
        }
    }

    static catdelete = async (req, res) => {
        try {
            const imgdelete = await CategoryModel.findById(req.params.id)
            const imgid = imgdelete.image.public_id
            await cloudinary.uploader.destroy(imgid)
            const catdelete = await CategoryModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/categorydisplay')
        } catch (error) {
            console.log(error)
        }
    }

    static catedit = async (req, res) => {
        try {
            const edit = await CategoryModel.findById(req.params.id)
            res.render('admin/category/edit.ejs', { e: edit })
        } catch (error) {
            console.log(error)
        }
    }

    static catupdate = async (req, res) => {
        try {
            const data = await CategoryModel.findById(req.params.id)
            const imgId = data.image.public_id
            // console.log(imgId)
            const file = req.files.image
            //console.log(file)
            const mycloud = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "catupdatedimg"
            })
            await cloudinary.uploader.destroy(imgId)

            const update = await CategoryModel.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                description: req.body.description,
                catrelated: req.body.catrelated,
                image: {
                    public_id: mycloud.public_id,
                    url: mycloud.secure_url
                },
            })
            await update.save()
            res.redirect('/admin/categorydisplay')
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = CategoryController