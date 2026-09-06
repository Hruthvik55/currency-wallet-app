// // // src/pages/Landing.jsx
// // import React from "react";
// // import { Link } from "react-router-dom";
// // import "./Landing.css"; // optional if you want custom styles later

// // export default function Landing() {
// //   return (
// //     <div className="landing-container">
// //       {/* Hero Section */}
// //       <section className="hero">
// //         <div className="hero-text">
// //           <h1 className="hero-title">Mobile Currency Wallet</h1>
// //           <p className="hero-subtitle">
// //             Secure multicurrency wallet with real-time transfers and live conversion rates.
// //           </p>
// //           <div className="hero-buttons">
// //             <Link to="/signup" className="btn btn-primary">Sign Up</Link>
// //             <Link to="/login" className="btn btn-secondary">Log In</Link>
// //           </div>
// //         </div>
// //         <div className="hero-image">
// //        <img
// //   src="/Transfer.png"
// //   alt="Wallet illustration"
// //   className="transfer-img"
// // />



// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section className="features">
// //         <div className="feature">
// //           <h3>🔐 Secure</h3>
// //           <p>All transactions are protected with JWT authentication and encryption.</p>
// //         </div>
// //         <div className="feature">
// //           <h3>💱 Multi-Currency</h3>
// //           <p>Send, receive, and convert between multiple currencies instantly.</p>
// //         </div>
// //         <div className="feature">
// //           <h3>📊 Live Rates</h3>
// //           <p>Get real-time conversion rates updated on every transaction.</p>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }


// import React from "react";
// import { Link } from "react-router-dom";
// import "./Landing.css";

// export default function Landing() {
//   return (
//     <div className="landing-container">

//       {/* Hero Section */}
//       <section className="hero">
//         <div className="hero-text">
//           <h1 className="hero-title">Mobile Currency Wallet</h1>

//           <p className="hero-subtitle">
//             Secure multicurrency wallet with real-time transfers and live
//             conversion rates.
//           </p>

//           <div className="hero-buttons">
//             <Link to="/signup" className="btn btn-primary">
//               Sign Up
//             </Link>

//             <Link to="/login" className="btn btn-secondary">
//               Log In
//             </Link>
//           </div>

//           <p className="server-note">
//             ⏳ The server may take up to 60 seconds to start after inactivity.
//             Please wait a moment on your first request.
//           </p>
//         </div>

//         <div className="hero-image">
//           <img
//             src="/Transfer.png"
//             alt="Wallet illustration"
//             className="transfer-img"
//           />
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="features">
//         <div className="feature">
//           <h3>🔐 Secure</h3>
//           <p>
//             All transactions are protected with JWT authentication and
//             encryption.
//           </p>
//         </div>

//         <div className="feature">
//           <h3>💱 Multi-Currency</h3>
//           <p>
//             Send, receive, and convert between multiple currencies instantly.
//           </p>
//         </div>

//         <div className="feature">
//           <h3>📊 Live Rates</h3>
//           <p>
//             Get real-time conversion rates updated on every transaction.
//           </p>
//         </div>
//       </section>

//     </div>
//   );
// }

// src/pages/Landing.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing-container">

      {/* HERO */}
      <section className="hero">

        <div className="hero-text">

          <div className="eyebrow">
            <span className="eyebrow-dot"></span>
            MULTI-CURRENCY WALLET
          </div>

          <h1 className="hero-title">
            Your money.
            <br />
            <span>Without borders.</span>
          </h1>

          <p className="hero-subtitle">
            Send, receive and convert money across currencies from one
            simple, secure wallet.
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="landing-btn landing-btn-primary">
              Get started
              <span className="arrow">→</span>
            </Link>

            <Link to="/login" className="landing-btn landing-btn-secondary">
              Log in
            </Link>
          </div>

          {/* Server Notice */}
          <div className="server-note">
            <div className="server-note-icon">
              <span></span>
            </div>

            <div>
              <strong>Free hosting notice</strong>
              <p>
                The server may take up to 60 seconds to wake after
                inactivity. Your first request may take a little longer.
              </p>
            </div>
          </div>

        </div>

        {/* HERO VISUAL */}
        <div className="hero-visual">

          <div className="visual-label visual-label-top">
            <span className="label-dot"></span>
            WALLET OVERVIEW
          </div>

          <div className="hero-image">
            <img
              src="/Transfer.png"
              alt="Currency wallet dashboard"
              className="transfer-img"
            />
          </div>

          {/* Floating currency card */}
          <div className="currency-float">
            <div className="currency-symbol">$</div>

            <div>
              <span>SUPPORTED</span>
              <strong>USD · EUR · INR</strong>
            </div>
          </div>

        </div>

      </section>


      {/* QUICK STATS */}
      <section className="wallet-strip">

        <div className="strip-item">
          <span className="strip-number">01</span>

          <div>
            <h3>Secure by design</h3>
            <p>JWT-protected authentication and transactions.</p>
          </div>
        </div>


        <div className="strip-divider"></div>


        <div className="strip-item">
          <span className="strip-number">02</span>

          <div>
            <h3>Multiple currencies</h3>
            <p>Move between supported currencies in one wallet.</p>
          </div>
        </div>


        <div className="strip-divider"></div>


        <div className="strip-item">
          <span className="strip-number">03</span>

          <div>
            <h3>Live conversion</h3>
            <p>Get updated exchange rates when you transact.</p>
          </div>
        </div>

      </section>


      {/* CURRENCY BAR */}
      <section className="currency-bar">

        <span className="currency-bar-label">
          BUILT FOR MULTI-CURRENCY MOVEMENT
        </span>

        <div className="currency-list">
          <span>₹ INR</span>
          <span>$ USD</span>
          <span>€ EUR</span>
          <span>£ GBP</span>
        </div>

      </section>

    </div>
  );
}