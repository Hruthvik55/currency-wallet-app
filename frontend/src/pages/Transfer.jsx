// // src/pages/Transfer.jsx
// import React, { useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function Transfer() {
//   const [recipientEmail, setRecipientEmail] = useState("");
//   const [amount, setAmount] = useState("");
//   const [currency, setCurrency] = useState("USD");
//   const [targetCurrency, setTargetCurrency] = useState("USD");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const body = { recipientEmail, amount: Number(amount), currency, targetCurrency };
//       const res = await api.post("/wallet/transfer", body);
//       alert(res.data.message + ` — Received: ${res.data.received}`);
//       navigate("/dashboard");
//     } catch (err) {
//       alert(err.response?.data?.message || "Transfer failed");
//     }
//   };

//   return (
//     <section className="card transfer-card">
//       <h2 className="heading">Send / Convert</h2>
//       <form className="form" onSubmit={handleSubmit}>
//         <input className="input" placeholder="Recipient email" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} required />
//         <input className="input" placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
//         <div className="form-row">
//           <select className="select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
//             <option>USD</option><option>INR</option><option>EUR</option><option>GBP</option><option>JPY</option>
//           </select>
//           <select className="select" value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
//             <option>USD</option><option>INR</option><option>EUR</option><option>GBP</option><option>JPY</option>
//           </select>
//         </div>
//         <div className="form-actions">
//           <button type="submit" className="btn btn-primary">Send</button>
//         </div>
//       </form>
//     </section>
//   );
// }

// // src/pages/Transfer.jsx
import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Transfer() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { recipientEmail, amount: Number(amount), currency, targetCurrency };
      const res = await api.post("/wallet/transfer", body);
      alert(res.data.message + ` — Received: ${res.data.received}`);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Transfer failed");
    }
  };

  return (
    <div className="transfer-page">
      {/* 🔹 Sticky Mini Navbar for Quick Options */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "white",
          borderBottom: "1px solid #eaeaea",
          padding: "0.8rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, color: "#1f3b8a" }}> Transfer</h3>
        <ul style={{ display: "flex", listStyle: "none", gap: "1.5rem", margin: 0 }}>
          <li
            onMouseEnter={() => setOpenDropdown("tips")}
            onMouseLeave={() => setOpenDropdown(null)}
            style={{ position: "relative", cursor: "pointer", color: "#333" }}
          >
            Tips ▾
            {openDropdown === "tips" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "white",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  animation: "fadeIn 0.2s ease",
                }}
              >
                <p style={{ margin: "4px 0", color: "#007bff" }}>Double check recipient</p>
                <p style={{ margin: "4px 0", color: "#007bff" }}>Confirm conversion rate</p>
                <p style={{ margin: "4px 0", color: "#007bff" }}>Avoid rush transfers</p>
              </div>
            )}
          </li>

          <li
            onMouseEnter={() => setOpenDropdown("faq")}
            onMouseLeave={() => setOpenDropdown(null)}
            style={{ position: "relative", cursor: "pointer", color: "#333" }}
          >
            FAQ ▾
            {openDropdown === "faq" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "white",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  animation: "fadeIn 0.2s ease",
                }}
              >
                <p style={{ margin: "4px 0", color: "#007bff" }}>What if transfer fails?</p>
                <p style={{ margin: "4px 0", color: "#007bff" }}>When will it reflect?</p>
                <p style={{ margin: "4px 0", color: "#007bff" }}>How to cancel?</p>
              </div>
            )}
          </li>
        </ul>
      </nav>

      {/* Transfer Form */}
      <section className="card transfer-card" style={{ animation: "fadeIn 0.4s ease" }}>
        <h2 className="heading">Send / Convert</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Recipient email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
          />
          <input
            className="input"
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <div className="form-row">
            <select className="select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option>USD</option>
              <option>INR</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>JPY</option>
            </select>
            <select className="select" value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
              <option>USD</option>
              <option>INR</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>JPY</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}


