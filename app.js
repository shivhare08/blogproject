const express = require('express')
const app = express()
const port = 2580
const router = require('./route/web')
const connectDB = require('./db/connectDB')
const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary');
const session = require('express-session')
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')

//=======cookies========\\
app.use(cookieParser())


app.use(express.urlencoded({extended:false}))

app.use(fileUpload({useTempFiles: true}));

//=====session message==========\\
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    
  }));

//=======flash message=========\\
app.use(flash());

//=======router connection=======
app.use('/',router)

app.set('viewengine','ejs')

//Public file
app.use(express.static('public'))

//database connection
connectDB();

//server
app.listen(port,()=>{
    console.log(`your localhost:${port}`)
})