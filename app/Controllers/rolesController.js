const db = require("../models/index");
const { Op } = require("sequelize");


let roles = db.Roles;
let role_has_permission = db.role_has_permission;
let permissions = db.Permissions;

const addRole = async (req, res) => {
  const { ...reqBody } = req.body;
  console.log(req.body);
  try {
    if(reqBody.name !== ''){
      let user = await roles.create(reqBody);
    }else{
      throw new Error ('Please fill out all fields');
    }
    req.flash('error', "true");
    res.redirect("/role/data");
  } catch (e) {
    req.flash('error', "false");
    res.redirect("/role/data");
    console.log(e);
  }
};

const findAlll = async (req, res) => {
  try {
    let Roles = await roles.findAll();
    // console.log("role is here"+Roles);
    if (!Roles) throw new Error("No Role Found!");
    const errorRes = req.flash('error');
    res.render("roledata", { Roles, errorRes });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Error Occured!",
    });
  }
};

const deleteRole = async (req, res) => {
  const id = Number(req.params.id);

  await roles.destroy({
    where: {
      id: id,
    },
  });

  res.redirect("/role/data");
};

const updateRole = async (req, res) => {
  try {

    let id = Number(req.params.id);
    if(req.body.name === ''){
      throw new Error ('Please fill out all fields');
    }else{
      let role = await roles.update(req.body, {
        where: { id: id },
      });
    }

    req.flash('error', "update");
    res.redirect("/role/data");
  } catch (e) {
    req.flash('error', "notUpdate");
    res.redirect("/role/data");
    res.status(400).json(e.errors);
  }
};

// controllers of role has permission

const Alldata = async (req, res) => {
  try {
    let permissionData = await permissions.findAll({
      attributes: ["Module_name"], // Include the column you want to retrieve
      raw: true, // Ensure the result is plain JSON objects
      nest: true, // Nesting the results to get a clean JSON
      distinct: true, // Use the DISTINCT keyword
    });

    let uniqueModuleObjects = [
      ...new Set(permissionData.map((item) => JSON.stringify(item))),
    ].map(JSON.parse);
    // console.log(uniqueModuleObjects);

    let permisionSet = await permissions.findAll({
      attributes: ["id", "name"], // Include the column we want to retrieve
      raw: true, // Ensure the result is plain JSON objects
      nest: true, // Nesting the results to get a clean JSON
      distinct: true, // Use the DISTINCT keyword
    });
    // console.log(permisionSet);

    let roleData = await roles.findAll();

    if (!permissionData.length && !roleData.length) {
      throw new Error("No role or permission data found!");
    }
    // console.log(permissionData);
    const errorRes = req.flash('error');
    res.render("roleHasPermissionData", {
      permisionSet,
      roleData,
      uniqueModuleObjects,
      errorRes,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Error Occured!",
      
    });
  }
};

const savePermission = async (req, res) => {
  try {
    const { role, permissions } = req.body;
    console.log(permissions);
    await role_has_permission.sync({ alter: true });

    if (typeof permissions === "string") {
      let RolePermission = await role_has_permission.findOrCreate({
        where: {
          roleId: role,
          permissionId: parseInt(permissions),
        },
        defaults: {
          roleId: role,
          permissionId: parseInt(permissions),
        },
      });
      // console.log(RolePermission);

      let del = await role_has_permission.destroy({
        where: {
          roleId: role,
          permissionId: {
            [Op.not]: parseInt(RolePermission[0].permissionId),
          },
        },
      });
    } else {
      permissions.forEach((per) => {
        let RolePermission = async (role, per) => {
          return await role_has_permission.findOrCreate({
            where: {
              roleId: role,
              permissionId: per,
            },
            defaults: {
              roleId: role,
              permissionId: per,
            },
          });
        };
        RolePermission(role, per);
      });
      let del = await role_has_permission.destroy({
        where: {
          roleId: role,
          permissionId: {
            [Op.notIn]: permissions,
          },
        },
      });
    }
    req.flash('error', "permissionAssigned");
    res.redirect("/role/role_has_permissions");
  } catch (error) {
    req.flash('error', "permissionNotAssigned");
    res.redirect("/role/role_has_permissions");
    console.log(error);
  }
};

let roleSpecificPermission = async (req, res) => {
  try {
    const roleId = Number(req.params.id);
    let data = await role_has_permission.findAll({
      where: {
        roleId: roleId,
      },
      attributes: ["permissionId"],
    });
    res.status(200).json(data);
  } catch (e) {
    console.log("Error in getting specific permissions for a role", e);
    res.status(400).json(e);
  }
};

module.exports = {
  addRole,
  findAlll,
  deleteRole,
  updateRole,
  Alldata,
  savePermission,
  roleSpecificPermission,
};
