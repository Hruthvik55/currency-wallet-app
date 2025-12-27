// import mongoose from "mongoose";

// const transactionSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // sender
//     toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // receiver (if transfer)
//     type: { type: String, enum: ["deposit", "withdraw", "transfer"], required: true },
//     amount: { type: Number, required: true },
//     currency: { type: String, required: true },
//     targetCurrency: { type: String },
//     convertedAmount: { type: Number },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Transaction", transactionSchema);




// import mongoose from "mongoose";

// const transactionSchema = new mongoose.Schema(
//   {
//     userId: { 
//       type: mongoose.Schema.Types.ObjectId, 
//       ref: "User", 
//       required: true 
//     }, // sender

//     toUser: { 
//       type: mongoose.Schema.Types.ObjectId, 
//       ref: "User" 
//     }, // receiver (if transfer)

//     // ✅ Added "received" to enum
//     type: { 
//       type: String, 
//       enum: ["deposit", "withdraw", "transfer", "received"], 
//       required: true 
//     },

//     amount: { 
//       type: Number, 
//       required: true 
//     },

//     currency: { 
//       type: String, 
//       required: true 
//     },

//     targetCurrency: { 
//       type: String 
//     },

//     convertedAmount: { 
//       type: Number 
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Transaction", transactionSchema);




// import mongoose from "mongoose";

// const transactionSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // sender or receiver
//     toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // counterparty
//     type: {
//       type: String,
//       enum: ["deposit", "withdraw", "transfer", "received"], // ✅ added "received"
//       required: true,
//     },
//     amount: { type: Number, required: true },
//     currency: { type: String, required: true },
//     targetCurrency: { type: String },
//     convertedAmount: { type: Number },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Transaction", transactionSchema);

import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fromEmail: { type: String }, // ✅ added
    toEmail: { type: String },   // ✅ added
    type: {
      type: String,
      enum: ["deposit", "withdraw", "transfer", "received"],
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    targetCurrency: { type: String },
    convertedAmount: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
