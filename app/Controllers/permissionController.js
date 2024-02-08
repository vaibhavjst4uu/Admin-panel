const db = require("../models/index");

let permissions = db.Permissions;

const addPermission = async(req,res)=>{
  const { Module_name } = req.body;
  console.log(req.body);
  const module = Module_name.toLowerCase();
  const Module =  Module_name.charAt(0).toUpperCase() + Module_name.slice(1).toLowerCase();
  try {

    if(Module_name === ''){
      throw new Error("module name cannot be empty");
    }else{
      let user = await permissions.bulkCreate([
        {
          name: `${Module} Read`,
          slug: `${module}__read`,
          Module_name:`${Module}`
        },
        {
          name: `${Module} Create`,
          slug: `${module}__create`,
          Module_name:`${Module}`
        },
        {
          name: `${Module} Edit`,
          slug: `${module}__edit`,
          Module_name:`${Module}`
        },
        {
          name: `${Module} Delete`,
          slug: `${module}__delete`,
          Module_name:`${Module}`
        }         
  
      ]);     
    }

    req.flash('error', "true");
    res.redirect("/permission/data");

  } catch (e) {
    req.flash('error', "false");
    res.redirect("/permission/data");
    console.log(e);
  }
}

const findAlll = async(req,res)=>{
    try{
        let Permissions=await permissions.findAll();
        if(!Permissions) throw new Error('No permission Found!');
        const errorRes = req.flash('error');        
        res.render("permissiondata", {Permissions, errorRes});
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

  res.redirect("/permission/data");
};


const updatePermission = async(req,res)=>{
  try {
    let id = Number(req.params.id);
    console.log(req.body);
    
    let permission = await permissions.update(req.body, {
      where: { id: id },
    });
    req.flash('error', "update");  
    res.redirect("/permission/data");
  } catch (e) {
    console.log(e);
    req.flash('error', "notUpdate");  
    res.redirect("/permission/data");
  
  }
  
  }


module.exports = {
  addPermission , findAlll, updatePermission, deletePermission
}
