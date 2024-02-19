const db = require("../models/index");
const { Op } = require("sequelize");


let tags = db.Tags;

const addTag = async (req,res)=>{
    const {...reqBody} = req.body;
  reqBody.createdBy = req.session.userId;

    try {
        if(reqBody.name !== ''){
            let user = await tags.create(reqBody);
        }else{
            throw new Error ('Please fill out all fields');
        }
        req.flash('error', "true");
        res.redirect("/tag/data");
    } catch (error) {
        req.flash('error', "false");
        res.redirect("/tag/data");
        console.log(error);
    }
};


const findAll = async(req,res)=>{
    try {
        let Tags = await tags.findAll();

        if(!Tags) throw new Error("no tag found");
    
        const errorRes = req.flash('error');
        res.render("tagData", { Tags, errorRes });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'Error',
            message: err.message
        });
    }
};


const deleteTag = async (req, res) => {
    const id = Number(req.params.id);
  
    await tags.destroy({
      where: {
        id: id,
      },
    });
  
    res.redirect("/tag/data");
  };
  
  const updateTag = async (req, res) => {
    try {
  
      let id = Number(req.params.id);
      if(req.body.name === ''){
        throw new Error ('Please fill out all fields');
      }else{
        let tag = await tags.update(req.body, {
          where: { id: id },
        });
      }
  
      req.flash('error', "update");
      res.redirect("/tag/data");
    } catch (e) {
      req.flash('error', "notUpdate");
      res.redirect("/tag/data");
      res.status(400).json(e.errors);
    }
  };
















module.exports = {
    addTag,findAll,updateTag,deleteTag
}