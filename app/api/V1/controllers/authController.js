const jwt = require("jsonwebtoken");
const db = require("../../../models/index");
const validator = require("../middlewares/validateCredentials");

const SECRET_KEY = "vaibhav"; 
let User = db.User;





//for login
const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ 
        where: { email, password },
        // include:  [ { model: db.Roles }, ]
       });
  
    
      if (!user) {
        //   return res.status(401).send('Invalid username or password');
        throw new Error("Incorrect Email/Password");
      }

      const payloads = {
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        // user_role: user.Roles.name,
      }

      const token = jwt.sign(payloads, SECRET_KEY); //


      res.status(200).json({
        responseCode: 200,
        responseStatus: "Success",
        message: "Logged in Successfully",
        token: token,
        // response: {
        //   data: [
        //     {
        //       ID: user.id,
        //       Email: email,
        //       Name: user.name,
        //     },
        //   ],
        // },
      });
    } catch (err) {
      // console.log(err);
      res.status(500).json({
        responseCode: 500,
        responseStatus: "Server Error",
        message: err.message,
      });
    }
  };

  const signup = async(req,res)=>{

    try{
        let data = req.body;

        const user = await User.create(data);
        res.status(200).json({
            statusCode: 200,
            status: "success",
            message: "User registered successfully.",
      
            // token : token,
            Data: [
              {
                id: user.id,
                name: user.name,
                email: user.email,
                // ...user
              },
            ],
          });
    }catch(e){
        res.status(400).json(validator.validate(e));
    }
}
  

const resetPassword = async(req,res)=>{
    try {
        // console.log(req.body);
        const id = Number(req.params.id);
        const {newPassword, confirmPassword} = req.body;

        if(newPassword !== confirmPassword) throw new Error("New password and Confirm Password does not match.");

        if(newPassword === confirmPassword){

            const user = await User.findOne({where:{id:id}});
            if(!user) return res.status(500).json({responseStatus:"Error",message:'No account with this email found.'});
            
           user.password = confirmPassword;
           await user.save();
           return res.status(201).json({
            statusCode:success,
            responseCode:201,
            msg:"password changed successfully"
           });
        }
    } catch (error) {
        res.json({
            responseCode: 500,
            responseStatus: "server error",
            message: `${error}`,
        });
    }
}




module.exports = {
login,signup, resetPassword
}