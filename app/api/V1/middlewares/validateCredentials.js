let responseFormate = {
    status: 400,
    message: "invalid data",
    error: [],
    data: [],
  };
  
  const validate = (e) => {
    console.log(e.errors);
    responseFormate.error = [];
    responseFormate.data = [];
    if (e.errors) {
      e.errors.forEach((error) => {
        if (error.validatorKey === "isEmail") {
          responseFormate.error.push({
            field: error.path,
            messege: error.message,
          });
        }
  
        if (error.validatorKey === "notEmpty") {
          responseFormate.error.push({
            field: error.path,
            message: error.message,
          });
        }
  
        if (error.validatorKey === "isStrongPassword") {
          responseFormate.error.push({
            field: error.path,
            message: error.message,
          });
        }
        if (error.validatorKey === "not_unique") {
          responseFormate.error.push({
            field: error.path,
            message: error.message,
          });
        }
        if (error.validatorKey === "isIn") {
          responseFormate.error.push({
            field: error.path,
            messege: error.message,
          });
        }
  
        if (error.validatorKey === "len") {
          responseFormate.error.push({
            field: error.path,
            messege: error.message,
          });
        }
      });
    }
    return responseFormate;
  };
  
  module.exports = {
    validate,
  };
  