const db = require("../models/index");
const { Op } = require("sequelize");


let categories = db.Categories;

const addCategory = async (req,res)=>{
    const {...reqBody} = req.body;
    // console.log(req.body);

    reqBody.createdBy = req.session.userId;

    try {
        if(reqBody.name !== ''){
            let user = await categories.create(reqBody);
        }else{
            throw new Error ('Please fill out all fields');
        }
        req.flash('error', "true");
        res.redirect("/category/data");
    } catch (error) {
        req.flash('error', "false");
        res.redirect("/category/data");
        console.log(error);
    }
};


const findAll = async(req,res)=>{
    try {
        let Categories = await categories.findAll();

        if(!Categories) throw new Error("no category found");
    
        const errorRes = req.flash('error');
        res.render("categoryData", { Categories, errorRes });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'Error',
            message: err.message
        });
    }
};


const deleteCategory = async (req, res) => {
    const id = Number(req.params.id);
  
    await categories.destroy({
      where: {
        id: id,
      },
    });
  
    res.redirect("/category/data");
  };
  
  const updateCategory = async (req, res) => {
    try {
  
      let id = Number(req.params.id);
      if(req.body.name === ''){
        throw new Error ('Please fill out all fields');
      }else{
        let category = await categories.update(req.body, {
          where: { id: id },
        });
      }
  
      req.flash('error', "update");
      res.redirect("/category/data");
    } catch (e) {
      req.flash('error', "notUpdate");
      res.redirect("/category/data");
      res.status(400).json(e.errors);
    }
  };
















module.exports = {
    addCategory,findAll,updateCategory,deleteCategory
}