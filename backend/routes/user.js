const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const router = express.Router();

const signupSchema = zod.object({
  username: zod.string().min(3).max(20),
  password: zod.string().min(6).max(100),
  password: zod.string().min(6).max(100),
  firstName: zod.string().min(1).max(50),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { sucess } = signupSchema.safeParse(body);

  if (!sucess) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = User.findOne({
    username: body.username,
  });

  if (user._id) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const dbUser = await User.create(body);
  const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET);

  res.json({
    message: "User created successfully",
    token: token,
  });
});

module.exports = router;
