const roleBasedAccess = (roles) => {
    return function (req, res, next) {
      if (roles.includes(req.user.role)) {
        next();
      } else {
        return res.status(401).json({
             message: "Permission Denied"});
      }
    };
  };
  
  module.exports = roleBasedAccess;
  