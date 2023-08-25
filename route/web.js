const express = require('express')
const router = express.Router()


const AdminController = require('../controller/admin/AdminController')
const BlogController = require('../controller/admin/BlogController')
const CategoryController = require('../controller/admin/CategoryController')
const FrontController = require('../controller/FrontController')
const ContactController = require('../controller/admin/ContactController')
//const { Contact } = require('./controller/FrontController')
const AboutController = require('../controller/admin/AboutController')
const UserController = require('../controller/admin/UserController')
const admin_auth = require('../middleware/auth')


//Front
router.get('/',FrontController.Home)
router.get('/about',FrontController.About)
router.get('/contact',FrontController.Contact)
router.get('/blog',FrontController.Blog)
router.get('/category',FrontController.Category)
router.get('/login',FrontController.Login)
router.get('/readmore/:id',FrontController.Readmore)
router.get('/registration',FrontController.Registration)

//catopeninreadmore
router.get('/viewcat/:id',FrontController.viewcat)
//blogopeninreadmore
router.get('/viewblog/:id',FrontController.viewblog)

//Admin
router.get('/dashboard',admin_auth,AdminController.Dashboard)

//Admin/Blog
router.get('/admin/blogdisplay',admin_auth,BlogController.blogDisplay)
router.get('/admin/addblog',admin_auth,BlogController.addblog)
router.get('/view/:id',admin_auth,BlogController.viewblog)
router.get('/delete/:id',admin_auth,BlogController.deleteblog)
router.get('/edit/:id',admin_auth,BlogController.editblog)
router.post('/updateblog/:id',admin_auth,BlogController.updateblog)

//fillblogdata
router.post('/fillblogdata',admin_auth,BlogController.fillblogdata)

//Admin/Category
router.get('/admin/categorydisplay',admin_auth,CategoryController.categorydisplay)
router.get('/admin/addcategory',admin_auth,CategoryController.addcategory)
router.get('/catview/:id',admin_auth,CategoryController.catview)
router.get('/catdelete/:id',admin_auth,CategoryController.catdelete)
router.get('/catedit/:id',admin_auth,CategoryController.catedit)
router.post('/catupdate/:id',admin_auth,CategoryController.catupdate)

//fillcatdata
router.post('/fillcatdata',admin_auth,CategoryController.fillcatdata)

//Contact
router.get('/admin/contact',admin_auth,ContactController.contact)
router.post('/fillcontact',admin_auth,ContactController.fillcontact)
router.get('/deletecontact/:id',admin_auth,ContactController.deletecontact)
router.get('/viewmessage/:id',admin_auth,ContactController.viewmessage)


//about
router.get('/admin/about',admin_auth,AboutController.about)


//admin registration
router.post('/admininsert',AdminController.Admininsert)

//login
router.post('/verify_login',AdminController.verifylogin)

//logout
router.get('/admin/logout',AdminController.adminlogout)



module.exports = router