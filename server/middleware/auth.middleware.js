import passport from 'passport';

const checkLogInUser = passport.authenticate('local' , {
       failureMessage: "Invalid credentials ! Please try again !",
       session: true,
    })


export {checkLogInUser}