// // src/pages/Login.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/users/login", form);

//       // Save token
//       localStorage.setItem("token", res.data.token);

//       // Save user data
//       localStorage.setItem("user", JSON.stringify(res.data));

//       // ✅ If wallet is not set up, redirect to wallet setup
//       if (!res.data.bankAccount) {
//         navigate("/setup-wallet");
//       } else {
//         // Otherwise, go straight to dashboard
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <section className="card auth-card">
//       <h2 className="heading">Login</h2>
//       <form onSubmit={handleSubmit} className="form">
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
//           placeholder="Password"
//           className="input"
//           required
//         />
//         <div className="form-actions">
//           <button type="submit" className="btn btn-primary">
//             Login
//           </button>
//         </div>
//       </form>
//       {error && <p className="error">{error}</p>}
//     </section>
//   );
// }

// export default Login;



// src/pages/Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({
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
      const res = await api.post("/users/login", form);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user data
      localStorage.setItem("user", JSON.stringify(res.data));

      // If wallet is not set up → wallet setup
      if (!res.data.bankAccount) {
        navigate("/setup-wallet");
      } else {
        // Otherwise → dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page login-page">
      <section className="login-card">

        <div className="login-header">
          <span className="auth-badge">WELCOME BACK</span>

          <h1>Welcome back</h1>

          <p>
            Log in to access your currency wallet and manage your funds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          <div className="field-group">
            <label htmlFor="login-email">Email address</label>

            <input
              id="login-email"
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
            <div className="password-label-row">
              <label htmlFor="login-password">Password</label>
              <span>Secure login</span>
            </div>

            <input
              id="login-password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="auth-input"
              required
            />
          </div>

          <button type="submit" className="auth-submit">
            Log in
            <span>→</span>
          </button>
        </form>

        {error && <p className="auth-error">{error}</p>}

        <div className="auth-footer">
          <span>Don't have an account?</span>
          <a href="/signup">Create one</a>
        </div>

      </section>
    </div>
  );
}

export default Login;