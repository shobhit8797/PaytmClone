// backend/routes/user.js
const express = require("express");

const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

const signupBody = zod.object({
    username:  zod.string().min(3).max(20),
    password:  zod.string().min(6).max(100),
    password:  zod.string().min(6).max(100),
    firstName: zod.string().min(1).max(50),
});

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs",
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username,
    });

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs",
        });
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    const userId = user._id;

    /// ----- Create new account ------

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000,
    });

    /// -----  ------

    const token = jwt.sign(
        {
            userId,
        },
        JWT_SECRET
    );

    res.json({
        message: "User created successfully",
        token: token,
    });
});

// other auth routes

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information",
        });
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        message: "Updated successfully",
    });
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            {
                firstName: {
                    $regex: filter,
                },
            },
            {
                lastName: {
                    $regex: filter,
                },
            },
        ],
    });

    res.json({
        user: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
        })),
    });
});

module.exports = router;
