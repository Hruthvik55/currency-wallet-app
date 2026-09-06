// // src/pages/Signup.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// function Signup() {
//   // backend expects { name, email, password }
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/users/signup", form);

//       // Save token
//       localStorage.setItem("token", res.data.token);

//       // Save user data
//       localStorage.setItem("user", JSON.stringify(res.data));

//       // ✅ If wallet not setup → go to setup wallet
//       if (!res.data.bankAccount) {
//         navigate("/setup-wallet");
//       } else {
//         // Already has wallet → go straight to dashboard
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <section className="card auth-card">
//       <h2 className="heading">Create account</h2>
//       <form onSubmit={handleSubmit} className="form">
//         <input
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Full name"
//           className="input"
//           required
//         />
//         <input
//           name="email"
//           type="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="input"
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           value={form.password}
//           onChange={handleChange}
//           placeholder="Password (min 6)"
//           className="input"
//           required
//         />
//         <div className="form-actions">
//           <button type="submit" className="btn btn-primary">
//             Signup
//           </button>
//         </div>
//       </form>
//       {error && <p className="error">{error}</p>}
//     </section>
//   );
// }

// export default Signup;



// src/pages/Signup.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Signup.css";

function Signup() {
  // Backend expects { name, email, password }
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/users/signup", form);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user data
      localStorage.setItem("user", JSON.stringify(res.data));

      // If wallet not setup → go to setup wallet
      if (!res.data.bankAccount) {
        navigate("/setup-wallet");
      } else {
        // Already has wallet → dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-page signup-page">
      <section className="signup-card">

        <div className="signup-header">
          <span className="auth-badge">GET STARTED</span>

          <h1>Create your account</h1>

          <p>
            Set up your secure multi-currency wallet in just a few steps.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">

          <div className="field-group">
            <label htmlFor="name">Full name</label>

            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="auth-input"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="email">Email address</label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="auth-input"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              className="auth-input"
              required
            />

            <span className="field-hint">
              Use at least 6 characters for your password.
            </span>
          </div>

          <button type="submit" className="auth-submit">
            Create account
            <span>→</span>
          </button>
        </form>

        {error && <p className="auth-error">{error}</p>}

        <div className="auth-footer">
          <span>Already have an account?</span>
          <a href="/login">Log in</a>
        </div>

      </section>
    </div>
  );
}

export default Signup;