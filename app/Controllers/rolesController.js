const db = require("../models/index");

let roles = db.Roles;

const addRole = async(req,res)=>{
  const { ...reqBody } = req.body;
  // console.log(req.body);
  try {
    let user = await roles.create(reqBody);
    res.redirect("/roledata");

  } catch (e) {
    res.status(400).json(e.errors);
  }
}

const findAlll = async(req,res)=>{
    try{
        let Roles=await roles.findAll();
        // console.log("role is here"+Roles);
        if(!Roles) throw new Error('No Role Found!');
        res.render("roledata", { Roles });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                status: 'error',
                message:'Error Occured!'
            })
        }
}

const deleteRole = async (req, res) => {
  const id = Number(req.params.id);

  await roles.destroy({
    where: {
      id: id,
    },
  });

  res.redirect("/roledata");
};


const updateRole = async(req,res)=>{
  try {
    let id = Number(req.params.id);
  
    let role = await roles.update(req.body, {
      where: { id: id },
    });
  
    res.redirect("/roledata");
  } catch (e) {
    res.status(400).json(e.errors);
  
  }
  
  }

module.exports = {
  addRole , findAlll, deleteRole,updateRole
}
