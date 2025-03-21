

const isLoggedIn = (req, res, next) => {
  console.log("Session:", req.session);
  console.log("Cookies:", req.cookies);
  console.log("Is Authenticated:", req.isAuthenticated());
  
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("Not authenticated yet !");
  
  return res.status(401).json({
    message: "You must log in to access this resource.",
  });
};


export {isLoggedIn};