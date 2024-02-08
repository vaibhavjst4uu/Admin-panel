const db = require("../models/index");
const { Op } = require("sequelize");


let brands = db.Brands;

const addBrand = async (req,res)=>{
    const {...reqBody} = req.body;
    console.log(req.body);

    try {
        if(reqBody.name !== ''){
            let user = await brands.create(reqBody);
        }else{
            throw new Error ('Please fill out all fields');
        }
        req.flash('error', "true");
        res.redirect("/brand/data");
    } catch (error) {
        req.flash('error', "false");
        res.redirect("/brand/data");
        console.log(error);
    }
};


const findAll = async(req,res)=>{
    try {
        let Brands = await brands.findAll();

        if(!Brands) throw new Error("no tag found");
    
        const errorRes = req.flash('error');
        res.render("brandData", { Brands, errorRes });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'Error',
            message: err.message
        });
    }
};


const deleteBrand = async (req, res) => {
    const id = Number(req.params.id);
  
    await brands.destroy({
      where: {
        id: id,
      },
    });
  
    res.redirect("/brand/data");
  };
  
  const updatebrand = async (req, res) => {
    try {
  
      let id = Number(req.params.id);
      if(req.body.name === ''){
        throw new Error ('Please fill out all fields');
      }else{
        let role = await brands.update(req.body, {
          where: { id: id },
        });
      }
  
      req.flash('error', "update");
      res.redirect("/brand/data");
    } catch (e) {
      req.flash('error', "notUpdate");
      res.redirect("/brand/data");
      res.status(400).json(e.errors);
    }
  };
















module.exports = {
    addBrand,findAll,updatebrand,deleteBrand
}