 
 const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, allow access to the route.
    }

    // If not authenticated, redirect to register route or send a response.
    return res.status(401).json({
        message: "You must log in to access this resource. If you don't have an account, please register first.",
        redirectTo: "/register", // Frontend can use this for redirection.
    });
};

export {isLoggedIn};