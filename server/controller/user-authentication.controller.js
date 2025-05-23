import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import passport from "passport";


//Register a new User Logic Controller Code
const createNewUser = asyncHandler(async (req, res) => {
  try {
    const { name, username, phone, email, password } = req.body;

    const existingUsername = await User.findOne({ username });
    const existingPhone = await User.findOne({ phone });
    const existingEmail = await User.findOne({ email : email.toLowerCase() });


    // If any of the checks return a result, throw an error
    if (existingUsername) {
      return res.status(400).json({
        status: 400,
        message: "Validation Error",
        details: ["Username already exists"],
      });
    }
    if (existingPhone) {
      return res.status(400).json({
        status: 400,
        message: "Validation Error",
        details: ["Phone number already registered"],
      });
    }
    if (existingEmail) {
      return res.status(400).json({
        status: 400,
        message: "Validation Error",
        details: ["Email already registered"],
      });
    }

    const imageUrl = req.file ? await uploadOnCloudinary(req.file.path) : null;
    const newUser = new User({
      name,
      username,
      phone,
      email,
      image: imageUrl
        ? imageUrl.url
        : "https://media-hosting.imagekit.io//4bc72ff0889f4681/demo.png?Expires=1837020820&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=c3Nq6Mu7wtR7-l57wCuFJDWqnmAYe1mnhTV60rRh~Jbr8iEoriWR0qAXj7ZZTfT4XwDeVixlpLg0spaVCXXnT0PkgZgvPx8uAqEOl2brHCHXKkKbKmE3Szgkh6l~dfwmJhUcL1pLE0v23fLt6xcVnwglPQ~tZ1fmD02KYcjDD1cX8lTGmF2wSHJv0OVScK2Aw4mHuUSvWbBrDsRt7PpFfWskmXiWUG~QuWDgbcHuSrS2r2ffQ98PdMT96uhXeNRwZsmFs8BSzj15gVYC05hBdkk~7uKhWuA6rl5eSh61hqCLvkjElDrHe7wLa7tfJwUVYRcYicu6LTU0UIeNckAViw__"
    });
    const registerNewUser = await User.register(newUser, password);
    if( !registerNewUser){
      return res.status(404).json(
        new ApiError(404 , ["Validation Error"] , "Unable to register user !")
      )
    }

    console.log("User Registered Successfully");
    //Auto Login after registration
    req.login(registerNewUser,  { session: true } , (err) => {
      if (err) {
        return res.status(500).json(
          new ApiError(500, err, "Auto-login after registration failed!")
        )
      }
      console.log("Auto Login Successfully !");

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { registerNewUser },
            "Successfully registered the new User !"
          )
        );
    });
  }
  catch (error) {
    return res.status(400).json(
      new ApiError(400, error, "Failed to register user !")
    )
  }
});

// Login the Registered User Controller Code
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username , password } = req.body;
console.log(" Value = " , username , password);

      if (!username || !password) {
        return res.status(400).json({
          status: 400,
          message: "Validation Error",
          details: ["Username and Password are required !"],
        });
      }
    const loggedInUser = await User.findOne({username});
    // Use passport.authenticate for proper validation
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: "Unexpected server error occurred!",
          details: [err.message],
        });
      }
      if (!user) {
        return res.status(401).json({
          status: 401,
          message: "Invalid Credentials!",
          details: [info?.message || "Authentication failed."],
        });
      }

      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            message: "Login failed",
            details: ["Unexpected server error occurred!"],
          });
        }
        console.log("Body : ", req.body);
        
        return res.status(200).json({
          status: 200,
          data: { loggedInUser },
          message: "Successfully logged in the User!",
        });
      });
    })(req, res); // Execute passport.authenticate
  } 
  catch (error) {
  return  res.status(500).json({
      status: 500,
      message: "Failed to log in",
      details: [error.message || "An unexpected error occurred!"],
    });
  }
});

//Logout User Controller Code
const logOutUser = asyncHandler(async (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        return res.status(400).json(new ApiError(400, err, "Failed to logout!"));
      }

      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json(new ApiError(500, err, "Failed to logout!"));
        }

        res.clearCookie("connect.sid"); // Clear the session cookie
        return res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
      });
    });
  } catch (error) {
    return res.status(500).json(new ApiError(500, error, "Logout failed!"));
  }
});

// Checks the authentication of the user - login or not Controller Code
const checkAuthentication = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      console.log("user is authenticated and data", req.user);
      const user = req.user;
      console.log("User is authenticated !");
      return res
        .status(200)
        .json(new ApiResponse(200, { isAuthenticated: true, user }));
    } else {
      console.log("user not authenticated yet !");
      return res.status(200).json(new ApiResponse(200, { isAuthenticated: false } , "User not authenticated yet !"));
    }
  }
   catch (error) {
    console.log("Error in User Authentication !", error);
    return res.status(400).json(
      new ApiError(400 , error.message || error , "Failed to Authenticate the User !")
    )
  }
});


export {
    createNewUser,
    loginUser,
    logOutUser,
    checkAuthentication,
  };