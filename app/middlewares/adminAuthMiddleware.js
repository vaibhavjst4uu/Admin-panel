
const adminAuthMiddleware = async(req, res, next) => {
    // Check if user is authenticated and is an admin
  // console.log(req.session.isAdmin, "shhhhhhhhhhhhhhhh");


    if (req.session && req.session.isAdmin== true) {
      // User is authenticated as admin, proceed to the next middleware
      // console.log("i am hitting it");
      // console.log(req.session.isAdmin);

      next();
    } else {
      // User is not authenticated as admin, send unauthorized response
      res.status(403).json({ message: 'You do not have permission to access this resource' });
    }
  };
  
  module.exports = adminAuthMiddleware;
  