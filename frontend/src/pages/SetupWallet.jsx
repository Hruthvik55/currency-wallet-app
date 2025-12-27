

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SetupWallet() {
  const [bankAccount, setBankAccount] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [currency, setCurrency] = useState("INR"); // default
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateFields = () => {
    let tempErrors = {};

    if (!/^\d{9,18}$/.test(bankAccount)) {
      tempErrors.bankAccount = "Bank account must be 9–18 digits";
    }

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(ifsc)) {
      tempErrors.ifsc = "IFSC must be in format ABCD0XXXXXX";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateFields()) {
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrors({ general: "User not authenticated" });
        setLoading(false);
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/users/setup-wallet",
        { bankAccount, ifsc: ifsc.toUpperCase(), currency },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ store updated user info in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("✅ Wallet setup successful!");
      navigate("/dashboard");
    } catch (err) {
      setErrors({
        general: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card auth-card">
      <h2 className="heading">Setup Your Wallet</h2>

      {errors.general && (
        <p className="error">{errors.general}</p>
      )}

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Bank Account Number"
          value={bankAccount}
          onChange={(e) => setBankAccount(e.target.value)}
          className={`input ${errors.bankAccount ? "input-error" : ""}`}
          required
        />
        {errors.bankAccount && <p className="error">{errors.bankAccount}</p>}

        <input
          type="text"
          placeholder="IFSC Code"
          value={ifsc}
          onChange={(e) => setIfsc(e.target.value.toUpperCase())}
          className={`input ${errors.ifsc ? "input-error" : ""}`}
          required
        />
        {errors.ifsc && <p className="error">{errors.ifsc}</p>}

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="input"
        >
          <option value="INR">🇮🇳 INR</option>
          <option value="USD">🇺🇸 USD</option>
          <option value="EUR">🇪🇺 EUR</option>
          <option value="GBP">🇬🇧 GBP</option>
        </select>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </form>
    </section>
  );
}

 export default SetupWallet;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function SetupWallet() {
//   const [bankAccount, setBankAccount] = useState("");
//   const [ifsc, setIfsc] = useState("");
//   const [currency, setCurrency] = useState("INR");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [step, setStep] = useState(1);
//   const navigate = useNavigate();

//   const validateFields = () => {
//     let tempErrors = {};
//     if (!/^\d{9,18}$/.test(bankAccount)) {
//       tempErrors.bankAccount = "Bank account must be 9–18 digits";
//     }
//     if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(ifsc)) {
//       tempErrors.ifsc = "Invalid IFSC format (e.g. ABCD0XXXXXX)";
//     }
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateFields()) return;

//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://localhost:5000/api/wallet/setup",
//         { bankAccount, ifsc, currency },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Wallet setup successful!");
//       navigate("/dashboard");
//     } catch (err) {
//       alert(err.response?.data?.message || "Setup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="card wallet-setup">
//       {/* 🔹 Step Progress */}
//       <div className="progress-bar">
//         <div
//           className="progress-fill"
//           style={{
//             width: `${(step / 3) * 100}%`,
//             height: "6px",
//             backgroundColor: "#007bff",
//             borderRadius: "4px",
//             transition: "width 0.4s ease"
//           }}
//         />
//       </div>

//       <h2 className="heading">Setup Your Wallet</h2>
//       <form className="form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <input
//             type="text"
//             placeholder="Bank Account Number"
//             className="input"
//             value={bankAccount}
//             onChange={(e) => setBankAccount(e.target.value)}
//             onFocus={() => setStep(1)}
//           />
//           {errors.bankAccount && <small className="error">{errors.bankAccount}</small>}
//         </div>

//         <div className="form-group">
//           <input
//             type="text"
//             placeholder="IFSC Code"
//             className="input"
//             value={ifsc}
//             onChange={(e) => setIfsc(e.target.value.toUpperCase())}
//             onFocus={() => setStep(2)}
//           />
//           {errors.ifsc && <small className="error">{errors.ifsc}</small>}
//         </div>

//         <div className="form-group">
//           <select
//             className="select"
//             value={currency}
//             onChange={(e) => setCurrency(e.target.value)}
//             onFocus={() => setStep(3)}
//           >
//             <option>INR</option>
//             <option>USD</option>
//             <option>EUR</option>
//             <option>GBP</option>
//             <option>JPY</option>
//           </select>
//         </div>

//         <button type="submit" className="btn btn-primary" disabled={loading}>
//           {loading ? "Setting up..." : "Complete Setup"}
//         </button>
//       </form>
//     </section>
//   );
// }
