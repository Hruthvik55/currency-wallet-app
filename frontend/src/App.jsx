
// src/App.jsx
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";
import Docs from "./pages/Docs";
import SetupWallet from "./pages/SetupWallet";

function Navbar({ toggleTheme, theme }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.dispatchEvent(new Event("storage"));
  };

  if (!token) return null;

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/dashboard" className="logo">Currency Wallet</Link>

        <nav className="nav-links">
          <Link to="/dashboard" className="btn btn-link">Dashboard</Link>
          <Link to="/transfer" className="btn btn-link">Transfer</Link>

          {/* 🌙 Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn btn-link"
            title="Toggle theme"
            style={{ fontSize: "1.2rem" }}
          >
           
          </button>

          <button onClick={handleLogout} className="btn btn-primary">Logout</button>
        </nav>
      </div>
    </header>
  );
}



function AppContent({ toggleTheme, theme }) {
  const location = useLocation();

  const protectedPages = ["/dashboard", "/transfer", "/docs"];

  const showNavbar = protectedPages.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar toggleTheme={toggleTheme} theme={theme} />}

      <main className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setup-wallet" element={<SetupWallet />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <Toaster position="top-right" />
      <AppContent toggleTheme={toggleTheme} theme={theme} />
    </Router>
  );
}
