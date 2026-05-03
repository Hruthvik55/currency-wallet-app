// import express from "express";
// import Wallet from "../models/wallet.js";
// import Transaction from "../models/Transaction.js";
// import protect from "../middleware/authMiddleware.js";
// import { convertCurrency } from "../utils/currencyConverter.js";
// import User from "../models/User.js";

// const router = express.Router();

// // 📌 Middleware helper: Get or create wallet
// const getWallet = async (userId) => {
//   let wallet = await Wallet.findOne({ userId });
//   if (!wallet) {
//     wallet = new Wallet({ userId, balance: 0 });
//     await wallet.save();
//   }
//   return wallet;
// };

// // ✅ Deposit
// router.post("/deposit", protect, async (req, res) => {
//   try {
//     const { amount } = req.body;
//     if (!amount || amount <= 0) {
//       return res.status(400).json({ message: "Invalid deposit amount" });
//     }

//     const wallet = await getWallet(req.user._id);
//     wallet.balance += amount;
//     await wallet.save();

//     await Transaction.create({
//       userId: req.user._id,
//       type: "deposit",
//       amount,
//       currency: wallet.currency,
//     });

//     res.json({ message: "Deposit successful", balance: wallet.balance });
//   } catch (error) {
//     res.status(500).json({ message: "Deposit failed", error: error.message });
//   }
// });

// // ✅ Withdraw
// router.post("/withdraw", protect, async (req, res) => {
//   try {
//     const { amount } = req.body;
//     if (!amount || amount <= 0) {
//       return res.status(400).json({ message: "Invalid withdraw amount" });
//     }

//     const wallet = await getWallet(req.user._id);
//     if (wallet.balance < amount) {
//       return res.status(400).json({ message: "Insufficient balance" });
//     }

//     wallet.balance -= amount;
//     await wallet.save();

//     await Transaction.create({
//       userId: req.user._id,
//       type: "withdraw",
//       amount,
//       currency: wallet.currency,
//     });

//     res.json({ message: "Withdrawal successful", balance: wallet.balance });
//   } catch (error) {
//     res.status(500).json({ message: "Withdrawal failed", error: error.message });
//   }
// });

// // ✅ Transfer (only if wallet setup complete)
// router.post("/transfer", protect, async (req, res) => {
//   try {
//     const { recipientEmail, amount, currency, targetCurrency } = req.body;

//     if (!recipientEmail || !amount || amount <= 0 || !currency || !targetCurrency) {
//       return res.status(400).json({ message: "Missing or invalid fields" });
//     }

//     // Check if sender has set up wallet
//     const sender = await User.findById(req.user._id);
//     if (!sender.bankAccount || !sender.ifsc) {
//       return res.status(400).json({ message: "⚠️ Please set up your wallet before making transfers." });
//     }

//     // Find recipient by email
//     const recipient = await User.findOne({ email: recipientEmail });
//     if (!recipient) return res.status(404).json({ message: "Recipient not found" });

//     // Ensure recipient also has wallet setup
//     if (!recipient.bankAccount || !recipient.ifsc) {
//       return res.status(400).json({ message: "Recipient has not set up their wallet yet." });
//     }

//     // Prevent sending to self
//     if (req.user._id.toString() === recipient._id.toString()) {
//       return res.status(400).json({ message: "Cannot transfer to yourself" });
//     }

//     const fromWallet = await getWallet(req.user._id);
//     const toWallet = await getWallet(recipient._id);

//     if (fromWallet.balance < amount) {
//       return res.status(400).json({ message: "Insufficient balance" });
//     }

//     // Convert if needed
//     let receivedAmount = amount;
//     if (currency !== targetCurrency) {
//       receivedAmount = await convertCurrency(currency, targetCurrency, amount);
//     }
//     if (isNaN(receivedAmount)) {
//       return res.status(500).json({ message: "Currency conversion failed" });
//     }

//     // Update balances
//     fromWallet.balance -= amount;
//     toWallet.balance += receivedAmount;
//     await fromWallet.save();
//     await toWallet.save();

//     // Record transactions (both sides)
//     await Transaction.create({
//       userId: req.user._id,
//       toUser: recipient._id,
//       type: "transfer",
//       amount,
//       currency,
//       targetCurrency,
//       convertedAmount: receivedAmount,
//     });

//     await Transaction.create({
//       userId: recipient._id,
//       toUser: req.user._id,
//       type: "transfer",
//       amount: receivedAmount,
//       currency: targetCurrency,
//       convertedAmount: receivedAmount,
//     });

//     res.json({
//       message: "Transfer successful",
//       sent: `${amount} ${currency}`,
//       received: `${receivedAmount.toFixed(2)} ${targetCurrency}`,
//       fromBalance: fromWallet.balance,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Transfer failed", error: error.message });
//   }
// });


// // ✅ Transaction History
// router.get("/history", protect, async (req, res) => {
//   try {
//     const transactions = await Transaction.find({ userId: req.user._id })
//       .populate("toUser", "email") // show email instead of id
//       .sort({ createdAt: -1 });

//     const formatted = transactions.map((tx) => ({
//       ...tx.toObject(),
//       toUser: tx.toUser?.email || null,
//     }));

//     res.json(formatted);
//   } catch (error) {
//     res.status(500).json({ message: "Could not fetch history", error: error.message });
//   }
// });


// // get wallet balance
// router.get("/balance", protect, async (req, res) => {
//   try {
//     const wallet = await Wallet.findOne({ userId: req.user._id });
//     if (!wallet) {
//       return res.status(404).json({ message: "Wallet not found. Please set it up first." });
//     }
//     res.json({ balance: wallet.balance, currency: wallet.currency });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// export default router;












import express from "express";
import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";
import protect from "../middleware/authMiddleware.js";
import { convertCurrency } from "../utils/currencyConverter.js";
import User from "../models/User.js";

const router = express.Router();

// 📌 Helper: Get or create wallet
const getWallet = async (userId) => {
  let wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    wallet = new Wallet({ userId, balance: 0 });
    await wallet.save();
  }
  return wallet;
};

// ✅ Deposit
router.post("/deposit", protect, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Invalid deposit amount" });

    const wallet = await getWallet(req.user._id);
    wallet.balance += amount;
    await wallet.save();

    await Transaction.create({
      userId: req.user._id,
      type: "deposit",
      amount,
      currency: wallet.currency,
    });

    res.json({ message: "Deposit successful", balance: wallet.balance });
  } catch (error) {
    res.status(500).json({ message: "Deposit failed", error: error.message });
  }
});

// ✅ Withdraw
router.post("/withdraw", protect, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Invalid withdraw amount" });

    const wallet = await getWallet(req.user._id);
    if (wallet.balance < amount)
      return res.status(400).json({ message: "Insufficient balance" });

    wallet.balance -= amount;
    await wallet.save();

    await Transaction.create({
      userId: req.user._id,
      type: "withdraw",
      amount,
      currency: wallet.currency,
    });

    res.json({ message: "Withdrawal successful", balance: wallet.balance });
  } catch (error) {
    res.status(500).json({ message: "Withdrawal failed", error: error.message });
  }
});

// // ✅ Transfer (with proper sender/receiver tracking)
// router.post("/transfer", protect, async (req, res) => {
//   try {
//     const { recipientEmail, amount, currency, targetCurrency } = req.body;

//     if (!recipientEmail || !amount || amount <= 0 || !currency || !targetCurrency)
//       return res.status(400).json({ message: "Missing or invalid fields" });

//     // Check sender wallet setup
//     const sender = await User.findById(req.user._id);
//     if (!sender.bankAccount || !sender.ifsc)
//       return res.status(400).json({ message: "⚠️ Please set up your wallet before making transfers." });

//     // Find recipient
//     const recipient = await User.findOne({ email: recipientEmail });
//     if (!recipient)
//       return res.status(404).json({ message: "Recipient not found" });

//     if (!recipient.bankAccount || !recipient.ifsc)
//       return res.status(400).json({ message: "Recipient has not set up their wallet yet." });

//     if (req.user._id.toString() === recipient._id.toString())
//       return res.status(400).json({ message: "Cannot transfer to yourself" });

//     const fromWallet = await getWallet(req.user._id);
//     const toWallet = await getWallet(recipient._id);

//     if (fromWallet.balance < amount)
//       return res.status(400).json({ message: "Insufficient balance" });

//     // Convert currency if needed
//     let receivedAmount = amount;
//     if (currency !== targetCurrency) {
//       receivedAmount = await convertCurrency(currency, targetCurrency, amount);
//     }

//     if (isNaN(receivedAmount))
//       return res.status(500).json({ message: "Currency conversion failed" });

//     // Update balances
//     fromWallet.balance -= amount;
//     toWallet.balance += receivedAmount;
//     await fromWallet.save();
//     await toWallet.save();

//     // Record both transactions (sender + receiver)
//     await Transaction.create({
//       userId: req.user._id,
//       toUser: recipient._id,
//       type: "transfer",
//       amount,
//       currency,
//       targetCurrency,
//       convertedAmount: receivedAmount,
//     });

//     await Transaction.create({
//       userId: recipient._id,
//       toUser: req.user._id,
//       type: "received",
//       amount: receivedAmount,
//       currency: targetCurrency,
//       convertedAmount: receivedAmount,
//     });

//     res.json({
//       message: "Transfer successful",
//       sent: `${amount} ${currency}`,
//       received: `${receivedAmount.toFixed(2)} ${targetCurrency}`,
//       fromBalance: fromWallet.balance,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Transfer failed", error: error.message });
//   }
// });


// ✅ Transfer (debug version)
// router.post("/transfer", protect, async (req, res) => {
//   try {
//     console.log("📤 Transfer request:", req.body); // 👈 log incoming data

//     const { recipientEmail, amount, currency, targetCurrency } = req.body;

//     if (!recipientEmail || !amount || amount <= 0 || !currency || !targetCurrency) {
//       console.log("❌ Invalid fields");
//       return res.status(400).json({ message: "Missing or invalid fields" });
//     }

//     const sender = await User.findById(req.user._id);
//     if (!sender.bankAccount || !sender.ifsc) {
//       console.log("❌ Sender wallet not set up");
//       return res.status(400).json({ message: "⚠️ Please set up your wallet before making transfers." });
//     }

//     const recipient = await User.findOne({ email: recipientEmail });
//     if (!recipient) {
//       console.log("❌ Recipient not found");
//       return res.status(404).json({ message: "Recipient not found" });
//     }

//     if (!recipient.bankAccount || !recipient.ifsc) {
//       console.log("❌ Recipient wallet not set up");
//       return res.status(400).json({ message: "Recipient has not set up their wallet yet." });
//     }

//     if (req.user._id.toString() === recipient._id.toString()) {
//       console.log("❌ Tried to transfer to self");
//       return res.status(400).json({ message: "Cannot transfer to yourself" });
//     }

//     const fromWallet = await getWallet(req.user._id);
//     const toWallet = await getWallet(recipient._id);

//     if (fromWallet.balance < amount) {
//       console.log("❌ Insufficient balance");
//       return res.status(400).json({ message: "Insufficient balance" });
//     }

//     console.log("🔄 Converting currency...");
//     let receivedAmount = amount;
//     if (currency !== targetCurrency) {
//       receivedAmount = await convertCurrency(currency, targetCurrency, amount);
//     }
//     if (isNaN(receivedAmount)) {
//       console.log("❌ Conversion failed");
//       return res.status(500).json({ message: "Currency conversion failed" });
//     }

//     console.log("💾 Updating wallets...");
//     fromWallet.balance -= amount;
//     toWallet.balance += receivedAmount;
//     await fromWallet.save();
//     await toWallet.save();

//     console.log("🧾 Creating transaction records...");
// const senderTx = new Transaction({
//   userId: sender._id, // A
//   from: sender.email,
//   to: recipient.email,
//   type: "transfer",
//   amount,
//   currency,
//   targetCurrency,
//   convertedAmount: receivedAmount,
// });
// await senderTx.save();

// // 🟢 Receiver transaction
// const receiverTx = new Transaction({
//   userId: recipient._id, // B
//   from: sender.email, // ✅ correct “from”
//   to: recipient.email,
//   type: "received",
//   amount: receivedAmount,
//   currency: targetCurrency,
//   convertedAmount: receivedAmount,
// });
// await receiverTx.save();


//     console.log("✅ Transfer success!");
//     res.json({
//       message: "Transfer successful",
//       sent: `${amount} ${currency}`,
//       received: `${receivedAmount.toFixed(2)} ${targetCurrency}`,
//       fromBalance: fromWallet.balance,
//     });
//   } catch (error) {
//     console.error("💥 Transfer failed:", error);
//     res.status(500).json({ message: "Transfer failed", error: error.message });
//   }
// });



// // ✅ Transfer (final fixed version)
// router.post("/transfer", protect, async (req, res) => {
//   try {
//     const { recipientEmail, amount, currency, targetCurrency } = req.body;

//     if (!recipientEmail || !amount || amount <= 0 || !currency || !targetCurrency) {
//       return res.status(400).json({ message: "Missing or invalid fields" });
//     }

//     const sender = await User.findById(req.user._id);
//     const recipient = await User.findOne({ email: recipientEmail });

//     if (!recipient) {
//       return res.status(404).json({ message: "Recipient not found" });
//     }

//     if (sender._id.toString() === recipient._id.toString()) {
//       return res.status(400).json({ message: "Cannot transfer to yourself" });
//     }

//     const fromWallet = await getWallet(sender._id);
//     const toWallet = await getWallet(recipient._id);

//     if (fromWallet.balance < amount) {
//       return res.status(400).json({ message: "Insufficient balance" });
//     }

//     // 🪙 Currency Conversion
//     let receivedAmount = amount;
//     if (currency !== targetCurrency) {
//       receivedAmount = await convertCurrency(currency, targetCurrency, amount);
//     }

//     // 💾 Update wallets
//     fromWallet.balance -= amount;
//     toWallet.balance += receivedAmount;
//     await fromWallet.save();
//     await toWallet.save();

//     // 🧾 Create Sender Transaction
//     const senderTx = new Transaction({
//       userId: sender._id, // who performed the action
//       from: sender.email, // ✅ sender’s email
//       to: recipient.email, // ✅ receiver’s email
//       type: "transfer",
//       amount,
//       currency,
//       targetCurrency,
//       convertedAmount: receivedAmount,
//     });

//     // 🧾 Create Receiver Transaction
//     const receiverTx = new Transaction({
//       userId: recipient._id, // receiver’s dashboard
//       from: sender.email, // ✅ show who sent it
//       to: recipient.email,
//       type: "received",
//       amount: receivedAmount,
//       currency: targetCurrency,
//       convertedAmount: receivedAmount,
//     });

//     await senderTx.save();
//     await receiverTx.save();

//     res.json({
//       message: "Transfer successful",
//       sent: `${amount} ${currency}`,
//       received: `${receivedAmount.toFixed(2)} ${targetCurrency}`,
//       fromBalance: fromWallet.balance,
//     });
//   } catch (error) {
//     console.error("💥 Transfer failed:", error);
//     res.status(500).json({ message: "Transfer failed", error: error.message });
//   }
// });



// ✅ Transfer (final correct version)
router.post("/transfer", protect, async (req, res) => {
  try {
    const { recipientEmail, amount, currency, targetCurrency } = req.body;

    if (!recipientEmail || !amount || amount <= 0 || !currency || !targetCurrency) {
      return res.status(400).json({ message: "Missing or invalid fields" });
    }

    const sender = await User.findById(req.user._id);
    const recipient = await User.findOne({ email: recipientEmail });

    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    if (sender._id.toString() === recipient._id.toString()) {
      return res.status(400).json({ message: "Cannot transfer to yourself" });
    }

    const fromWallet = await getWallet(sender._id);
    const toWallet = await getWallet(recipient._id);

    if (fromWallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // 💱 Convert currency if needed
    let receivedAmount = amount;
    if (currency !== targetCurrency) {
      receivedAmount = await convertCurrency(currency, targetCurrency, amount);
    }

    // 💾 Update wallets
    fromWallet.balance -= amount;
    toWallet.balance += receivedAmount;
    await fromWallet.save();
    await toWallet.save();

    // 🧾 Sender Transaction
    const senderTx = new Transaction({
      userId: sender._id,
      toUser: recipient._id,
      fromEmail: sender.email,
      toEmail: recipient.email,
      type: "transfer",
      amount,
      currency,
      targetCurrency,
      convertedAmount: receivedAmount,
    });

    // 🧾 Receiver Transaction
    const receiverTx = new Transaction({
      userId: recipient._id,
      toUser: sender._id,
      fromEmail: sender.email,
      toEmail: recipient.email,
      type: "received",
      amount: receivedAmount,
      currency: targetCurrency,
      convertedAmount: receivedAmount,
    });

    await senderTx.save();
    await receiverTx.save();

    res.json({
      message: "Transfer successful",
      sent: `${amount} ${currency}`,
      received: `${receivedAmount.toFixed(2)} ${targetCurrency}`,
      fromBalance: fromWallet.balance,
    });
  } catch (error) {
    console.error("💥 Transfer failed:", error);
    res.status(500).json({ message: "Transfer failed", error: error.message });
  }
});




// // ✅ Transaction History (now shows both From / To)
// router.get("/history", protect, async (req, res) => {
//   try {
//     const transactions = await Transaction.find({ userId: req.user._id })
//       .populate("userId", "email") // Sender email
//       .populate("toUser", "email") // Receiver email
//       .sort({ createdAt: -1 });

//     const formatted = transactions.map((tx) => ({
//       _id: tx._id,
//       type: tx.type,
//       amount: tx.amount,
//       currency: tx.currency,
//       convertedAmount: tx.convertedAmount,
//       targetCurrency: tx.targetCurrency,
//       from: tx.userId?.email || "N/A",
//       to: tx.toUser?.email || "N/A",
//       createdAt: tx.createdAt,
//     }));

//     res.json(formatted);
//   } catch (error) {
//     res.status(500).json({ message: "Could not fetch history", error: error.message });
//   }
// });




router.get("/history", protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({ createdAt: -1 });

    const formatted = transactions.map((tx) => ({
      _id: tx._id,
      type: tx.type,
      amount: tx.amount,
      currency: tx.currency,
      convertedAmount: tx.convertedAmount,
      targetCurrency: tx.targetCurrency,
      from: tx.fromEmail || "N/A",
      to: tx.toEmail || "N/A",
      createdAt: tx.createdAt,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch history", error: error.message });
  }
});


// ✅ Get wallet balance
router.get("/balance", protect, async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user._id });
    if (!wallet)
      return res.status(404).json({ message: "Wallet not found. Please set it up first." });

    res.json({ balance: wallet.balance, currency: wallet.currency });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



//🗑️ Delete a transaction by ID
router.delete("/transaction/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if transaction exists
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Delete the transaction
    await Transaction.findByIdAndDelete(id);

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Server error while deleting transaction" });
  }
});


export default router;
