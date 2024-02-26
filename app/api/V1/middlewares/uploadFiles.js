const mv = require("mv");
const fs = require("fs");

// const config = require("../config/config.json")["development"];

const Promises = {};

Promises.FileUpload = (file, dest) => {

  return new Promise((resolve, reject) => {
    let nameArray = file.name.split(".");
    let ext = nameArray.pop().toLowerCase();
    let name = nameArray.join(".");
    let size = file.size/1000;

    let fileName = name + "_" + new Date().valueOf() + "." + ext;
    let filePath = dest + fileName;

    file.mv(filePath, function (err) {
      if (err) {
        console.log(err);
        reject();
      }

      resolve({
        name: fileName,
        extension: ext,
        filepath: filePath,
        size: size,
      });
    });
  });
};

Promises.DeleteFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, function (err) {
      if (err) {
        console.log(err);
        reject();
      }

      resolve();
    });
  });
};


module.exports = Promises;
