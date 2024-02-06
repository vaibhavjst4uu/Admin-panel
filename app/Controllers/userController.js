const db = require("../models/index");
const { Op } = require("sequelize");



// const role_has_permission = require("../models/role_has_permission");
// const user_has_role = require("../models/user_has_role");

let Users = db.User;
let Roles = db.Roles;
let User_has_role = db.user_has_role;

const addUser = async (req, res) => {
  const { status, ...reqBody } = req.body;
  console.log(req.body);
  try {
    
    let user = await Users.create(reqBody);
    // console.log("user add successfully");


    req.flash('error', "true");
    res.redirect("/user/data");

    
  } catch (e) {
    req.flash('error', 'false');
    res.redirect("/user/data");
  }
};

const updateUser = async (req, res) => {
  try {
    let id = Number(req.params.id);

    let user = await Users.update(req.body, {
      where: { id: id },
    });
    req.flash('message', 'Success!!');
    res.redirect("/user/data");
  } catch (e) {
    req.flash('error', 'Error!!');
    res.redirect("/user/data");
  }
};

const findAll = async (req, res) => {
  try {

    let roles = await Roles.findAll({
      where: {
        name: {
          [Op.ne]: "Super Admin",
        },
      },
    });
    // res.json(roles);
    let users = await Users.findAll();
    if (!users) throw new Error("No Users Found!");
    const errorRes = req.flash('error');
    console.log(errorRes);
    console.log(errorRes[0]);
    if (roles) {
      res.render("userdata", { users, roles , errorRes });
    } else {
      res.render("userdata", { users });
    }
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Error Occured!",
    });
  }
};

const deleteUser = async (req, res) => {
  const id = Number(req.params.id);

  await Users.destroy({
    where: {
      id: id,
    },
  });

  res.redirect("/user/data");
};

//methods for User_has_role table

const assignRole = async (req, res) => {
  try {
    let data = await User_has_role.findOrCreate({
      where: {
        userId: req.body.userId,
        roleId: req.body.roleId,
      },
      defaults: {
        userId: req.body.userId,
        roleId: req.body.roleId,
      },
    })
    

    let del = await User_has_role.destroy({
      where: {
        UserId: req.body.userId,
        roleId: {
          [Op.not]: req.body.roleId,
        },
      },
    });

    res.redirect("/user/data");
  } catch (error) {
    console.error(error);
  }
};


const userSpecificRole = async(req,res)=>{
try {
  let id = Number(req.params.id);
  let data = await User_has_role.findOne({
    where:{
      UserId : id
    }
  });
  if(!data){
    throw new Error("User does not have a Role")
    }
  res.status(200).json(data);
} catch (err) {
  res.status(404).json(err);
}
}

module.exports = {
  addUser,
  findAll,
  deleteUser,
  updateUser,
  assignRole,
  userSpecificRole
};
