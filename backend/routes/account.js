// backend/routes/account.js
const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const zod = require("zod");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId,
    });

    res.json({
        balance: account.balance,
    });
});

const transferBody = zod.object({
    amount: zod.number().min(1),
    to: zod.string(),
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { success } = transferBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Invalid Input",
        });
    }

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(
        session
    );
    const { amount, to } = req.body;


    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance",
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account",
        });
    }

    // Perform the transfer
    await Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
        { userId: to },
        { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful",
    });
});

module.exports = router;
