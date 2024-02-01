const db = require("../models/index");

let User = db.User;

const addUser = async (req, res) => {
  const { status, ...reqBody } = req.body;
  console.log(req.body);
  try {
    let user = await User.create(reqBody);
    res.redirect("/user/data");

  } catch (e) {
    res.status(400).json(e.errors);
  }
};

const updateUser = async(req,res)=>{
try {
  let id = Number(req.params.id);

  let user = await User.update(req.body, {
    where: { id: id },
  });

  res.redirect("/user/data");
} catch (e) {
  res.status(400).json(e.errors);

}

}

const findAll = async (req, res) => {
  try {
    let users = await User.findAll();
    if (!users) throw new Error("No Users Found!");
    res.render("userdata", { users });
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

  await User.destroy({
    where: {
      id: id,
    },
  });

  res.redirect("/user/data");
};

module.exports = {
  addUser,
  findAll,
  deleteUser,
  updateUser,
};
