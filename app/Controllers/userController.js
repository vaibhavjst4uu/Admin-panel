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
    req.flash('error', 'update');
    res.redirect("/user/data");
  } catch (e) {
    req.flash('error', 'notUpdate');
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
    // console.log(errorRes);
    // console.log(errorRes[0]);
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
    req.flash('error', 'roleAssigned');
    res.redirect("/user/data");
  } catch (error) {
    console.error(error);
    req.flash('error', 'roleNotAssigned');

    res.redirect("/user/data");

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


const signIn = async(req,res)=>{
  const { email, password } = req.body;
  let Data =await Users.findAll({
    where:{
      email:email,
      password:password
    },
    include:[Roles]
  });

  // console.log(Data);
  // res.json(Data);
  if(Data.length === 0){
    res.json({error:"Invalid email or password"});
    return;
  }
  // res.json(Data.user_has_role[0]);
  if(Data[0].Roles[0].name == "Admin"){
    req.session.userId = Data[0].id;
    req.session.name = Data[0].name;
    req.session.isAdmin = true;
    // console.log(req.session);
    res.redirect("/index");
  }else{
    res.json({error:`Sorry ${Data[0].name} only admin can login on this portal`});
  }

}

const logout = async(req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      res.status(500).json({ message: 'Failed to logout' });
    } else {
      // res.json(req.session.isAdmin);
      console.log("Session destroyed!");
      res.redirect("/");
    }
  });
};
module.exports = {
  addUser,
  findAll,
  deleteUser,
  updateUser,
  assignRole,
  userSpecificRole,
  signIn,
  logout
};
