const db = require("../../../models/index");
const { Op } = require("sequelize");
const { FileUpload, DeleteFile } = require("../../../middlewares/uploadFiles");



let Users = db.User;
let Roles = db.Roles;
let User_has_role = db.user_has_role;

const addUser = async (req, res) => {
    const {  ...reqBody } = req.body;
    // console.log(req.body);
    try {    
      let user = await Users.create(reqBody);
      res.status(200).json({
        status:"success",
        responseCode: 200,
        message: "User added successfully!",
        data:{
          id : user.id ,
          username : user.name ,
          email : user.email ,
        },
      })
  
    //   req.flash('error', "true");
    //   res.redirect("/user/data");
  
    } catch (e) {
      console.error(e);
    //   req.flash('error', 'false');
    //   res.redirect("/user/data");
    res.status(500).json({
        status:"failed",
        responseCode: 500,
        message: e.message || "Server Error"
      });
    }
  };


  const updateUser = async (req, res) => {
    try {
        console.log(req.file);
        console.log(req.files);
      let id = Number(req.params.id);
    //   let  = await FileUpload(
    //     req.files.profilePicture,
    //     "app/uploads/profilePictures/"
    //   );
    //   let user = await Users.update(req.body, {
    //     where: { id: id },
    //   });
    //   req.flash('error', 'update');
    //   res.redirect("/user/data");
        res.json(req.file);
    } catch (e) {
    //   req.flash('error', 'notUpdate');
    //   res.redirect("/user/data");
    res.status(422).json({
        status:"failed",
        responseCode: 422,
        message: e.message || "Unprocessable Entity"
      });
    }
  };  













  module.exports = {
    addUser,updateUser
  }