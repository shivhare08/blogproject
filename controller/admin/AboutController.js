class AboutController{
    static about = async(req,res)=>{
        try{
            res.render('admin/about/about.ejs')
        }catch(error){

            console.log(error)
        }
    }
}

module.exports = AboutController 