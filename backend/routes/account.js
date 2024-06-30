// backend/routes/account.js
import { Router } from "express";
import { Account } from "../db";
import { object } from "zod";
import { authMiddleware } from "../middleware";

const router = Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId,
    });

    res.json({
        balance: account.balance,
    });
});

const transferBody = object({
    amount: number().nonempty().int(),
    to: string().nonempty().string(),
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = transferBody.safeParse(req.body);

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(
        session
    );

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

export default router;
