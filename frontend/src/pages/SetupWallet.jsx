

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function SetupWallet() {
//   const [bankAccount, setBankAccount] = useState("");
//   const [ifsc, setIfsc] = useState("");
//   const [currency, setCurrency] = useState("INR"); // default
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const validateFields = () => {
//     let tempErrors = {};

//     if (!/^\d{9,18}$/.test(bankAccount)) {
//       tempErrors.bankAccount = "Bank account must be 9–18 digits";
//     }

//     if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(ifsc)) {
//       tempErrors.ifsc = "IFSC must be in format ABCD0XXXXXX";
//     }

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!validateFields()) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setErrors({ general: "User not authenticated" });
//         setLoading(false);
//         return;
//       }

//       const res = await axios.post(
//         // "http://localhost:5000/api/users/setup-wallet",
//         `${import.meta.env.VITE_API_URL}/api/users/setup-wallet`,
//         { bankAccount, ifsc: ifsc.toUpperCase(), currency },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // ✅ store updated user info in localStorage
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       alert("✅ Wallet setup successful!");
//       navigate("/dashboard");
//     } catch (err) {
//       setErrors({
//         general: err.response?.data?.message || "Something went wrong",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="card auth-card">
//       <h2 className="heading">Setup Your Wallet</h2>

//       {errors.general && (
//         <p className="error">{errors.general}</p>
//       )}

//       <form onSubmit={handleSubmit} className="form">
//         <input
//           type="text"
//           placeholder="Bank Account Number"
//           value={bankAccount}
//           onChange={(e) => setBankAccount(e.target.value)}
//           className={`input ${errors.bankAccount ? "input-error" : ""}`}
//           required
//         />
//         {errors.bankAccount && <p className="error">{errors.bankAccount}</p>}

//         <input
//           type="text"
//           placeholder="IFSC Code"
//           value={ifsc}
//           onChange={(e) => setIfsc(e.target.value.toUpperCase())}
//           className={`input ${errors.ifsc ? "input-error" : ""}`}
//           required
//         />
//         {errors.ifsc && <p className="error">{errors.ifsc}</p>}

//         <select
//           value={currency}
//           onChange={(e) => setCurrency(e.target.value)}
//           className="input"
//         >
//           <option value="INR">🇮🇳 INR</option>
//           <option value="USD">🇺🇸 USD</option>
//           <option value="EUR">🇪🇺 EUR</option>
//           <option value="GBP">🇬🇧 GBP</option>
//         </select>

//         <div className="form-actions">
//           <button
//             type="submit"
//             className="btn btn-primary"
//             disabled={loading}
//           >
//             {loading ? "Saving..." : "Save & Continue"}
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// }

//  export default SetupWallet;

// src/pages/SetupWallet.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SetupWallet.css";

function SetupWallet() {
  const [bankAccount, setBankAccount] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [currency, setCurrency] = useState("INR");
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
        `${import.meta.env.VITE_API_URL}/api/users/setup-wallet`,
        {
          bankAccount,
          ifsc: ifsc.toUpperCase(),
          currency,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Store updated user info
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
    <div className="wallet-setup-page">

      <section className="wallet-setup-card">

        {/* Header */}
        <div className="wallet-setup-header">

          <span className="wallet-badge">
            WALLET SETUP
          </span>

          <h1>Set up your wallet</h1>

          <p>
            Add your bank details and choose your preferred
            currency to start using your wallet.
          </p>

        </div>

        {/* General Error */}
        {errors.general && (
          <p className="wallet-error wallet-general-error">
            {errors.general}
          </p>
        )}

        <form onSubmit={handleSubmit} className="wallet-form">

          {/* Bank Account */}
          <div className="wallet-field">

            <label htmlFor="bankAccount">
              Bank account number
            </label>

            <input
              id="bankAccount"
              type="text"
              placeholder="Enter your account number"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              className={`wallet-input ${
                errors.bankAccount ? "wallet-input-error" : ""
              }`}
              required
            />

            {errors.bankAccount && (
              <p className="wallet-error">
                {errors.bankAccount}
              </p>
            )}

          </div>

          {/* IFSC */}
          <div className="wallet-field">

            <label htmlFor="ifsc">
              IFSC code
            </label>

            <input
              id="ifsc"
              type="text"
              placeholder="Example: SBIN0001234"
              value={ifsc}
              onChange={(e) =>
                setIfsc(e.target.value.toUpperCase())
              }
              className={`wallet-input ${
                errors.ifsc ? "wallet-input-error" : ""
              }`}
              required
            />

            {errors.ifsc && (
              <p className="wallet-error">
                {errors.ifsc}
              </p>
            )}

          </div>

          {/* Currency */}
          <div className="wallet-field">

            <label htmlFor="currency">
              Preferred currency
            </label>

            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="wallet-input wallet-select"
            >
              <option value="INR">🇮🇳  INR — Indian Rupee</option>
              <option value="USD">🇺🇸  USD — US Dollar</option>
              <option value="EUR">🇪🇺  EUR — Euro</option>
              <option value="GBP">🇬🇧  GBP — British Pound</option>
            </select>

          </div>

          {/* Security Note */}
          <div className="wallet-security-note">
            <div className="security-icon">✓</div>

            <div>
              <strong>Your information is secure</strong>
              <p>
                Your bank details are used only for wallet setup
                and transaction processing.
              </p>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="wallet-submit"
            disabled={loading}
          >
            {loading ? (
              "Setting up..."
            ) : (
              <>
                Set up wallet
                <span>→</span>
              </>
            )}
          </button>

        </form>

      </section>

    </div>
  );
}

export default SetupWallet;