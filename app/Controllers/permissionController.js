const db = require("../models/index");

let permissions = db.Permissions;

const addPermission = async(req,res)=>{
  const { ...reqBody } = req.body;
  // console.log(req.body);
  try {
    let user = await permissions.create(reqBody);
    res.redirect("/permissiondata");

  } catch (e) {
    res.status(400).json(e.errors);
  }
}

const findAlll = async(req,res)=>{
    try{
        let Permissions=await permissions.findAll();
        if(!Permissions) throw new Error('No permission Found!');
        res.render("permissiondata", {Permissions});
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                status: 'error',
                message:'Error Occured!'
            })
        }
}

const deletePermission = async (req, res) => {
  const id = Number(req.params.id);

  await permissions.destroy({
    where: {
      id: id,
    },
  });

  res.redirect("/permissiondata");
};


const updatePermission = async(req,res)=>{
  try {
    let id = Number(req.params.id);
    let permission = await permissions.update(req.body, {
      where: { id: id },
    });
  
    res.redirect("/permissiondata");
  } catch (e) {
    console.log(e);
    res.status(400).json(e.errors);
  
  }
  
  }


module.exports = {
  addPermission , findAlll, updatePermission, deletePermission
}
