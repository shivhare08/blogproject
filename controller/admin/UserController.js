

class UserController{
    static adminregister = async(req,res)=>{
        try{
            console.log(req.body)
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = UserController