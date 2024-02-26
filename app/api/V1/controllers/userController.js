const db = require("../../../models/index");
const { Op } = require("sequelize");
const { FileUpload, DeleteFile } = require("../../../middlewares/uploadFiles");
const validator = require("../middlewares/validateCredentials");



let Users = db.User;
let Media = db.media;
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
    let DeleteImg = [];
    try {
      let id = Number(req.params.id);

      let profilePicture;
      if(req.files){
          profilePicture = await FileUpload(
          req.files.profilePicture,
          "app/uploads/profilePictures/"
        );

      //istead of 1 we have to add user id which is stored in session
      profilePicture.uploadedBy = 1;
      // req.session.userId

      DeleteImg.push(profilePicture);
      }

      const result = await db.sequelize.transaction(async (t) => {
          let addProfilePicture;
          let oldUser;
        if(req.files){

             oldUser = await Users.findAll({
              where:{
                id:id
              },
              transaction:t
            });

            if(oldUser[0].user_imgId!== null){
              addProfilePicture = await Media.findOne({
                where:{
                  id:oldUser[0].user_imgId
                },
                attributes:["id","name","filepath", "size", "extension", "uploadedBy"],
                transaction: t,
              });
                await DeleteFile(addProfilePicture.filepath);
              addProfilePicture.id = addProfilePicture.id
              addProfilePicture.name = profilePicture.name;
              addProfilePicture.filepath= profilePicture.filepath;
              addProfilePicture.size = profilePicture.size
              addProfilePicture.extension=profilePicture.extension;
              addProfilePicture.uploadedBy = profilePicture.uploadedBy;

              await addProfilePicture.save({ transaction: t });

            }else{
              addProfilePicture = await Media.create(profilePicture, {
                transaction: t,
              });
              req.body.user_imgId = addProfilePicture.id;
            }
        }


        let user = await Users.update({
          ...req.body,
        },{where:{id:id},transaction:t});

        res.json({
          status:"success",
          responseCode:200,
        });
      });

    } catch (e) {
    //   req.flash('error', 'notUpdate');
    //   res.redirect("/user/data");
      if(req.files){
        for (let img of DeleteImg) {
          await DeleteFile(img.filepath);
        }
      }
      // console.log(req.body);
      console.error("Error in updating User Data : ", e);
    res.status(422).json({
        status:"failed",
        responseCode: 422,
        message: e || "Unprocessable Entity"
      });
    }
  };  

  const userDetails = async(req,res)=>{
    try {
      const id= Number(req.params.id);

      let userDetails = await Users.findOne({
        where:{
          id:id
        },
      });
      let profilePicture = await Media.findOne({
        where:{
          id: userDetails.user_imgId
        }
      });
      userDetails.dataValues.profilePicture = profilePicture;


      res.json({
        statusCode:200,
        responseCode: "OK",
        message: "User Details Found Successfully.",
        data: userDetails
      });

    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }

  const deleteUser = async(req,res)=>{
    const id = Number(req.params.id);

    try {
      await Users.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        status:"success",
        responseCode:200,
        message: `The User with the id ${id} has been deleted.`
      })
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        responseCode:400,
        message: error.message
      });
    }

  }

  


const addNewAddress = async(req,res)=>{
  const id = Number(req.params.id);
  const newAddr = req.body;
  newAddr.userId = id;

  try {
    const{isDefault} = req.body;
    const result = await db.sequelize.transaction(async(t)=>{
    if(isDefault && isDefault === "true"){
      const data = await db.user_addresses.update({ isDefault: false }, {
        where: {
          userId: id,
          isDefault: true // Only update addresses that are currently set as default
        },
        transaction:t
      });
 
    }
  
    const newAddress = await db.user_addresses.create(newAddr,{transaction:t});
    res.json(newAddress);

    return newAddress;
  });

  } catch (error) {
    res.status(400).json(validator.validateAddress(error));
  }

}

const userSpecificAddr = async(req,res)=>{
    const id = Number(req.params.id);
    try {
      const userAddress = await db.user_addresses.findAll({where:{userId:id}});
      res.json(userAddress);
    } catch (error) {
      res.json({
        status:"fail",
        responseCode:400,
        message:"Error getting address"
      });
    }    
}


const removeAddress = async(req,res)=>{
  const id = Number(req.params.id);
  
  try {
    await db.user_addresses.destroy({
      where:{
        id:id
      }
    });
    res.status(200).json({
      status:"success",
      responseCode:200,
      message: "Deleted Address Successfully!"
    })
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 'failed',
      responseCode: 400,
      message:'Failed to delete the address'
    });
  }

}



  module.exports = {
    addUser,updateUser, userDetails, addNewAddress,  userSpecificAddr, deleteUser,removeAddress
  }