const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const SALT_ROUNDS = 10;

// Api Methods
const user_controller = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
      const [user, created] = await User.findOrCreate({
        where: { email: email },
        defaults: { password: password_hash },
      });
      if (created) {
        return res.status(201).json({ message: "Registered successfully" });
      } else {
        return res.status(400).json({ message: "Email already exists" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occured. Please try again" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: { email: email },
      });
      if (!user) {
        return res.status(400).json({ message: "User does not exist." });
      }
      const is_password_valid = await bcrypt.compare(password, user.password);
      if (is_password_valid) {
        const token = jwt.sign(
          { email: email, role: user.role },
          process.env.JWT_SECRET_KEY
        );
        return res
          .cookie("auth_token", "token", {
            httpOnly: true,
            sameSite: "Lax",
            secure: false,
            maxAge: 60 * 60 * 24,
          })
          .status(200)
          .json({ message: "Login successfull." });
      } else {
        return res.status(400).json({ message: "Invalid email or password." });
      }
    } catch (error) {
      console.log({ error: error });
      return res
        .status(500)
        .json({ message: "An error occured. Please try again" });
    }
  },
};

module.exports = user_controller;
