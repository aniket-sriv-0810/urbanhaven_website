import { User } from "../model/user.model.js";

const isAdmin = async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must log in to access this resource." });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied ! Can only be accessed by Admins only." });
    }

    next();
  } catch (error) {
    console.error("Admin authentication error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export { isAdmin };
